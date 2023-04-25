import { useEffect, useState } from 'react'
import axios from 'axios'
import StatSelect from '../components/StatSelect'

const CreateACharacter = (props) => {
    const [races, setRaces] = useState([])
    const [classes, setClasses] = useState([])

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

    return (
        <>
            <main className="min-h-screen py-16 bg-black">
                <div className="grid gap-8 items-start justify-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 rounded-lg blur-lg "></div>
                        <div className="relative max-w-full rounded overflow-hidden shadow-lg px-20 py-20 bg-white">
                            <form className="w-full max-w-sm">
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                            Character Name:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input id="inline-full-name" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                                    </div>
                                </div>
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="race">
                                            Race:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <select id='race' className="w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                            {races.map((race) =>
                                                <option key={race.index} value={race.name}>{race.name}</option>
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
                                        <select id='class' className="w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                            {classes.map((eachClass) =>
                                                <option key={eachClass.index} value={eachClass.name}>{eachClass.name}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <br />
                                <hr />
                                <br />
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="attributes">
                                            Select Attributes:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <p id="attributes" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">27</p>
                                    </div>
                                </div>
                                <StatSelect stat="Strength" />
                                <StatSelect stat="Dexterity" />
                                <StatSelect stat="Constitution" />
                                <StatSelect stat="Intelligence" />
                                <StatSelect stat="Wisdom" />
                                <StatSelect stat="Charisma" />
                                <div className="md:flex md:items-center">
                                    <div className="md:w-1/3"></div>
                                    <div className="md:w-2/3">
                                        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
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