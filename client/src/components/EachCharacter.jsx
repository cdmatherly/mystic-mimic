import { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import DeleteModal from '../components/DeleteModal'
import EditCharacterModal from '../components/EditCharacterModal'
import { Link, useNavigate} from 'react-router-dom'

const EachCharacter = (props) => {
    const { character, charImg, allCharacters, updateCharacters, races, classes} = props
    const [characters, setAllCharacters] = useState(allCharacters)
    const [deletedCharacter, setDeletedCharacter] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id
    const navigate = useNavigate()

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
            <div className="absolute rounded-lg -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 blur-lg "></div>
            <div className="relative max-w-full px-16 py-16 overflow-hidden bg-white rounded shadow-lg">
                <div>
                <img className="h-20" src={require("../images/combo_imgs/" + character.race.toLowerCase() + "-" + character.class.toLowerCase() + ".jpg")} alt="Character"></img>
                    <div className="mb-6">
                        <label className="font-bold text-gray-500">
                            {character.name}
                        </label>
                    </div>
                </div>
                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                            Race:
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <p className="w-full px-4 py-4 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">{character.race}</p>
                    </div>
                </div>

                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                            Class:
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <p className="w-full px-4 py-4 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">{character.class}</p>
                    </div>
                </div>

                <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                            Campaign:
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        {character.campaign !== null ? 
                        <Link to="/vac" className="block px-4 py-4 font-semibold leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">{character.campaign.name}</Link> : 
                        <p className="w-full px-4 py-4 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">None</p> }
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => navigate(`/soc/${character._id}`)} className="text-white text-center font-bold rounded transition ease-in-out delay-150 bg-purple-400 hover:-translate-y-1 hover:scale-150 hover:bg-purple-600 duration-300 ..." type="button">
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