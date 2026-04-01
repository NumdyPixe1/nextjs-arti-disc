export const silmilarityScore = (similarity: number) => {
    // .toFixed(2): จะทำการ "ปัดเศษตามหลักคณิตศาสตร์" และรักษาทศนิยมไว้
    // ถ้าได้ 0.9999 มันจะแสดงเป็น 100.00% หรือถ้าได้ 0.9556 จะแสดงเป็น 95.56%
    const percent = similarity * 100;
    return percent.toFixed(2) + "%";
    // const percent = Math.floor(similarity * 100);
    // return `${percent}%`;

}

export const getSimilarityColor = (percent: number) => {
    if (percent >= 70) { return { color: 'bg-emerald-500' }; }
    if (percent >= 50) { return { color: 'bg-amber-400' }; }
    return { color: 'bg-slate-400' };
}