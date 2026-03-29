import { createClient } from '@supabase/supabase-js'
import { Database } from '@/@types/supabase'


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string,
    // {
    //     auth: {
    //         persistSession: false,      // ไม่เก็บข้อมูลการ Login
    //         autoRefreshToken: false,    // ไม่รีเฟรช Token อัตโนมัติ
    //         detectSessionInUrl: false   // ไม่ต้องเช็ค Session จาก URL
    //     } 
    // }
)
export default supabase;