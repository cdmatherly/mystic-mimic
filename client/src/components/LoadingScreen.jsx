
const LoadingScreen = () => {
    return (
        <div className="flex flex-col items-center justify-around w-full h-full">
            <div className="w-5/6 h-2 bg-opacity-20 bg-slate-300 animate-pulse"></div>
            <div className="w-3/4 h-2 bg-opacity-20 bg-slate-300 animate-pulse"></div>
            <div className="w-5/6 h-2 bg-opacity-20 bg-slate-300 animate-pulse"></div>
            <div className="w-3/4 h-2 bg-opacity-20 bg-slate-300 animate-pulse"></div>
        </div>
    )
}

export default LoadingScreen