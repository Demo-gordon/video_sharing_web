import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtSecret } from './app/lib/utils';
import * as jose from 'jose'
 
export async function middleware(request: NextRequest) {

  let currentUser = request.cookies.get('session')?.value

  if (request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/register')) {
    return NextResponse.next()
  }

  if (!currentUser) return NextResponse.redirect(new URL('/login', request.url))
 
  try {
    const decoded = await jose.jwtVerify(currentUser, new TextEncoder().encode(jwtSecret));
    console.log(decoded)
  }
  catch (err) {
    console.log(err)
    return NextResponse.redirect(new URL('/login', request.url))
}

}
 
 export const config = {
     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
   }