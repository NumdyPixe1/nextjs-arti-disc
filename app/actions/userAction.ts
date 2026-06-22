"use server" // ล็อคให้โค้ดนี้รันบน Server เท่านั้น
import { User } from "@/@types/user";

import { createClient } from "@/lib/supabase/supabaseServer";
// นิยาม Interface สำหรับประเภทข้อมูล User (หากคุณยังไม่มีการประกาศไว้)




// 1. ฟังก์ชันดึงข้อมูล Staff ทีละคนตาม ID
export async function getUserById(id: string): Promise<{ data: User | null; error: any }> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('Users') // ⚠️ แนะนำให้เปลี่ยนจาก 'Artifacts' เป็น 'Users' ให้ตรงกับข้อมูลผู้ใช้
            .select('id, full_name, email, role')
            .eq('id', id)
            .single();

        if (error) {
            return { data: null, error };
        }

        return { data: data as User, error: null };
    } catch (error: any) {
        console.error('Failed to fetch staff by ID:', error);
        return { data: null, error: error.message };
    }
}

// 2. ฟังก์ชันดึงข้อมูล Staff ทั้งหมดที่มีในระบบ
export async function getAllStaff(): Promise<User[]> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('Users')
            .select('id, full_name, email, role')
            .eq('role', 'staff');

        if (error) {
            throw new Error(error.message);
        }

        return (data as User[]) || [];
    } catch (error: any) {
        console.error('Failed to fetch all staff:', error);
        throw error;
    }
}

export async function getAllUsers(): Promise<User[]> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('Users')
            .select('id, full_name, email, role')
            .eq('role', 'user');

        if (error) {
            throw new Error(error.message);
        }

        return (data as User[]) || [];
    } catch (error: any) {
        console.error('Failed to fetch all user:', error);
        throw error;
    }
}

// เพิ่มต่อท้ายในไฟล์ actions/staff.ts หรือไฟล์เดิมของคุณได้เลยครับ
export async function getCurrentUser(): Promise<{ data: User | null; error: any }> {
    try {
        const supabase = await createClient();

        // 1. ดึงข้อมูล Auth Session ของคนกดเรียก (ตัวเราเอง)
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

        if (authError || !authUser) {
            return { data: null, error: "ยังไม่ได้เข้าสู่ระบบ หรือ Session หมดอายุ" };
        }

        // 2. เอา ID ที่ได้ ไปคิวรีหาชื่อพนักงานในตาราง Users
        const { data, error } = await supabase
            .from('Users')
            .select('id, full_name, email, role')
            .eq('id', authUser.id) // ดึงจาก id ของตัวเอง
            .single();

        if (error) return { data: null, error };
        // console.log("userAction", data);
        return { data: data as User, error: null };
    } catch (error: any) {
        console.error('Failed to fetch current user:', error);
        return { data: null, error: error.message };
    }
}