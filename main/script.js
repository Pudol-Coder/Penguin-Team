// script.js 상단
const CLIENT_ID = '1475832477862989968'; 
// 주소 끝에 슬래시(/)가 있는지, https인지 꼭 확인하세요!
const REDIRECT_URI = encodeURIComponent('https://leaf.penguinteam.kro.kr/api/auth');

function discordLogin() {
    const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify`;
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
    const userParam = urlParams.get('user');

    // 1. URL에 유저 정보가 들어온 경우 (로그인 직후)
    if (userParam) {
        try {
            const userData = JSON.parse(decodeURIComponent(userParam));
            localStorage.setItem('user', JSON.stringify(userData));
            // 주소창에서 파라미터 지우기 (지저분하지 않게!)
            window.history.replaceState({}, document.title, "/");
        } catch (e) {
            console.error("유저 데이터 파싱 에러:", e);
        }
    }

    // 2. 화면 업데이트
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    const welcomeMsg = document.getElementById('welcome-msg');

    if (savedUser) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'block';
        if (welcomeMsg) welcomeMsg.innerText = `🐧 ${savedUser.username}님 환영해요!`;
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
    }
});
