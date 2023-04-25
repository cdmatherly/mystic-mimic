import charImg from '../images/bard_lute_char_img.jpeg';
const ShowOneCharacter = (props) => {
    return (
        <>
            <body className="min-h-screen py-16 bg-black">
                <div className="grid gap-8 items-start justify-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 rounded-lg blur-lg "></div>
                        <div className="relative max-w-full rounded overflow-hidden shadow-lg px-20 py-20 bg-white">
                                <div >
                                    <img className="h-20" src={charImg} alt="Character Image"></img>
                                    <div className="mb-6">
                                        <label className="text-gray-500 font-bold">
                                            Character Name
                                        </label>
                                    </div>
                                </div>
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                            Strength:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <p className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight">Character's Strength Goes Here</p>
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                            Dexterity:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <p className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight">Character's Dexterity Goes Here</p>
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                            Constitution:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <p className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight">Character's Constitution Goes Here</p>
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                            Wisdom:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <p className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight">Character's Wisdom Goes Here</p>
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                            Intelligence:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <p className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight">Character's Intelligence Goes Here</p>
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                            Charisma:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <p className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight">Character's Charisma Goes Here</p>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}
export default ShowOneCharacter;