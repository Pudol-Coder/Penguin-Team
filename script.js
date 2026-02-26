// script.js 상단
const CLIENT_ID = '1475832477862989968'; 
// 주소 끝에 슬래시(/)가 있는지, https인지 꼭 확인하세요!
const REDIRECT_URI = encodeURIComponent('https://leaf.penguinteam.kro.kr/api/auth');

function discordLogin() {
    const url = `https://discord.com/oauth2/authorize?client_id=1475832477862989968&response_type=code&redirect_uri=https%3A%2F%2Fleaf.penguinteam.kro.kr%2Fapi%2Fauth&scope=identify`;
    location.href = url;
}

// 로그아웃 함수
function logout() {
    localStorage.removeItem('user');
    // 서버 로그아웃 API 호출 후 메인으로 이동
    window.location.href = '/api/logout';
}

// 페이지 로드 시 상태 체크
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // 1. 주소창에서 'access_token'이라는 이름을 찾습니다! 🐧
    const token = urlParams.get('access_token');

    if (token) {
        console.log('성공의 열쇠(토큰) 발견! 🔑');
        
        // 일단 "인증 완료" 상태로 UI를 강제로 바꿉니다.
        const loginBtn = document.getElementById('login-btn');
        const userInfo = document.getElementById('user-info');
        const welcomeMsg = document.getElementById('welcome-msg');

        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'block';
        if (welcomeMsg) welcomeMsg.innerText = `🐧 인증 완료! 환영합니다!`;

        // 토큰을 저장해둡니다 (나중에 유저 정보 불러올 때 쓰기 위해)
        localStorage.setItem('discord_token', token);

        // 주소창의 지저분한 토큰 정보는 싹 지워줍니다 (보안상 좋음!)
        window.history.replaceState({}, document.title, "/");
    }
});
function goToChat() {
    const user = localStorage.getItem('access_token');
    
    if (!access_token) {
        alert("🐧 먼저 로그인을 해주셔야 채팅 기능을 사용할 수 있어요!");
        // 로그인 버튼이 있는 곳으로 스크롤하거나 로그인 유도
        return;
    }
    
    // 로그인이 되어 있다면 채팅 페이지로 이동!
    location.href = '/discord/chat/';
}
