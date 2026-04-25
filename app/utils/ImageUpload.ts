export const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>,
    onFileProcessed: (file: File | null, previewUrl: string | null) => void) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
        onFileProcessed(null, null)
        return
    }
    // สร้าง URL สำหรับ Preview
    const objectUrl = URL.createObjectURL(file);
    // ส่งค่ากลับผ่าน callback แทนการเรียก setPreviewUrl ตรงๆ (ถ้าไม่มี state ในนี้)
    onFileProcessed(file, objectUrl);
}