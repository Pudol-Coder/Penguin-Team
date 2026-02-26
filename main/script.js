// 1. 디스코드 로그인 설정
const CLIENT_ID = '1475832477862989968'; 
const REDIRECT_URI = encodeURIComponent('https://leaf.penguinteam.kro.kr/api/auth');

function discordLogin() {
    const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify`;
    location.href = url;
}

// 2. 로그아웃 함수
function logout() {
    localStorage.removeItem('user'); // 로컬 정보 삭제
    window.location.href = '/api/logout'; // 서버 쿠키 삭제 API 호출
}

// 3. 페이지 로드 시 상태 체크
window.onload = () => {
    // URL에 토큰이 있는지 확인 (로그인 직후)
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user'); // API에서 보낸 유저 데이터

    if (userParam) {
        const userData = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('user', JSON.stringify(userData));
        // 주소창 깔끔하게 정리 (파라미터 제거)
        window.history.replaceState({}, document.title, "/");
    }

    // 로컬 스토리지에 유저 정보가 있는지 확인
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    const welcomeMsg = document.getElementById('welcome-msg');

    if (savedUser) {
        // 로그인 상태일 때
        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'block';
        if (welcomeMsg) welcomeMsg.innerText = `🐧 ${savedUser.username}님 환영해요!`;
    } else {
        // 로그아웃 상태일 때
        if (loginBtn) loginBtn.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
    }
};
