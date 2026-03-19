import { Skeleton } from "./Skeleton"

export const Loading = () => {
    return <>
        <div className="grid grid-cols-4 gap-6">
            {/* Mock */}
            {[...Array(8)].map((_, i) => (
                <Skeleton key={i} />
            ))}
        </div>
    </>
}