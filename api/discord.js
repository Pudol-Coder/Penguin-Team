const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('messageCreate', async (message) => {
    // 봇 본인이 쓴 글이나 웹훅 메시지는 무시
    if (message.author.bot) return;

    // 우리 Vercel API로 메시지 전달!
    try {
        await axios.post('https://your-vercel-domain.com/api/discord-webhook', {
            author: message.author.username,
            content: message.content,
            avatar: message.author.displayAvatarURL(),
            timestamp: message.createdAt
        });
    } catch (err) {
        console.error("Vercel로 전송 실패:", err.message);
    }
});

client.login('YOUR_BOT_TOKEN');
