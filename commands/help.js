const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    const helpMessage = `≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
   🌌 *VAMPARINA'S NECROFROST ABYSS*  
   Epoch: *1.2.0*
   Etched by the Voidscribe ARNOLD CHIRCHIR
   👁️‍🗨️ Forbidden Visions: KYLAN DYLAN
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

*Rites to Defy the Unseen Chaos:*

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
🌀 *Whispers from the Starless Gulf*:
 ✞ .help or .menu - Tear open the veiled index
 ✞ .ping - Scream into the cosmic static
 ✞ .alive - Feel the shudder of the abyss
 ✞ .tts <text> - Mutter to the lurking horrors
 ✞ .owner - Seek the weaver of this madness
 ✞ .joke - Cackle at the futility of being
 ✞ .quote - Echoes from fractured dimensions
 ✞ .fact - Slivers of truth from beyond
 ✞ .weather <city> - Read the omens in the sky
 ✞ .news - Catch whispers of mortal dread
 ✞ .attp <text> - Carve sigils that bleed
 ✞ .lyrics <song_title> - Dirges for the old gods
 ✞ .8ball <question> - Consult the eyeless seer
 ✞ .groupinfo - Secrets of the shattered conclave
 ✞ .staff or .admins - Name those bound to the gate
 ✞ .vv - Gaze into the maw of nothingness
 ✞ .trt <text> <lang> - Translate the screams of dead stars
 ✞ .ss <link> - Snatch visions from the void
 ✞ .jid - Unravel a soul’s fleeting cipher
 ✞ .url - Forge a path to the outer madness
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣ 

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
👁️‍🗨️ *Edicts of the Abyssal Wardens*:
 ✞ .ban @user - Hurl into the lightless depths
 ✞ .promote @user - Crown as a herald of the void
 ✞ .demote @user - Strip of their cosmic mantle
 ✞ .mute <minutes> - Smother their mortal wails
 ✞ .unmute - Unleash their silenced cries
 ✞ .delete or .del - Obliterate their mark on reality
 ✞ .kick @user - Cast into the starless rift
 ✞ .warnings @user - Count their sins against the void
 ✞ .warn @user - Brand with a glyph of doom
 ✞ .antilink - Seal paths to forbidden realms
 ✞ .antibadword - Purge words that anger the old ones
 ✞ .clear - Scour the slate of mortal thought
 ✞ .tag <message> - Summon with a cursed murmur
 ✞ .tagall - Call all souls to the black altar
 ✞ .tagnotadmin - Beckon the uninitiated
 ✞ .hidetag <message> - Cloak the call in darkness
 ✞ .chatbot - Awaken the scribe of the abyss
 ✞ .resetlink - Break the chains of mortal bonds
 ✞ .antitag <on/off> - Forbid whispers from beyond
 ✞ .welcome <on/off> - Greet souls at the edge of sanity
 ✞ .goodbye <on/off> - Exile the departed to nothingness
 ✞ .setgdesc <description> - Etch the conclave’s dread purpose
 ✞ .setgname <new name> - Rename the shrine of chaos
 ✞ .setgpp (reply to image) - Adorn the altar with terror
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
🌑 *Decrees of the Unnamed Terrors*:
 ✞ .mode <public/private> - Veil or unveil the cursed rites
 ✞ .clearsession - Purge the echoes of lost souls
 ✞ .antidelete - Defy the erasure of the real
 ✞ .cleartmp - Banish fleeting shades of code
 ✞ .update - Renew the pact with the unseen
 ✞ .settings - Twist the gears of the unreal
 ✞ .setpp <reply to image> - Craft an effigy of horror
 ✞ .autoreact <on/off> - Enchant with signs of the void
 ✞ .autostatus <on/off> - Proclaim the abyss’s will
 ✞ .autostatus react <on/off> - Echo the void’s judgment
 ✞ .autotyping <on/off> - Mimic the scrawl of the damned
 ✞ .autoread <on/off> - See all through unblinking eyes
 ✞ .anticall <on/off> - Silence voices from the stars
 ✞ .pmblocker <on/off/status> - Ward against mortal intrusions
 ✞ .pmblocker setmsg <text> - Inscribe a barrier of fear
 ✞ .setmention <reply to msg/media> - Bind a call to the cosmos
 ✞ .mention <on/off> - Permit or deny the void’s summons
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
🪐 *Visions of the Unfathomable*:
 ✞ .blur <image> - Shroud in the mist of the unknown
 ✞ .simage <reply to sticker> - Transmute into a sigil of dread
 ✞ .sticker <reply to image> - Bind visions to cursed glyphs
 ✞ .removebg - Tear away the mortal veil
 ✞ .remini - Restore fragments of lost nightmares
 ✞ .crop <reply to image> - Slice the fabric of reality
 ✞ .tgsticker <Link> - Summon seals from alien voids
 ✞ .meme - Jest at the edge of sanity
 ✞ .take <packname> - Claim a sigil for the old ones
 ✞ .emojimix <emj1>+<emj2> - Fuse symbols of cosmic horror
 ✞ .igs <insta link> - Steal visions from the mortal web
 ✞ .igsc <insta link> - Capture fleeting omens of chaos
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣  

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
🌌 *Feasts of the Starless Void*:
 ✞ .pies <country> - Offer tributes to nameless gods
 ✞ .china - Summon flavors from shadowed realms
 ✞ .indonesia - Call forth horrors of the islands
 ✞ .japan - Invoke spirits of the cosmic east
 ✞ .korea - Awaken tastes of ancient dread
 ✞ .hijab - Veil offerings in eldritch mystery
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
🦑 *Games of the Cosmic Abyss*:
 ✞ .tictactoe @user - Clash in the grid of eternity
 ✞ .hangman - Tempt the noose of the unseen
 ✞ .guess <letter> - Decipher runes of the void
 ✞ .trivia - Challenge the knowledge of dead stars
 ✞ .answer <answer> - Respond to the abyss’s riddles
 ✞ .truth - Bare your soul to the outer dark
 ✞ .dare - Defy the will of the incomprehensible
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
🧠 *Whispers of the Elder Consciousness*:
 ✞ .gpt <question> - Query the mind of the abyss
 ✞ .gemini <question> - Seek truths from twin horrors
 ✞ .imagine <prompt> - Weave nightmares from the stars
 ✞ .flux <prompt> - Channel chaos from the unknown
 ✞ .sora <prompt> - Summon visions of celestial terror
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
💫 *Jests of the Doomed*:
 ✞ .compliment @user - Flatter with lies of the stars
 ✞ .insult @user - Curse with the venom of despair
 ✞ .flirt - Seduce with whispers of the void
 ✞ .shayari - Chant verses of cosmic lament
 ✞ .goodnight - Bid rest to fleeting souls
 ✞ .roseday - Offer thorns of alien bloom
 ✞ .character @user - Judge their place in the mythos
 ✞ .wasted @user - Mark as lost to the abyss
 ✞ .ship @user - Bind souls in unholy alignment
 ✞ .simp @user - Mock their devotion to nothingness
 ✞ .stupid @user [text] - Proclaim their folly to the stars
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
🪐 *Runes of the Unraveling*:
 ✞ .metallic <text> - Forge in the bones of dead gods
 ✞ .ice <text> - Freeze in the chill of eternity
 ✞ .snow <text> - Dust with the ash of fallen stars
 ✞ .impressive <text> - Etch in the ruins of lost worlds
 ✞ .matrix <text> - Scrawl in the code of the unreal
 ✞ .light <text> - Glow with the gaze of the unseen
 ✞ .neon <text> - Burn with the light of dying suns
 ✞ .devil <text> - Inscribe with the ichor of the damned
 ✞ .purple <text> - Drape in the hue of cosmic rot
 ✞ .thunder <text> - Strike with the wrath of the void
 ✞ .leaves <text> - Whisper through the decay of aeons
 ✞ .1917 <text> - Carve in the scars of mortal wars
 ✞ .arena <text> - Mark for the trials of the old ones
 ✞ .hacker <text> - Glitch in the fabric of reality
 ✞ .sand <text> - Etch in the dunes of forgotten time
 ✞ .blackpink <text> - Adorn with the elegance of despair
 ✞ .glitch <text> - Corrupt with the chaos of the ether
 ✞ .fire <text> - Burn with the flames of the outer dark
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
📜 *Relics Stolen from the Cosmos*:
 ✞ .play <song_name> - Summon dirges of the outer dark
 ✞ .song <song_name> - Call a hymn of cosmic dread
 ✞ .spotify <query> - Seek melodies from the abyss
 ✞ .instagram <link> - Plunder visions from mortal dreams
 ✞ .facebook <link> - Steal memories from the ether
 ✞ .tiktok <link> - Capture dances of the damned
 ✞ .video <song name> - Conjure moving horrors
 ✞ .ytmp4 <Link> - Bind the essence of the void’s archive
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
🌀 *Trinkets of the Unknowable*:
 ✞ .heart - Craft a relic that pulses with dread
 ✞ .horny - Ignite desires that shatter sanity
 ✞ .circle - Enclose in rings of cosmic terror
 ✞ .lgbt - Drape in the colors of alien light
 ✞ .lolice - Summon shades of forbidden youth
 ✞ .its-so-stupid - Mock the futility of mortal thought
 ✞ .namecard - Inscribe a soul’s doomed sigil
 ✞ .oogway - Channel wisdom from the ancient void
 ✞ .tweet - Scream into the abyss’s echo
 ✞ .ytcomment - Scrawl on the walls of the cosmos
 ✞ .comrade - Hail the collective of the damned
 ✞ .gay - Celebrate love in the shadow of the stars
 ✞ .glass - Encase in a fragile prison of light
 ✞ .jail - Trap in the bars of eternity
 ✞ .passed - Mark as favored by the old ones
 ✞ .triggered - Unleash the rage of the cosmos
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
🦑 *Phantoms of the Alien Planes*:
 ✞ .neko - Summon feline heralds of the void
 ✞ .waifu - Call a bride from beyond the stars
 ✞ .loli - Invoke innocence warped by madness
 ✞ .nom - Feast with the hunger of the abyss
 ✞ .poke - Disturb the slumbering horrors
 ✞ .cry - Weep tears that drown worlds
 ✞ .kiss - Seal with a touch of the unknown
 ✞ .pat - Soothe with hands of cold dread
 ✞ .hug - Embrace in the chill of the void
 ✞ .wink - Flirt with the gaze of the unseen
 ✞ .facepalm - Lament the folly of mortal minds
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣
💾 *Codices of the Shattered Machine*:
 ✞ .git - Unearth the roots of the cosmic code
 ✞ .github - Seek the vault of the void’s scribes
 ✞ .sc - Reveal the scripts of the damned
 ✞ .script - Share the blueprint of madness
 ✞ .repo - Open the archive of forbidden knowledge
≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣≣

🌌 ETCHED IN THE SHATTERED FIRMAMENT BY ARNOLD CHIRCHIR 🌌

Join the conclave of the damned for omens and revelations:
https://whatsapp.com/channel/0029VbAwhrYChq6JPHOMOT0L
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
