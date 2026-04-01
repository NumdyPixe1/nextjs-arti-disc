export const silmilarityScore = (similarity: number) => {
    const percent = Math.floor(similarity * 100);
    return `${percent}%`;
}

export const getSimilarityColor = (percent: number) => {
    if (percent >= 70) { return { color: 'bg-emerald-500' }; }
    if (percent >= 50) { return { color: 'bg-amber-400' }; }
    return { color: 'bg-slate-400' };
}