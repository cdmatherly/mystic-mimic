
const NotFound = (props) => {
    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full">
            <p className="absolute top-0 text-5xl font-semibold text-white">Oh no!</p>
            <p className="mb-5 text-3xl font-semibold text-white">You're Lost!</p>
            <p className="mb-24 text-3xl font-semibold text-white">Try another page</p>
        </div>
    )
}

export default NotFound