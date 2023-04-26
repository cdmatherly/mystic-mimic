import { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import DeleteModal from '../components/DeleteModal'
import EditCharacterModal from '../components/EditCharacterModal'
import { Link } from 'react-router-dom'

const EachCharacter = (props) => {
    const { character, charImg, allCharacters, updateCharacters, races, classes} = props
    const [characters, setAllCharacters] = useState(allCharacters)
    const [deletedCharacter, setDeletedCharacter] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/${user}/characters/${character._id}`)
            .then(res => {
                console.log(res)
                updateCharacters(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleEdit = (character) => {
        axios.put(`http://localhost:8000/api/characters/${character._id}`, character)
            .then(res => {
                console.log(res)
                updateCharacters(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    
    return (
        <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 rounded-lg blur-lg "></div>
            <div className="relative max-w-full rounded overflow-hidden shadow-lg px-16 py-16 bg-white">
                <div>
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

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Campaign:
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        {character.campaign !== null ? 
                        <Link to="/vac" className="bg-gray-200 border-2 border-gray-200 rounded block py-4 px-4 text-gray-700 leading-tight font-semibold">{character.campaign.name}</Link> : 
                        <p className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight">None</p> }
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <button className="text-white font-bold rounded transition ease-in-out delay-150 bg-purple-400 hover:-translate-y-1 hover:scale-150 hover:bg-purple-600 duration-300 ..." type="button">
                        View
                    </button>
                    <EditCharacterModal character={character} races={races} classes={classes} handleEdit={handleEdit}/>
                    <DeleteModal character={character} handleDelete={handleDelete}/>
                </div>
            </div>
        </div>
    )
}

export default EachCharacter