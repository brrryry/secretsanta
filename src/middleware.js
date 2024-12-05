import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/profile', '/sslist', '/api/user', '/api/sslist']
 
export default async function middleware(req) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  console.log
  const isProtectedRoute = protectedRoutes.some(route => path.includes(route))
  const isAPIRoute = path.startsWith('/api/') && !path.startsWith('/api/auth')

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('auth')?.value

  let isValidUser = true;
  let userData = "";



  const res = await fetch('http://localhost:3000/api/auth/decrypt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ciphertext: cookie })
  })

  userData = await res.json()

  if (userData.error || !userData.username) {
    isValidUser = false;
  }





   isValidUser = !!userData?.username && isValidUser;



  const url = req.nextUrl.clone()
  url.pathname = "/login"


  const expired = userData ? (Date.now() - userData.time) > 1000 * 60 * 60 : true

  let good = isValidUser && !expired

  if (isAPIRoute && !good) {
    return Response.json({error: 'Unauthorized'}, { status: 401 })
  }


  if (isProtectedRoute && !good) {
    return NextResponse.redirect(url, {
      headers: {
        'Set-Cookie': 'auth=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict'
      }
    })
  }

  if(good && path === "/login") {
    const goodurl = req.nextUrl.clone();
    goodurl.pathname = "/profile/" + userData.username;
    return NextResponse.redirect(goodurl);
  }

  const response = NextResponse.next();
  if (userData) {
    response.headers.set('Session', cookie);
    response.headers.set('User', userData.username);
  }

  return response;
}
 