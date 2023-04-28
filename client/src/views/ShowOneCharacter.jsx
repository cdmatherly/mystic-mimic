import charImg from '../images/bard_lute_char_img.jpeg';
import ImageModal from '../components/ImageModal'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Chat from '../components/Chat';
import { useCookies } from 'react-cookie'
import io from 'socket.io-client'
import Tabs from './sideViewOneCharacter';
import ChatDrawer from '../components/ChatDrawer'


const ShowOneCharacter = (props) => {
    const { char_id } = useParams()
    const [character, setCharacter] = useState(null)
    const [campaignId, setCampaignId] = useState(null)
    const [isCharacterLoading, setIsCharacterLoading] = useState(true)
    const [isUserLoading, setIsUserLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [strBonus, setStrBonus] = useState(0)
    const [dexBonus, setDexBonus] = useState(0)
    const [conBonus, setConBonus] = useState(0)
    const [wisBonus, setWisBonus] = useState(0)
    const [intBonus, setIntBonus] = useState(0)
    const [chaBonus, setChaBonus] = useState(0)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user_id = cookies.user_id
    const [socket] = useState(() => io(':8000'))

    const skillList = [{ stat: 'DEX', name: 'Acrobatics' }, { stat: 'WIS', name: 'Animal Handling' }, { stat: 'INT', name: 'Arcana' }, { stat: 'STR', name: 'Athletics' }, { stat: 'CHA', name: 'Deception' }, { stat: 'INT', name: 'History' }, { stat: 'CHA', name: 'Intimidation' }, { stat: 'INT', name: 'Investigation' }, { stat: 'WIS', name: 'Medicine' }, { stat: 'INT', name: 'Nature' }, { stat: 'WIS', name: 'Perception' }, { stat: 'CHA', name: 'Performance' }, { stat: 'CHA', name: 'Persuasion' }, { stat: 'INT', name: 'Religion' }, { stat: 'DEX', name: 'Sleight of Hand' }, { stat: 'DEX', name: 'Stealth' }, { stat: 'WIS', name: 'Survival' }]



    useEffect(() => {
        axios.get(`http://localhost:8000/api/characters/${char_id}`)
            .then(res => {
                console.log(res)
                setCharacter(res.data)
                setIsCharacterLoading(false)
                res.data.campaign !== null && (
                    socket.emit("join_room", res.data.campaign._id))
                res.data.campaign && setCampaignId(res.data.campaign._id)
                const findBonus = (stat) => {
                    if (stat >= 8 && stat <= 9 ){
                        return -1
                    }
                    if (stat >= 10 && stat <= 11 ){
                        return 0
                    }
                    if (stat >= 12 && stat <= 13 ){
                        return 1
                    }
                    if (stat >= 14 && stat <= 15 ){
                        return 2
                    }
                }
                setStrBonus(findBonus(res.data.stats.strength))
                setDexBonus(findBonus(res.data.stats.dexterity))
                setConBonus(findBonus(res.data.stats.constitution))
                setWisBonus(findBonus(res.data.stats.wisdom))
                setIntBonus(findBonus(res.data.stats.intelligence))
                setChaBonus(findBonus(res.data.stats.charisma))
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`http://localhost:8000/api/users/${user_id}`)
            .then(res => {
                console.log(res)
                setUser(res.data)
                setIsUserLoading(false)
                setIsUserLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

        return () => socket.disconnect(true)
    }, [socket])

    return (
        <div className=''>
            {!isUserLoading && !isCharacterLoading && (
                <div className='flex relative justify-center'>
                    <div className="grid items-start justify-center w-4/5 gap-8">
                        <div className="relative">
                            <div className="absolute rounded-lg -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 blur-lg "></div>

                            {/* Below holds the value of the top bar*/}
                            <div className="relative max-w-full px-14 py-8 overflow-hidden bg-white rounded shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <ImageModal character={character}/>
                                            <div className="">
                                                <p className="text-lg font-bold text-gray-500">
                                                    {character.name}
                                                </p>
                                                <div className='flex gap-1 text-sm text-slate-400'>
                                                    <p className=''>{character.race}</p>
                                                    <p className=''>{character.class}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-center -mt-5 mr-5 gap-5">
                                            {/* Map through each stat */}
                                            {Object.entries(character.stats).map((stat) =>
                                                <div key={stat[0]} className="items-center flex flex-col gap-2">
                                                    <div className="">
                                                        <p className="block mb-1 font-bold text-gray-500 md:text-center md:mb-0">
                                                            {/* Capitalize the first letter */}
                                                            {stat[0].charAt(0).toUpperCase() + stat[0].slice(1)}:
                                                        </p>
                                                    </div>
                                                    <div className="">
                                                        <button className="px-2 py-1 text-center text-gray-700 bg-gray-200 border-2 border-gray-300 rounded shadow">
                                                            {stat[0] === 'strength' ? strBonus >= 0 ? '+ ' : '' : 
                                                            stat[0] === 'dexterity' ? dexBonus >= 0 ? '+ ' : '' : 
                                                            stat[0] === 'constitution' ? conBonus >= 0 ? '+ ' : '' : 
                                                            stat[0] === 'wisdom' ? wisBonus >= 0 ? '+ ' : '' : 
                                                            stat[0] === 'intelligence' ? intBonus >= 0 ? '+ ' : '' : 
                                                            stat[0] === 'charisma' ? chaBonus >= 0 ? '+ ' : '' : 
                                                            'null'}{stat[0] === 'strength' && strBonus} {stat[0] === 'dexterity' && dexBonus} {stat[0] === 'constitution' && conBonus}  {stat[0] === 'wisdom' && wisBonus} {stat[0] === 'intelligence' && intBonus} {stat[0] === 'charisma' && chaBonus}</button>
                                                    </div>
                                                    <div className="">
                                                        <p className="px-2 py-1 text-xs text-center text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">{stat[1]}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='text-right'>
                                        <p className='font-semibold'>Current Campaign:</p>
                                        <div> {character.campaign ? character.campaign.name : "None"}</div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    {/* Bottom Left Column, On View One Character Page*/}
                                    <div className='flex-32 p-3 mr-4 border-2 border-solid rounded'>
                                        <div className="mb-6 align-middle md:items-center">

                                            {skillList.map((skill) => <div key={skill.name} className="flex items-center mb-3 place-content-center">
                                                <p className="block w-1/5 pr-4 mb-1 text-xs font-bold text-center text-gray-400 align-middle md:mb-0">{skill.stat}</p>
                                                <p className="block w-3/5 pr-4 mb-1 font-bold text-center text-gray-500 align-middle text-md md:mb-0">
                                                    {skill.name}:
                                                </p>
                                                <button className="w-1/5 py-1 leading-tight text-center text-gray-700 bg-gray-200 border-2 border-gray-300 shadow rounded">
                                                    {skill.stat === 'STR' ? strBonus >= 0 ? '+' : '' : 
                                                            skill.stat === 'DEX' ? dexBonus >= 0 ? '+ ' : '' : 
                                                            skill.stat === 'CON' ? conBonus >= 0 ? '+ ' : '' : 
                                                            skill.stat === 'WIS' ? wisBonus >= 0 ? '+ ' : '' : 
                                                            skill.stat === 'INT' ? intBonus >= 0 ? '+ ' : '' : 
                                                            skill.stat === 'CHA' ? chaBonus >= 0 ? '+ ' : '' : 
                                                            'null'}
                                                            {skill.stat === 'STR' && strBonus} {skill.stat === 'DEX' && dexBonus} {skill.stat === 'CON' && conBonus}  {skill.stat === 'WIS' && wisBonus} {skill.stat === 'INT' && intBonus} {skill.stat === 'CHA' && chaBonus}
                                                </button>
                                            </div>)}

                                        </div>
                                    </div>

                                    {/* Right Side of the bottom div */}
                                    <div className='flex-auto w-96 p-3 mr-4 border-2 border-solid rounded'>
                                        <Tabs />
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <button className={'text-red-500 hover:animate-bounce absolute right-0 -mr-12 transition-opacity ease-in-out duration-300 delay-300 ' + (isOpen ? ' opacity-0 ' : ' opacity-100 ')} onClick={() => setIsOpen(true)}>
                        <img className="h-20 w-20" src='https://cdn.discordapp.com/attachments/1100458355530666149/1101401013623201822/pi5rK5nyT.png'/>
                    Open Chat</button>
                    <ChatDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
                        <Chat socket={socket} user={user} campaign={character.campaign} />
                    </ChatDrawer>
                </div>
            )}
        </div>
    )
}
export default ShowOneCharacter;