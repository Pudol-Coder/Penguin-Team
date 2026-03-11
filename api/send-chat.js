export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    // 여기서 Vercel 대시보드에 적은 이름을 그대로 가져옵니다.
    const WEBHOOK_MEDIA_URL = process.env.DISCORD_WEBHOOK_CHAT_URL;
    const WEBHOOK_CHAT_URL = process.env.DISCORD_WEBHOOK_CHAT_URL;

    try {
        await fetch(WEBHOOK_CHAT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body) // 클라이언트가 보낸 데이터 그대로 전달
        });
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
