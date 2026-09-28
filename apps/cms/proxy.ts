import { NextRequest, NextResponse } from 'next/server'

const COOKIE = 'dgrandeur_cms_session'
const LOGIN = '/login'

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith(LOGIN) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  const session = req.cookies.get(COOKIE)
  if (!session) {
    return NextResponse.redirect(new URL(LOGIN, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
