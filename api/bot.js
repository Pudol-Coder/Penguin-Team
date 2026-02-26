const { Client, GatewayIntentBits } = require('discord.js');
const { createClient } = require('@supabase/supabase-js');

// 봇 설정
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Supabase 설정
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_KEY');

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // DB에 채팅 저장! 🐧
    await supabase.from('chat_messages').insert([{
        username: message.author.username,
        content: message.content,
        avatar_url: message.author.displayAvatarURL()
    }]);
    console.log("DB 저장 완료!");
});

client.login('YOUR_BOT_TOKEN');b
