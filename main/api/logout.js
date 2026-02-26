export default function handler(req, res) {
  // 쿠키를 만료시켜서 삭제합니다.
  res.setHeader('Set-Cookie', 'token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax');
  
  // 메인 페이지로 리다이렉트
  res.writeHead(302, { Location: '/' });
  res.end();
}
