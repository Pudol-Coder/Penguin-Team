// 페이지가 열리자마자 실행되는 부분
window.onload = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        // 로그인 정보가 있으면 환영 메시지 보여주기
        document.getElementById('welcome-msg').innerText = `${user.username}님, 환영합니다!`;
        document.getElementById('user-info').style.display = 'block';
        
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) loginBtn.style.display = 'none'; 
    }
};

// 로그아웃 버튼을 누르면 실행되는 함수
function logout() {
    localStorage.removeItem('user'); // 내 컴퓨터에서 정보 지우기
    window.location.href = '/api/logout'; // 서버에 로그아웃 알리기
}
