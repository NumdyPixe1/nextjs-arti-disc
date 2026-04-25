import { ArtifactsForm } from "@/@types/artifact";

export const convertToFormData = (data: ArtifactsForm) => {
    const formData = new FormData();

    // เปลี่ยน object เป็น array EX. ['title','แจกัน']
    Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {

            // แยกไฟล์รูปออกจากข้อความ : แปลงตัวเลขเป็นข้อความ
            const val = value instanceof File ? value : String(value);
            formData.append(key, val);
        }
    });
    return formData;
}