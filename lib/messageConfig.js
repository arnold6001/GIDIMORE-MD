
const messageConfig = {
  whatsappChannelUrl: "https://whatsapp.com/channel/0029VbAwhrYChq6JPHOMOT0L",
  welcomeMessage: "Welcome! Join our WhatsApp channel for updates.",
  
  getChannelLink() {
    return this.whatsappChannelUrl;
  },

  getWelcomeMessage() {
    return this.welcomeMessage;
  }
};

module.exports = messageConfig;
