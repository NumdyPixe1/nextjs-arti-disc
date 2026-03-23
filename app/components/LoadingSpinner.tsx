export const LoadingSpinner = ({ message }: { message?: string }) => {
    return <>
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl animate-pulse">
            <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-cyan-200 font-medium">{message}</p>
        </div>
    </>
}