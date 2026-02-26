// 1. 설정 값
const CLIENT_ID = '1475832477862989968';
const REDIRECT_URI = 'https://leaf.penguinteam.kro.kr/api/auth';

// 2. 로그인 함수 (가장 단순하게!)
function discordLogin() {
    console.log("로그인 시도...");
    const url = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify`;
    window.location.href = url;
}

// 3. 채팅방 이동 함수
function goToChat() {
    const token = localStorage.getItem('discord_token');
    if (!token) {
        alert("🐧 로그인이 필요합니다!");
        return;
    }
    window.location.href = '/discord/chat/index.html';
}

// 4. 페이지 로드 시 실행 로직
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');

    // 주소창에 토큰이 왔을 때 (로그인 직후)
    if (token) {
        localStorage.setItem('discord_token', token);
        // 정보를 배경에서 가져옴 (실패해도 로그인은 유지됨)
        fetchUserInfo(token);
        // 주소창 정리
        window.history.replaceState({}, document.title, "/");
    }

    // 로그인 상태 UI 업데이트
    checkLoginStatus();
});

// 로그인 상태 체크
function checkLoginStatus() {
    const token = localStorage.getItem('discord_token');
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    
    if (token) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'block';
    }
}

// 유저 정보 가져오기 (별도 함수로 격리)
async function fetchUserInfo(token) {
    try {
        const response = await fetch('https://discord.com/api/users/@me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('인증 실패');
        
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify({
            username: data.username,
            avatar: data.avatar,
            id: data.id
        }));
        console.log("🐧 유저 정보 저장 완료:", data.username);
    } catch (err) {
        console.error("유저 정보 로드 실패:", err);
    }
}
