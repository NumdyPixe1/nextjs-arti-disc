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
    // ดึงข้อมูล user
    const { data: { user } } = await supabase.auth.getUser();
    const isStaffPath = req.nextUrl.pathname.startsWith("/staff");
    const isSignInStaffPath = req.nextUrl.pathname.startsWith("/signin-staff");

    // พยายามเข้าหน้า Staff แต่ไม่ได้ล็อกอิน
    if (isStaffPath && !user) {
        return NextResponse.redirect(new URL('/signin-staff', req.url))
    }
    // ล็อกอินค้างไว้แล้ว แต่อยากกลับไปหน้า Signin (ให้ดีดกลับไปหน้างาน)
    if (isSignInStaffPath && user) {
        return NextResponse.redirect(new URL('/staff/dashboard/artifacts', req.url))
    }
    return response;
}
// ตรวจสอบ Link
export const config = {
    matcher: [
        "/staff/:path*",
        "/signin-staff"]
}