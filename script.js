const CLIENT_ID = '1475832477862989968'; 
const REDIRECT_URI = encodeURIComponent('https://leaf.penguinteam.kro.kr/api/auth');

function discordLogin() {
    const url = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=identify`;
    location.href = url;
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('discord_token'); // 토큰도 같이 지워야 깔끔!
    window.location.href = '/api/logout';
}

window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('access_token');
    
    // 주소창에 없으면 이미 저장된 게 있는지 확인
    if (!token) token = localStorage.getItem('discord_token');

    if (token && token !== "null") {
        localStorage.setItem('discord_token', token);
        
        // [핵심] 유저 정보가 없으면 디스코드 API에서 직접 가져옵니다.
        if (!localStorage.getItem('user')) {
            console.log("유저 정보가 없네요! 디스코드에서 직접 가져올게요... 🐧");
            await fetchUserInfo(token);
        }

        updateUI(true);
        // 주소창 정리 (정보를 다 가져온 뒤에 지우는 게 안전함)
        if (urlParams.has('access_token')) {
            window.history.replaceState({}, document.title, "/");
        }
    }
});

// 디스코드에 "나 누구야?"라고 물어보는 함수
async function fetchUserInfo(token) {
    try {
        const response = await fetch('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await response.json();

        if (userData.id) {
            const userObj = {
                username: userData.username,
                avatar: userData.avatar,
                id: userData.id
            };
            localStorage.setItem('user', JSON.stringify(userObj));
            console.log("유저 정보 저장 완료:", userObj.username);
        }
    } catch (err) {
        console.error("유저 정보를 가져오는데 실패했습니다:", err);
    }
}
