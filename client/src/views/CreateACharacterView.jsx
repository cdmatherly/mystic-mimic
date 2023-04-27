import { useEffect, useState } from 'react'
import axios from 'axios'
import StatSelect from '../components/StatSelect'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const CreateACharacter = (props) => {
    const navigate = useNavigate()

    const attributePointCosts = {
        8: 8,
        9: 9,
        10: 10,
        11: 11,
        12: 12,
        13: 13,
        14: 15,
        15: 17
    }

    const [name, setName] = useState("")
    const [race, setRace] = useState("Dragonborn")
    const [className, setClassName] = useState("Barbarian")

    const [strength, setStrength] = useState(8)
    const [dexterity, setDexterity] = useState(8)
    const [constitution, setConstitution] = useState(8)
    const [intelligence, setIntelligence] = useState(8)
    const [wisdom, setWisdom] = useState(8)
    const [charisma, setCharisma] = useState(8)

    const [races, setRaces] = useState([])
    const [classes, setClasses] = useState([])
    const [attributePoints, setAttributePoints] = useState(75 - attributePointCosts[strength] - attributePointCosts[dexterity] - attributePointCosts[constitution] - attributePointCosts[intelligence] - attributePointCosts[wisdom] - attributePointCosts[charisma])

    const [validationErrors, setValidationErrors] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id

    useEffect(() => {
        axios.get('https://www.dnd5eapi.co/api/races')
            .then(res => {
                // console.log(res)
                setRaces(res.data.results)
            })
            .catch(err => {
                console.log(err)
            })
        axios.get('https://www.dnd5eapi.co/api/classes')
            .then(res => {
                // console.log(res)
                setClasses(res.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleStats = (attribute, stat) => {
        console.log(attribute)
        console.log(stat)
        if (attribute === "Strength") {
            setStrength(stat)
            setAttributePoints(75 - attributePointCosts[stat] - attributePointCosts[dexterity] - attributePointCosts[constitution] - attributePointCosts[intelligence] - attributePointCosts[wisdom] - attributePointCosts[charisma])
        }
        else if (attribute === "Dexterity") {
            setDexterity(stat)
            setAttributePoints(75 - attributePointCosts[strength] - attributePointCosts[stat] - attributePointCosts[constitution] - attributePointCosts[intelligence] - attributePointCosts[wisdom] - attributePointCosts[charisma])
        }
        else if (attribute === "Constitution") {
            setConstitution(stat)
            setAttributePoints(75 - attributePointCosts[strength] - attributePointCosts[dexterity] - attributePointCosts[stat] - attributePointCosts[intelligence] - attributePointCosts[wisdom] - attributePointCosts[charisma])
        }
        else if (attribute === "Intelligence") {
            setIntelligence(stat)
            setAttributePoints(75 - attributePointCosts[strength] - attributePointCosts[dexterity] - attributePointCosts[constitution] - attributePointCosts[stat] - attributePointCosts[wisdom] - attributePointCosts[charisma])
        }
        else if (attribute === "Wisdom") {
            setWisdom(stat)
            setAttributePoints(75 - attributePointCosts[strength] - attributePointCosts[dexterity] - attributePointCosts[constitution] - attributePointCosts[intelligence] - attributePointCosts[stat] - attributePointCosts[charisma])
        }
        else if (attribute === "Charisma") {
            setCharisma(stat)
            setAttributePoints(75 - attributePointCosts[strength] - attributePointCosts[dexterity] - attributePointCosts[constitution] - attributePointCosts[intelligence] - attributePointCosts[wisdom] - attributePointCosts[stat])
        }
    }

    const handleCreateACharacter = (event) => {
        event.preventDefault()
        const stats = {
            stats: {
                strength,
                dexterity,
                constitution,
                intelligence,
                wisdom,
                charisma
            }
        }
        const newCharacter = {
            name,
            race,
            class: className,
            ...stats
        }

        axios.post(`http://localhost:8000/api/${user}/characters`, newCharacter)
            .then((response) => {
                navigate('/sac')
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
                setValidationErrors(err.response?.data?.errors)
            })
    }

    return (
        <div className="relative w-3/4 mx-auto lg:mt-10">
            <div className="absolute rounded-lg -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 blur-lg"></div>
            <div className="relative max-w-full px-20 py-10 overflow-hidden bg-white rounded shadow-lg">
                <h1 className='mb-6 text-xl font-bold text-gray-700'>Create a Character:</h1>
                <form onSubmit={(e) => handleCreateACharacter(e)} className="relative flex justify-between w-full">
                    <div className='w-2/5'>
                        <div className="mb-6 md:flex md:items-center">
                            <div className="md:w-1/6">
                                <label className="block mb-1 font-bold text-gray-500 md:text-right md:mb-0" htmlFor="inline-full-name">
                                    Character Name:
                                </label>
                            </div>
                            <div className='h-12 md:w-1/6'></div>
                            <div className="md:w-4/6">
                                {validationErrors?.name && (<p className='absolute top-0 -mt-6 text-red-500 xl:ml-10 whitespace-nowrap'>{validationErrors.name.message}</p>)}
                                <input onChange={(event) => setName(event.target.value)} id="inline-full-name" className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Enter A Name" />
                            </div>
                        </div>
                        <div className="mb-6 md:flex md:items-center">
                            <div className="md:w-1/6">
                                <label className="block mb-1 font-bold text-gray-500 md:text-right md:mb-0" htmlFor="race">
                                    Race:
                                </label>
                            </div>
                            <div className='h-12 md:w-1/6'></div>
                            <div className="md:w-4/6">
                                <select value={race} onChange={(event) => setRace(event.target.value)} id='race' className="w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded focus:outline-none focus:bg-white focus:border-purple-500">
                                    {races.map((race) =>
                                        <option key={race.index} value={race.name}>{race.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="mb-6 md:flex md:items-center">
                            <div className="md:w-1/6">
                                <label className="block mb-1 font-bold text-gray-500 md:text-right md:mb-0" htmlFor="class">
                                    Class:
                                </label>
                            </div>
                            <div className='h-12 md:w-1/6'></div>
                            <div className="md:w-4/6">
                                <select value={className} onChange={(event) => setClassName(event.target.value)} id='class' className="w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded focus:outline-none focus:bg-white focus:border-purple-500">
                                    {classes.map((eachClass) =>
                                        <option key={eachClass.index} value={eachClass.name}>{eachClass.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='float-left w-1 h-auto bg-slate-300'></div>
                    <div className='w-2/5'>
                        <h2 className='block pr-4 mb-5 text-xl font-bold text-gray-700'>Select Stats:</h2>
                        <div className="mb-6 md:flex md:items-center">
                            <div className="md:w-1/3">
                                <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" htmlFor="attributes">
                                    Remaining Stat Points:
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <p id="attributes" className="w-full px-4 py-2 text-xl font-bold leading-tight text-center text-gray-500 rounded appearance-none"> {attributePoints} </p>
                            </div>
                        </div>
                        <StatSelect attribute="Strength" stat={strength} newStat={handleStats} attributePoints={attributePoints} />
                        <StatSelect attribute="Dexterity" stat={dexterity} newStat={handleStats} attributePoints={attributePoints} />
                        <StatSelect attribute="Constitution" stat={constitution} newStat={handleStats} attributePoints={attributePoints} />
                        <StatSelect attribute="Intelligence" stat={intelligence} newStat={handleStats} attributePoints={attributePoints} />
                        <StatSelect attribute="Wisdom" stat={wisdom} newStat={handleStats} attributePoints={attributePoints} />
                        <StatSelect attribute="Charisma" stat={charisma} newStat={handleStats} attributePoints={attributePoints} />
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button className="px-4 py-2 font-bold text-white bg-purple-500 rounded shadow hover:bg-purple-400 focus:shadow-outline focus:outline-none">
                                    Create Character
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateACharacter;