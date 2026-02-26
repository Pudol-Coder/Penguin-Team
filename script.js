const CLIENT_ID = '1475832477862989968'; 
const REDIRECT_URI = encodeURIComponent('https://leaf.penguinteam.kro.kr/api/auth');

// 1. 로그인 함수 (언제든 실행 가능하게 상단 배치)
function discordLogin() {
    const url = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=identify`;
    location.href = url;
}

// 2. 리다이렉트 함수 (에러 방지를 위해 단순하게 유지)
function goToChat() {
    const token = localStorage.getItem('discord_token');
    console.log("이동 시도 - 토큰 상태:", token);

    if (!token || token === "null") {
        alert("🐧 펭귄 요원: 로그인을 먼저 해주세요!");
        return;
    }
    
    // 절대 경로로 확실하게 이동
    window.location.href = '/discord/chat/index.html';
}

// 3. 로그아웃
function logout() {
    localStorage.clear(); // 모든 정보 싹 비우기
    window.location.href = '/api/logout';
}

// 4. 페이지 로드 시 실행되는 로직
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('access_token');

    if (token) {
        localStorage.setItem('discord_token', token);
        // 주소창 지우기
        window.history.replaceState({}, document.title, "/");
    } else {
        token = localStorage.getItem('discord_token');
    }

    if (token && token !== "null") {
        updateUI(true);
        // 유저 정보가 없으면 배경에서 몰래 가져오기
        if (!localStorage.getItem('user')) {
            getDiscordUserInfo(token);
        }
    }
});

// 정보를 가져오는 함수를 따로 분리 (async 에러 방지)
async function getDiscordUserInfo(token) {
    try {
        const response = await fetch('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.id) {
            localStorage.setItem('user', JSON.stringify({
                username: data.username,
                avatar: data.avatar,
                id: data.id
            }));
            console.log("🐧 유저 정보 획득 성공:", data.username);
        }
    } catch (e) {
        console.error("정보 가져오기 실패:", e);
    }
}

function updateUI(isLoggedIn) {
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'block';
    if (userInfo) userInfo.style.display = isLoggedIn
