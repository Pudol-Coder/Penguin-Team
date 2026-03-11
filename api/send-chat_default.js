// 서버 코드 (Node.js 예시)
app.post('/api/send-chat_default', async (req, res) => {
    const { channelId, username, content, avatar_url } = req.body;

    // 🐧 채널별 웹후크 URL 매핑 (본인의 웹후크 주소로 채우세요)
    const webhookUrls = {
        "1472091143863799849": "https://discord.com/api/webhooks/공지_웹후크_주소",
        "1472090209276395694": "https://discord.com/api/webhooks/채팅_웹후크_주소",
        "1472868706760523978": "https://discord.com/api/webhooks/일상_웹후크_주소"
    };

    const targetWebhook = webhookUrls[channelId];

    if (!targetWebhook) {
        return res.status(400).send("이 채널은 메시지 전송이 지원되지 않습니다.");
    }

    // 선택된 웹후크로 전송
    await fetch(targetWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, content, avatar_url })
    });

    res.sendStatus(200);
});
