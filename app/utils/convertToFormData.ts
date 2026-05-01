import { ArtifactsForm } from "@/@types/artifact";

export const convertToFormData = (data: ArtifactsForm) => {
    const formData = new FormData();

    // เปลี่ยน object เป็น array EX. ['title','แจกัน']
    Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        // ✅ ตรวจสอบว่าเป็น FileList หรือไม่ (มักมาจาก input type="file")
        if (value instanceof FileList) {
            if (value.length > 0) {
                // ดึงไฟล์ลำดับที่ 0 ออกมาส่ง
                formData.append(key, value[0]);
            }
        }
        // ✅ ถ้าเป็น File เดี่ยวๆ (จากการจัดการ State)
        else if (value instanceof File) {
            formData.append(key, value);
        }
        // ✅ ข้อมูล Text หรือตัวเลขทั่วไป
        else if (typeof value !== 'string' || !value.startsWith('http')) {
            // ส่งเฉพาะข้อมูลที่ไม่ใช่ URL รูปเดิม
            formData.append(key, String(value));
        }
    });

    return formData;
}