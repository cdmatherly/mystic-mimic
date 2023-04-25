import { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const EachCharacter = (props) => {
    const { character, charImg, allCharacters } = props
    const [charactesr, setAllCharacters] = useState(allCharacters)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/${user}/characters/${character._id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    
    return (
        <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 rounded-lg blur-lg "></div>
            <div className="relative max-w-full rounded overflow-hidden shadow-lg px-20 py-20 bg-white">
                <div >
                    <img className="h-20" src={charImg} alt="Character Image"></img>
                    <div className="mb-6">
                        <label className="text-gray-500 font-bold">
                            {character.name}
                        </label>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Race:
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <p className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight">{character.race}</p>
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Class:
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <p className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight">{character.class}</p>
                    </div>
                </div>
                <p>{character._id}</p>

                <div className="md:w-2/3 flex gap-10">
                    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                        View
                    </button>

                    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                        Edit
                    </button>

                    <button onClick={(e) => handleDelete(e)} className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EachCharacter