export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { channelId, username, content, avatar_url } = req.body;

    // 🐧 채널 ID와 환경 변수 매핑 (Vercel에 등록한 Key 이름과 똑같이!)
    const webhookKeys = {
        "1479107523989602344": process.env.DISCORD_WEBHOOK_MEDIA_URL,
        "1479115722021011600": process.env.DISCORD_WEBHOOK_CHAT_URL,
        "1481278243116941465": process.env.DISCORD_WEBHOOK_MEETING_URL // 채팅회의 등
    };

    const targetWebhook = webhookKeys[channelId];

    if (!targetWebhook) {
        return res.status(400).json({ error: "이 채널은 전송이 설정되지 않았습니다." });
    }

    try {
        await fetch(targetWebhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: content,
                username: username, // 🐧 연동된 닉네임 사용
                avatar_url: avatar_url // 🐧 연동된 프로필 사진 사용
            })
        });
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
