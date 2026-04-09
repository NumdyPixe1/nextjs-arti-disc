import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
    let response = NextResponse.next();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string,
        {
            cookies: { // จำว่า User คนนี้ล็อกอินอยู่หรือไม่
                getAll() {
                    return req.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => req.cookies.set(name, value))
                    response = NextResponse.next({
                        request: {
                            headers: req.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser();
    if (req.nextUrl.pathname.startsWith("/staff") && !user) {
        return NextResponse.redirect(new URL('/signin-staff', req.url))
    }
    if (req.nextUrl.pathname.startsWith("/signin-staff") && user) {
        return NextResponse.redirect(new URL('/staff', req.url))
    }
    return response;
}
export const config = {
    matcher: [
        "/staff/:path*", "/signin-staff"]
}