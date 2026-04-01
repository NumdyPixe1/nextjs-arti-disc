import { getSimilarityColor, silmilarityScore } from "../utils/similarityScore";

export const SimilarityBar = (similarity: { similarity: number }) => {
    const displayPercent = silmilarityScore(similarity.similarity);
    const { color } = getSimilarityColor(parseInt(displayPercent));
    let maxWidth = 200;
    const currentWidth = (parseInt(displayPercent) / 100) * maxWidth;

    console.log("SimilarityBar similarity:", similarity.similarity, "displayPercent:", displayPercent, "color:", color);
    return (
        <div className="flex flex-row items-center gap-4 mt-2   rounded-xl border border-slate-200 bg-white/95  px-2 py-1 shadow-lg backdrop-blur-sm backdrop-saturate-150">
            <p className="text-sm font-medium text-slate-700">แม่นยำ</p>

            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ease-out rounded-full ${color}`}
                    style={{ width: `${currentWidth}px` }}
                />
            </div>

            <div className="ml-auto flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">{displayPercent}</span>
            </div>


        </div>
    );
};
// <div className="fixed bottom-4 left-1/2 z-50 w-[min(95vw,700px)] -translate-x-1/2 rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm backdrop-saturate-150">
//     <div className="flex items-center justify-between gap-3"> 
