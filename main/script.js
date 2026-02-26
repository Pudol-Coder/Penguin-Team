function logout() {
    // 1. 로컬 스토리지에 저장된 게 있다면 삭제
    localStorage.removeItem('user'); 
    
    // 2. 서버의 로그아웃 API 호출 (쿠키 삭제용)
    window.location.href = '/api/logout';
}
