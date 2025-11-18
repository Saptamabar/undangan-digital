import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    if (req.nextauth.token && req.nextUrl.pathname === '/') {
    
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  },
  {
    
    pages: {
      signIn: "/login", 
    },
  }
)

export const config = { 
  matcher: [
    "/dashboard/:path*", 
    "/"                  
  ] 
}