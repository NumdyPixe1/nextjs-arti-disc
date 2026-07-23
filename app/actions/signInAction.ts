'use server'
import { createClient } from '@/lib/supabase/supabaseServer'
import { redirect } from 'next/navigation'
import { PATHS } from '../utils/paths'

export const signInAction = async (formData: FormData) => {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (authError) {
        return { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }
    }

    const { data: user, error: userError } = await supabase
        .from("Users")
        .select("role")
        .eq("id", authData.user.id)
        .single()

    if (userError || !user) {
        return { error: "ไม่พบข้อมูลผู้ใช้ในระบบ" }
    }
    if (user.role !== "staff") {
        await supabase.auth.signOut(); // ล็อกเอาท์ออกทันทีถ้าไม่ใช่สตาฟ
        return { error: "คุณไม่มีสิทธิ์เข้าถึงระบบเจ้าหน้าที่" };
    } else {
        redirect(PATHS.DASHBOARD) // ถ้าเป็นสตาฟส่งไปหลังบ้าน

    }
}