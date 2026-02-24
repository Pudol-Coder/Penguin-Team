// api/auth.js
export default async function handler(req, res) {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send('인증 코드가 없습니다.');
    }

    // 디스코드에 코드를 주고 진짜 토큰을 받아오는 과정 (서버 대 서버)
    const params = new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
    });

    try {
        const response = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const data = await response.json();
        
        // 여기서 유저 정보를 확인하거나, 안전한 쿠키에 토큰을 저장합니다.
        // 연습용으로는 다시 메인 페이지로 토큰을 들고 돌아가게 할 수 있습니다.
        res.redirect(`/?access_token=${data.access_token}`);
    } catch (error) {
        res.status(500).send('로그인 처리 중 오류 발생');
    }
}
