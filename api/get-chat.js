export default async function handler(req, res) {
    // 🐧 브라우저에서 보낸 channelId를 받습니다. 없으면 기본 채널 사용!
    const { channelId } = req.query; 
    const TARGET_ID = channelId || '1472090209276395694'; 
    const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

    try {
        const [msgRes, channelRes] = await Promise.all([
            fetch(`https://discord.com/api/v10/channels/${TARGET_ID}/messages?limit=15`, {
                headers: { 'Authorization': `Bot ${BOT_TOKEN}` }
            }),
            fetch(`https://discord.com/api/v10/channels/${TARGET_ID}`, {
                headers: { 'Authorization': `Bot ${BOT_TOKEN}` }
            })
        ]);

        const messages = await msgRes.json();
        const channelInfo = await channelRes.json();

        res.status(200).json({
            channelName: channelInfo.name,
            messages: messages.map(m => ({
                id: m.id,
                username: m.author.global_name || m.author.username,
                avatar: m.author.avatar 
                    ? `https://cdn.discordapp.com/avatars/${m.author.id}/${m.author.avatar}.png`
                    : 'https://cdn-icons-png.flaticon.com/512/3588/3588612.png',
                content: m.content
            }))
        });
    } catch (error) {
        res.status(500).json({ error: '채널 정보를 가져오지 못했습니다.' });
    }
}
