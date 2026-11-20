import { type NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes — only cookie-based session check (no Supabase required)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const adminSession = request.cookies.get('rudraksh_admin_session')
    if (!adminSession) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protect catalogue routes
  if (pathname.startsWith('/catalogue')) {
    const accessToken = request.cookies.get('rudraksh_catalogue_access')
    if (!accessToken) {
      const requestUrl = new URL('/catalogue-request', request.url)
      requestUrl.searchParams.set('from', 'catalogue')
      return NextResponse.redirect(requestUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
