// api/send-chat.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { username, avatar_url, content } = req.body;
    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_CHAT_URL;

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username, // [WEB] 닉네임이 여기로!
                avatar_url: avatar_url,
                content: content
            })
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: '전송 실패' });
    }
}
