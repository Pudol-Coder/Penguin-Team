// api/send-chat.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { username, avatar_url, content } = req.body;
    // 사용자님이 설정하신 환경 변수 이름으로 가져옵니다.
    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_CHAT_URL; 

    if (!WEBHOOK_URL) {
        return res.status(500).json({ error: '서버 환경 변수가 설정되지 않았습니다.' });
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, avatar_url, content })
        });

        if (!response.ok) throw new Error('디스코드 응답 에러');

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("전송 에러:", error);
        res.status(500).json({ error: '디스코드로 메시지를 보내지 못했습니다.' });
    }
}
