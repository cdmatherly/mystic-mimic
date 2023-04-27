import charImg from '../images/bard_lute_char_img.jpeg';
import ImageModal from '../components/ImageModal'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Chat from '../components/Chat';
import { useCookies } from 'react-cookie'
import io from 'socket.io-client'


const ShowOneCharacter = (props) => {
    const { char_id } = useParams()
    const [character, setCharacter] = useState(null)
    const [isUserLoading, setIsUserLoading] = useState(true)
    const [isCharacterLoading, setIsCharacterLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user_id = cookies.user_id
    const [socket] = useState(() => io(':8000'))



    useEffect(() => {
        axios.get(`http://localhost:8000/api/characters/${char_id}`)
            .then(res => {
                console.log(res)
                setCharacter(res.data)
                setIsCharacterLoading(false)
                socket.emit("join_room", 1)
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`http://localhost:8000/api/users/${user_id}`)
            .then(res => {
                console.log(res)
                setUser(res.data)
                setIsUserLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
            
        return () => socket.disconnect(true)
    }, [socket])

    return (
        <div className='flex'>
            {!isUserLoading && !isCharacterLoading && (
                <>
                    <div className="grid items-start justify-center w-4/5 gap-8">
                        <div className="relative">
                            <div className="absolute rounded-lg -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 blur-lg "></div>
                            <div></div>
                            <div className="relative max-w-full px-20 py-20 overflow-hidden bg-white rounded shadow-lg">
                                <div>
                                    <ImageModal character={character}>
                                    </ImageModal>
                                    <div className="mb-6">
                                        <p className="text-lg font-bold text-gray-500">
                                            {character.name}
                                        </p>
                                        <div className='flex gap-1 text-sm text-slate-400'>
                                            <p className=''>{character.race}</p>
                                            <p className=''>{character.class}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="mb-6 md:items-center">
                                        <div className="md:w-1/3">
                                            <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                                Strength:
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <p className="w-full px-4 py-4 leading-tight text-center text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">{character.stats.strength}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6 md:items-center">
                                        <div className="md:w-1/3">
                                            <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                                Dexterity:
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <p className="w-full px-4 py-4 leading-tight text-center text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">{character.stats.dexterity}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6 md:items-center">
                                        <div className="md:w-1/3">
                                            <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                                Constitution:
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <p className="w-full px-4 py-4 leading-tight text-center text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">{character.stats.constitution}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6 md:items-center">
                                        <div className="md:w-1/3">
                                            <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                                Wisdom:
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <p className="w-full px-4 py-4 leading-tight text-center text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">{character.stats.wisdom}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6 md:items-center">
                                        <div className="md:w-1/3">
                                            <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                                Intelligence:
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <p className="w-full px-4 py-4 leading-tight text-center text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">{character.stats.intelligence}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6 md:items-center">
                                        <div className="md:w-1/3">
                                            <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                                Charisma:
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <p className="w-full px-4 py-4 leading-tight text-center text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">{character.stats.charisma}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    {/* Bottom Left Column, On View One Character Page*/}
                                    <div className='flex-auto p-3 mr-4 border-2 border-solid rounded'>
                                        <div className="mb-6 align-middle md:items-center">
                                            <div className="flex mb-3 place-content-center">
                                                <label className="block pr-4 mb-1 text-lg font-bold text-center text-gray-500 align-middle md:mb-0">
                                                    Left Column Skill 1:
                                                </label>
                                                <p className="px-4 py-1 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                                            </div>

                                            <div className="flex mb-3 place-content-center">
                                                <label className="block pr-4 mb-1 text-lg font-bold text-center text-gray-500 align-middle md:mb-0">
                                                    Left Column Skill 2:
                                                </label>
                                                <p className="px-4 py-1 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                                            </div>

                                            <div className="flex mb-3 place-content-center">
                                                <label className="block pr-4 mb-1 text-lg font-bold text-center text-gray-500 align-middle md:mb-0">
                                                    Left Column Skill 3:
                                                </label>
                                                <p className="px-4 py-1 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                                            </div>

                                            <div className="flex mb-3 place-content-center">
                                                <label className="block pr-4 mb-1 text-lg font-bold text-center text-gray-500 align-middle md:mb-0">
                                                    Left Column Skill 4:
                                                </label>
                                                <p className="px-4 py-1 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='flex-auto p-3 mr-4 border-2 border-solid rounded'>
                                        <div className="flex mb-3 place-content-center">
                                            <label className="block pr-4 mb-1 text-lg font-bold text-center text-gray-500 align-middle md:mb-0">
                                                Right Column Skill 1sadjkfdaskjsdafkajsdf:
                                            </label>
                                            <p className="px-4 py-1 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Chat socket={socket} user={user} campaign={character.campaign} />
                </>)}
        </div>
    )
}
export default ShowOneCharacter;