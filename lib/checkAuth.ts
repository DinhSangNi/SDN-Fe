export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false // Server-side không có localStorage

  const token = localStorage.getItem('accessToken')
  return !!token // true nếu có token
}
