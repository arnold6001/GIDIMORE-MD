const { 
    WAConnection, 
    MessageType, 
    Mimetype 
} = require('@adiwajshing/baileys');
const fs = require('fs');

// File to store sudo users
const SUDO_FILE = './sudo_users.json';

// Bot configuration
const BOT_NAME = 'VAMPARINA V1';
const OWNER_NAME = 'Arnold Chirchir';
const OWNER_EMAIL = 'arnoldkipruto193@gmail.com';
const OWNER_PHONE = '254703110780'; // Without the + prefix for WhatsApp JID
const SUDO_PHONE = '254703110780@s.whatsapp.net'; // WhatsApp JID format

// Load or initialize sudo users
let sudoUsers = [];
if (fs.existsSync(SUDO_FILE)) {
    sudoUsers = JSON.parse(fs.readFileSync(SUDO_FILE));
}

// Function to save sudo users to file
function saveSudoUsers() {
    fs.writeFileSync(SUDO_FILE, JSON.stringify(sudoUsers, null, 2));
}

// Initialize the bot
async function startBot() {
    const conn = new WAConnection();
    
    // Load auth info if available
    if (fs.existsSync('./auth_info.json')) {
        conn.loadAuthInfo('./auth_info.json');
    }

    // Connect to WhatsApp
    conn.on('open', () => {
        console.log(`${BOT_NAME} is now connected!`);
        // Save auth info for future sessions
        fs.writeFileSync('./auth_info.json', JSON.stringify(conn.base64EncodedAuthInfo(), null, 2));
        
        // Automatically add sudo user on startup if not already added
        if (!sudoUsers.includes(SUDO_PHONE)) {
            sudoUsers.push(SUDO_PHONE);
            saveSudoUsers();
            console.log(`Added ${OWNER_NAME} (${OWNER_PHONE}) as sudo user.`);
        }
    });

    // Handle incoming messages
    conn.on('chat-update', async (chat) => {
        if (!chat.hasNewMessage || !chat.messages) return;
        const message = chat.messages.all()[0];
        if (!message.message) return;

        const from = message.key.remoteJid;
        const sender = message.participant || from;
        const messageContent = message.message.conversation || 
                             message.message.extendedTextMessage?.text || '';

        // Check if message is a command
        if (messageContent.startsWith('.')) {
            const [command, ...args] = messageContent.slice(1).split(' ');
            const cmd = command.toLowerCase();

            // Handle .sudo add command
            if (cmd === 'sudo' && args[0] === 'add' && sudoUsers.includes(sender)) {
                const target = args[1]?.replace('+', '') + '@s.whatsapp.net';
                if (target && !sudoUsers.includes(target)) {
                    sudoUsers.push(target);
                    saveSudoUsers();
                    await conn.sendMessage(from, `Added ${args[1]} as sudo user.`, MessageType.text);
                } else {
                    await conn.sendMessage(from, 'Invalid number or already a sudo user.', MessageType.text);
                }
            }

            // Example: Handle .help command
            if (cmd === 'help' || cmd === 'menu') {
                const helpMessage = `🖤 *${BOT_NAME} Help Menu* 🖤\n\n` +
                                    `Owner: ${OWNER_NAME}\n` +
                                    `Email: ${OWNER_EMAIL}\n` +
                                    `Phone: +${OWNER_PHONE}\n\n` +
                                    `Commands:\n` +
                                    `✞ .sudo add <254703110780> - Add a sudo user (Admins only)\n` +
                                    `✞ .help - Show this menu`;
                await conn.sendMessage(from, helpMessage, MessageType.text);
            }
        }
    });

    // Connect to WhatsApp
    await conn.connect();
}

// Start the bot
startBot().catch((err) => {
    console.error('Error starting bot:', err);
});