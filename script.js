// script.js 로드 시 상태 체크 부분 수정
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    
    // 주소창에 유저 정보도 같이 넘어온다고 가정 (API에서 보내줘야 함)
    const username = urlParams.get('username');
    const userId = urlParams.get('id');
    const avatar = urlParams.get('avatar');

    if (token) {
        localStorage.setItem('discord_token', token);
        
        // 유저 객체를 만들어서 저장! 🐧 이 부분이 빠져있었어요.
        if (username) {
            const userObj = {
                username: username,
                id: userId,
                avatar: avatar
            };
            localStorage.setItem('user', JSON.stringify(userObj));
        }

        // ... 나머지 UI 변경 로직 ...
        window.history.replaceState({}, document.title, "/");
    }
});
