const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    const helpMessage = `┏━━━━━━━━━━━━━━━━━━━━━━┓
 😈 VAMPARINA V1 💜
 Version: 1.2.0
 By: Arnold, Vessel of Cursed Power
 YT: Kylan Dylan
 ⚡ Domain of Malevolent Commands ⚡
┗━━━━━━━━━━━━━━━━━━━━━━┛

🔥 Unleash Your Cursed Energy! Commands:

┏━━━━━━━━━━━━━━━━━━━━━━┓
🌀 Cursed Technique: Core Sorcery
• ✞ ║ .help | .menu
• ✞ ║ .ping
• ✞ ║ .alive
• ✞ ║ .tts <text>
• ✞ ║ .owner
• ✞ ║ .joke
• ✞ ║ .quote
• ✞ ║ .fact
• ✞ ║ .weather <city>
• ✞ ║ .news
• ✞ ║ .attp <text>
• ✞ ║ .lyrics <song_title>
• ✞ ║ .8ball <question>
• ✞ ║ .groupinfo
• ✞ ║ .staff | .admins
• ✞ ║ .vv
• ✞ ║ .trt <text> <lang>
• ✞ ║ .ss <link>
• ✞ ║ .jid
• ✞ ║ .url
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━┓
🖐️ Special Grade Sorcery
• ✞ ║ .ban @user
• ✞ ║ .promote @user
• ✞ ║ .demote @user
• ✞ ║ .mute <minutes>
• ✞ ║ .unmute
• ✞ ║ .delete | .del
• ✞ ║ .kick @user
• ✞ ║ .warnings @user
• ✞ ║ .warn @user
• ✞ ║ .antilink
• ✞ ║ .antibadword
• ✞ ║ .clear
• ✞ ║ .tag <message>
• ✞ ║ .tagall
• ✞ ║ .tagnotadmin
• ✞ ║ .hidetag <message>
• ✞ ║ .chatbot
• ✞ ║ .resetlink
• ✞ ║ .antitag <on/off>
• ✞ ║ .welcome <on/off>
• ✞ ║ .goodbye <on/off>
• ✞ ║ .setgdesc <description>
• ✞ ║ .setgname <new name>
• ✞ ║ .setgpp (reply to image)
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━┓
👁️‍🗨️ Sukuna’s Supreme Commands
• ✞ ║ .mode <public/private>
• ✞ ║ .clearsession
• ✞ ║ .antidelete
• ✞ ║ .cleartmp
• ✞ ║ .update
• ✞ ║ .settings
• ✞ ║ .setpp <reply to image>
• ✞ ║ .autoreact <on/off>
• ✞ ║ .autostatus <on/off>
• ✞ ║ .autostatus react <on/off>
• ✞ ║ .autotyping <on/off>
• ✞ ║ .autoread <on/off>
• ✞ ║ .anticall <on/off>
• ✞ ║ .pmblocker <on/off/status>
• ✞ ║ .pmblocker setmsg <text>
• ✞ ║ .setmention <reply to msg/media>
• ✞ ║ .mention <on/off>
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━┓
🎨 Cursed Relic Art
• ✞ ║ .blur <image>
• ✞ ║ .simage <reply to sticker>
• ✞ ║ .sticker <reply to image>
• ✞ ║ .removebg
• ✞ ║ .remini
• ✞ ║ .crop <reply to image>
• ✞ ║ .tgsticker <Link>
• ✞ ║ .meme
• ✞ ║ .take <packname>
• ✞ ║ .emojimix <emj1>+<emj2>
• ✞ ║ .igs <insta link>
• ✞ ║ .igsc <insta link>
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━┓
🖼 Pies Cursed Rituals
• ✞ ║ .pies <country>
• ✞ ║ .china
• ✞ ║ .indonesia
• ✞ ║ .japan
• ✞ ║ .korea
• ✞ ║ .hijab
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━┓
🎮 Cursed Combat Training
• ✞ ║ .tictactoe @user
• ✞ ║ .hangman
• ✞ ║ .guess <letter>
• ✞ ║ .trivia
• ✞ ║ .answer <answer>
• ✞ ║ .truth
• ✞ ║ .dare
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━┓
🤖 Cursed AI Domain
• ✞ ║ .gpt <question>
• ✞ ║ .gemini <question>
• ✞ ║ .imagine <prompt>
• ✞ ║ .flux <prompt>
• ✞ ║ .sora <prompt>
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━┓
😈 Sukuna’s Malevolent Fun
• ✞ ║ .compliment @user
• ✞ ║ .insult @user
• ✞ ║ .flirt
• ✞ ║ .shayari
• ✞ ║ .goodnight
• ✞ ║ .roseday
• ✞ ║ .character @user
• ✞ ║ .wasted @user
• ✞ ║ .ship @user
• ✞ ║ .simp @user
• ✞ ║ .stupid <user> [text]
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━┓
✍ Cursed Script Domain
• ✞ ║ .metallic <text>
• ✞ ║ .ice <text>
• ✞ ║ .snow <text>
• ✞ ║ .impressive <text>
• ✞ ║ .matrix <text>
• ✞ ║ .light <text>
• ✞ ║ .neon <text>
• ✞ ║ .devil <text>
• ✞ ║ .purple <text>
• ✞ ║ .thunder <text>
• ✞ ║ .leaves <text>
• ✞ ║ .1917 <text>
• ✞ ║ .arena <text>
• ✞ ║ .hacker <text>
• ✞ ║ .sand <text>
• ✞ ║ .blackpink <text>
• ✞ ║ .glitch <text>
• ✞ ║ .fire <text>
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━┓
🪬 Cursed Artifact Downloads
• ✞ ║ .play <song_name>
• ✞ ║ .song <song_name>
• ✞ ║ .spotify <query>
• ✞ ║ .instagram <link>
• ✞ ║ .facebook <link>
• ✞ ║ .tiktok <link>
• ✞ ║ .video <song name>
• ✞ ║ .ytmp4 <Link>
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━┓
🧩 Misc Cursed Charms
• ✞ ║ .heart
• ✞ ║ .horny
• ✞ ║ .circle
• ✞ ║ .lgbt
• ✞ ║ .lolice
• ✞ ║ .its-so-stupid
• ✞ ║ .namecard
• ✞ ║ .oogway
• ✞ ║ .tweet
• ✞ ║ .ytcomment
• ✞ ║ .comrade
• ✞ ║ .gay
• ✞ ║ .glass
• ✞ ║ .jail
• ✞ ║ .passed
• ✞ ║ .triggered
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━┓
🌟 Jujutsu Anime Sorcery
• ✞ ║ .neko
• ✞ ║ .waifu
• ✞ ║ .loli
• ✞ ║ .nom
• ✞ ║ .poke
• ✞ ║ .cry
• ✞ ║ .kiss
• ✞ ║ .pat
• ✞ ║ .hug
• ✞ ║ .wink
• ✞ ║ .facepalm
┗━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━┓
💻 Cursed Code Vault
• ✞ ║ .git
• ✞ ║ .github
• ✞ ║ .sc
• ✞ ║ .script
• ✞ ║ .repo
┗━━━━━━━━━━━━━━━━━━━━━━┛

🖤 Unleashed by Arnold, Vessel of Cursed Power
Join the Cursed Domain: https://whatsapp.com/channel/0029VbAwhrYChq6JPHOMOT0L
`;

    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');
        
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '0029VbAwhrYChq6JPHOMOT0L@newsletter',
                        newsletterName: 'VAMPARINA Official Channel',
                        serverMessageId: -1
                    }
                }
            },{ quoted: message });
        } else {
            console.error('Bot image not found at:', imagePath);
            await sock.sendMessage(chatId, { 
                text: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '0029VbAwhrYChq6JPHOMOT0L@newsletter',
                        newsletterName: 'VAMPARINA Official Channel',
                        serverMessageId: -1
                    } 
                }
            });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
