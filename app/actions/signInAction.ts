'use server'
import { createClient } from '@/lib/supabase/supabaseServer'
import { redirect } from 'next/navigation'

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

    const { data: profile, error: profileError } = await supabase
        .from("Profiles")
        .select("role")
        .eq("id", authData.user.id)
        .single()

    if (profileError || !profile) {
        return { error: "ไม่พบข้อมูลโปรไฟล์ในระบบ" }
    }
    if (profile.role !== "staff") {
        await supabase.auth.signOut(); // ล็อกเอาท์ออกทันทีถ้าไม่ใช่สตาฟ
        return { error: "คุณไม่มีสิทธิ์เข้าถึงระบบเจ้าหน้าที่" };
    } else {
        redirect('/admin/artifacts') // ถ้าเป็นสตาฟส่งไปหลังบ้าน

    }
}