
async function onMessageReceived(sock, message) {
  const chatId = message.key.remoteJid;
  const senderId = message.key.participant || message.key.remoteJid;
  const userMessage = message.message?.conversation || message.message?.extendedTextMessage?.text;

  if (!userMessage) return;

  // Ignore messages from the bot itself
  if (senderId === sock.user.id.split(':') + '@s.whatsapp.net') return;

  // Show typing
  await showTyping(sock, chatId);

  // Get AI reply
  const reply = await getAIResponse(userMessage, {
    messages: chatMemory.messages.get(senderId) || [],
    userInfo: chatMemory.userInfo.get(senderId) || {}
  });

  if (reply) {
    await sock.sendMessage(chatId, { text: reply }, { quoted: message });
  }
}
