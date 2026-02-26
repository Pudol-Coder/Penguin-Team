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

// 🐧 페이지 로드 시 상태 체크 및 정보 저장
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');

    // 주소창에서 유저 정보도 같이 오는지 체크 (없으면 일단 비워둠)
    const username = urlParams.get('username');
    const avatar = urlParams.get('avatar');
    const userId = urlParams.get('id');

    if (token) {
        console.log('🔑 성공의 열쇠 발견!');
        localStorage.setItem('discord_token', token);

        // [중요] 유저 정보를 객체로 만들어 저장해야 채팅창에서 닉네임이 나옵니다!
        if (username) {
            const userObj = {
                username: username,
                avatar: avatar,
                id: userId
            };
            localStorage.setItem('user', JSON.stringify(userObj));
        }

        // UI 변경 로직
        updateUI(true);

        // 주소창 정리
        window.history.replaceState({}, document.title, "/");
    } else {
        // 이미 로그인 되어있는지 확인
        const savedToken = localStorage.getItem('discord_token');
        if (savedToken) updateUI(true);
    }
});

// 로그인 상태에 따라 UI를 바꿔주는 함수
function updateUI(isLoggedIn) {
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    const welcomeMsg = document.getElementById('welcome-msg');

    if (isLoggedIn) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'block';
        if (welcomeMsg) welcomeMsg.innerText = `🐧 인증 완료! 환영합니다!`;
    }
}

// 🐧 문제의 리다이렉트 버튼 함수!
function goToChat() {
    const token = localStorage.getItem('discord_token');
    
    console.log("현재 토큰 상태:", token);

    if (!token || token === "null" || token === "undefined") {
        alert("🚨 로그인한 펭귄만 들어갈 수 있는 비밀 구역입니다!");
        return;
    }
    
    // 경로가 확실하도록 전체 경로를 써주는 게 안전해요.
    location.href = '/discord/chat/index.html';
}
