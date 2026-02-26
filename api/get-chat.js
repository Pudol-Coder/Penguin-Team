export default async function handler(req, res) {
    const CHANNEL_ID = '1472090209276395694'; // 여기에 디스코드 채널 ID 입력!
    const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

    try {
        const response = await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=10`, {
            headers: { 'Authorization': `Bot ${BOT_TOKEN}` }
        });

        if (!response.ok) throw new Error('디스코드 응답 에러');

        const data = await response.json();
        
        // 필요한 데이터(이름, 프사, 내용)만 추출
        const messages = data.map(m => ({
            id: m.id,
            username: m.author.global_name || m.author.username,
            avatar: m.author.avatar 
                ? `https://cdn.discordapp.com/avatars/${m.author.id}/${m.author.avatar}.png`
                : 'https://cdn-icons-png.flaticon.com/512/3588/3588612.png',
            content: m.content
        }));

        res.status(200).json(messages.reverse()); // 시간순 정렬
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '채팅을 가져오지 못했습니다.' });
    }
}
