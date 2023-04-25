
const CreateAGroup = (props) => {
    return (
        <>
            <body className="min-h-screen py-16 bg-black">
                <div className="grid gap-8 items-start justify-center">
                    <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 rounded-lg blur-lg "></div>
                        <div className="relative max-w-full rounded overflow-hidden shadow-lg px-20 py-20 bg-white">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">(User Name - Creating Group)</h2>
                        <form className="w-full max-w-sm">
                            <br/>
                            <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" HTMLFor="group-name">Group Name:</label>
                            <input id="group-name" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"type="text" />
                            <br/>
                            <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" HTMLFor="purpose">Purpose:</label>
                            <input id="purpose" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" />
                            <br/>
                            <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" HTMLFor="player-max">Player Max:</label>
                            <input id="player-max" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"type="number" min="0" max="8"/>
                            <br/>
                            <br/>
                            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">Create Group</button>
                        </form>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}
export default CreateAGroup;