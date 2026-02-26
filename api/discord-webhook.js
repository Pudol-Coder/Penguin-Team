// api/discord-webhook.js
let lastMessages = []; // 임시 저장용 (실제 서비스에선 DB나 Redis 추천)

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { author, content, timestamp } = req.body;

        // 봇으로부터 받은 메시지를 목록에 추가 (최신 20개만 유지)
        const newMessage = {
            id: Date.now(),
            username: author,
            content: content,
            avatar: req.body.avatar,
            timestamp: timestamp
        };
        
        lastMessages.push(newMessage);
        if (lastMessages.length > 20) lastMessages.shift();

        return res.status(200).json({ success: true });
    } 

    if (req.method === 'GET') {
        // 웹사이트에서 채팅 목록을 요청할 때 사용
        return res.status(200).json(lastMessages);
    }
}
