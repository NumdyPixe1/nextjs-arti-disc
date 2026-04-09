'use server'


import { createClient } from '@/lib/supabase/supabaseServer'
import { redirect } from 'next/navigation'

export const signUpAction = async (formData: FormData) => {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('full_name') as string
    // กำหนด role พื้นฐานเป็น 'user' สำหรับหน้าสมัครสาธารณะ
    const role = 'user'

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                role: 'user', // ส่ง role เข้าไปใน metadata ของ auth.users
            },
        },
    })

    if (error) {
        redirect(`/signup?error=${encodeURIComponent(error.message)}`)
    }

    // หลังจากสมัครสำเร็จ (ปกติ Supabase จะส่งเมลยืนยันถ้าตั้งค่าไว้)
    // ในที่นี้เราจะส่งไปหน้าสำเร็จ หรือหน้าแรก
    return { success: true }
}