// 1. 설정 값
const CLIENT_ID = '1475832477862989968';
const REDIRECT_URI = 'https://leaf.penguinteam.kro.kr/api/auth';
const GUILD_ID = '1472090208496386090'; // 여기에 디스코드 서버 ID를 넣으세요!

function discordLogin() {
    // scope에 guilds.members.read를 추가했습니다.
    const url = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify+guilds.members.read`;
    window.location.href = url;
}
// 로그아웃 함수: 서버 거칠 필요 없이 바로 로컬 데이터를 비웁니다. 🐧🧹
function logout() {
    console.log("로그아웃 시도...");
    
    // 1. 저장된 모든 유저 정보 삭제
    localStorage.removeItem('discord_token');
    localStorage.removeItem('user');
    
    // (선택사항) 만약 모든 데이터를 한 번에 지우고 싶다면:
    // localStorage.clear(); 

    alert("성공적으로 로그아웃되었습니다. 펭귄님, 다음에 또 봐요! 👋");

    // 2. 메인 페이지로 새로고침 이동 (UI가 자동으로 로그인 전 상태로 돌아감)
    window.location.href = '/';
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
