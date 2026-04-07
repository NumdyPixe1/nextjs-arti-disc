import { Skeleton } from "./skeleton"

export const Loading = () => {
    return <>
        <div className="font-ibm-thai grid grid-cols-4 gap-6">
            {/* Mock */}
            {[...Array(8)].map((_, i) => (
                <Skeleton key={i} />
            ))}
        </div>
    </>
}