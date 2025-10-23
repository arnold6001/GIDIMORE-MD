const express = require('express');
const multer = require('multer');
const { Octokit } = require('@octokit/rest');
const { makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@adiwajshing/baileys');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Enable CORS for frontend (Vercel) to call this API
const cors = require('cors'); // Add this if needed: npm install cors
app.use(cors());

// GitHub setup (use env var for token)
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const repoOwner = 'arnold6001';
const repoName = 'VAMPARINA-V1';

// Multer for file uploads (stores temporarily in 'uploads/' folder)
const upload = multer({ dest: 'uploads/' });

// In-memory store for active bots (use a DB like MongoDB for production persistence)
const activeBots = {};

// Ensure sessions directory exists
const sessionsDir = path.join(__dirname, 'sessions');
if (!fs.existsSync(sessionsDir)) fs.mkdirSync(sessionsDir);

// API: Fetch all files from the GitHub repo
app.get('/api/repo-files', async (req, res) => {
    try {
        const { data } = await octokit.repos.getContent({
            owner: repoOwner,
            repo: repoName,
            path: req.query.path || '' // Optional: pass ?path=folder to navigate subfolders
        });
        res.json(data);
    } catch (err) {
        console.error('Error fetching repo files:', err);
        res.status(500).json({ error: 'Failed to fetch repository files. Check GitHub token and repo access.' });
    }
});

// API: Upload creds.js to the session folder and deploy bot
app.post('/api/upload-creds/:userId', upload.single('creds'), async (req, res) => {
    const userId = req.params.userId;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

    const sessionDir = path.join(sessionsDir, userId);
    fs.mkdirSync(sessionDir, { recursive: true });

    // Move uploaded file to session folder as creds.js
    const credsPath = path.join(sessionDir, 'creds.js');
    fs.renameSync(req.file.path, credsPath);

    try {
        // Auto-deploy the bot
        await deployBot(userId, sessionDir);
        res.json({ message: `Creds uploaded and bot deployed for user ${userId}!` });
    } catch (err) {
        console.error('Error deploying bot:', err);
        res.status(500).json({ error: 'Failed to deploy bot. Check creds file.' });
    }
});

// Function to deploy/run the WhatsApp bot
async function deployBot(userId, sessionDir) {
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false, // Disable QR printing (not needed for auto-deploy)
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                console.log(`Reconnecting bot for ${userId}...`);
                setTimeout(() => deployBot(userId, sessionDir), 5000); // Retry after 5s
            }
        } else if (connection === 'open') {
            console.log(`Bot connected and active for user ${userId}`);
            // Add your bot logic here (e.g., message handling)
            sock.ev.on('messages.upsert', async (m) => {
                if (m.messages[0].key.fromMe) return;
                // Example: Echo messages
                await sock.sendMessage(m.messages[0].key.remoteJid, { text: 'Hello from Vamparina Bot!' });
            });
        }
    });

    sock.ev.on('creds.update', saveCreds);
    activeBots[userId] = sock;
}

// API: Stop a bot for a user
app.post('/api/stop-bot/:userId', (req, res) => {
    const userId = req.params.userId;
    if (activeBots[userId]) {
        activeBots[userId].logout();
        delete activeBots[userId];
        res.json({ message: `Bot stopped for user ${userId}` });
    } else {
        res.status(404).json({ error: 'No active bot for this user.' });
    }
});

// Health check for Render
app.get('/', (req, res) => res.send('Vamparina Backend is running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));