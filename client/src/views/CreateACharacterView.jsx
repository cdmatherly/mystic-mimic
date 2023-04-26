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
        10:10,
        11:11,
        12:12,
        13:13,
        14:15,
        15:17
    }

    const [name,setName] = useState("")
    const [race,setRace] = useState("Dragonborn")
    const [className, setClassName] = useState("Barbarian")

    const [strength, setStrength] = useState(8)
    const [dexterity, setDexterity] = useState(8)
    const [constitution, setConstitution] = useState(8)
    const [intelligence, setIntelligence] = useState(8)
    const [wisdom, setWisdom] = useState(8)
    const [charisma, setCharisma] = useState(8)

    const [races, setRaces] = useState([])
    const [classes, setClasses] = useState([])
    const [attributePoints, setAttributePoints] = useState(75-attributePointCosts[strength]-attributePointCosts[dexterity]-attributePointCosts[constitution]-attributePointCosts[intelligence]-attributePointCosts[wisdom]-attributePointCosts[charisma])

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
            setAttributePoints(75-attributePointCosts[stat]-attributePointCosts[dexterity]-attributePointCosts[constitution]-attributePointCosts[intelligence]-attributePointCosts[wisdom]-attributePointCosts[charisma])
        }
        else if (attribute === "Dexterity") {
            setDexterity(stat)
            setAttributePoints(75-attributePointCosts[strength]-attributePointCosts[stat]-attributePointCosts[constitution]-attributePointCosts[intelligence]-attributePointCosts[wisdom]-attributePointCosts[charisma])
        }
        else if (attribute === "Constitution") {
            setConstitution(stat)
            setAttributePoints(75-attributePointCosts[strength]-attributePointCosts[dexterity]-attributePointCosts[stat]-attributePointCosts[intelligence]-attributePointCosts[wisdom]-attributePointCosts[charisma])
        }
        else if (attribute === "Intelligence") {
            setIntelligence(stat)
            setAttributePoints(75-attributePointCosts[strength]-attributePointCosts[dexterity]-attributePointCosts[constitution]-attributePointCosts[stat]-attributePointCosts[wisdom]-attributePointCosts[charisma])
        }
        else if (attribute === "Wisdom") {
            setWisdom(stat)
            setAttributePoints(75-attributePointCosts[strength]-attributePointCosts[dexterity]-attributePointCosts[constitution]-attributePointCosts[intelligence]-attributePointCosts[stat]-attributePointCosts[charisma])
        }
        else if (attribute === "Charisma") {
            setCharisma(stat)
            setAttributePoints(75-attributePointCosts[strength]-attributePointCosts[dexterity]-attributePointCosts[constitution]-attributePointCosts[intelligence]-attributePointCosts[wisdom]-attributePointCosts[stat])
        }
        
    }

    const postCreateACharacter = (event) => {
        event.preventDefault();
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
            class:className,
            ...stats
        }

        console.log(stats)
        console.log(newCharacter)

        axios.post(`http://localhost:8000/api/${user}/characters`, newCharacter)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <main className="min-h-screen py-16 bg-black bg-opacity-80 rounded-lg">
                <div className="grid gap-8 items-start justify-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 rounded-lg blur-lg "></div>
                        <div className="relative max-w-full rounded overflow-hidden shadow-lg px-20 py-20 bg-white">
                            <h1>Create a Character:</h1>
                            <form onSubmit={ (e) => postCreateACharacter(e) } className="w-full max-w-sm">
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                            Character Name:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input onChange={ (event) => setName(event.target.value) } id="inline-full-name" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Enter A Name"/>
                                    </div>
                                </div>
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="race">
                                            Race:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <select value={race} onChange={ (event) => setRace(event.target.value) } className="w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                            {races.map((race) =>
                                                <option value={race.name}>{race.name}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="class">
                                            Class:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <select value={className} onChange={ (event) => setClassName(event.target.value) } className="w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                            {classes.map((eachClass) =>
                                                <option value={eachClass.name}>{eachClass.name}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <br />
                                <hr />
                                <br />
                                <h2>Select Attributes:</h2>
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="attributes">
                                            Remaining Att. Points:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <p id="attributes" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"> {attributePoints} </p>
                                    </div>
                                </div>
                                <StatSelect attribute="Strength" stat={strength} newStat={ handleStats } attributePoints={attributePoints}/>
                                <StatSelect attribute="Dexterity"  stat={dexterity} newStat={ handleStats } attributePoints={attributePoints}/>
                                <StatSelect attribute="Constitution"  stat={constitution} newStat={ handleStats } attributePoints={attributePoints}/>
                                <StatSelect attribute="Intelligence"  stat={intelligence} newStat={ handleStats } attributePoints={attributePoints}/>
                                <StatSelect attribute="Wisdom"  stat={wisdom} newStat={ handleStats } attributePoints={attributePoints}/>
                                <StatSelect attribute="Charisma"  stat={charisma} newStat={ handleStats } attributePoints={attributePoints}/>
                                <div className="md:flex md:items-center">
                                    <div className="md:w-1/3"></div>
                                    <div className="md:w-2/3">
                                        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                            Create Character
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default CreateACharacter;