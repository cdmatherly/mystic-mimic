import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LeaveCampaignModal from './LeaveCampaignModal'

export default function Modal(props) {
    const { character, handleEdit, races, classes } = props
    const [newRace, setNewRace] = useState(character.race)
    const [newClass, setNewClass] = useState(character.class)
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(character.name)
    const navigate = useNavigate()

    const otherRaces = races.filter(race => race.name !== character.race)
    const otherClasses = classes.filter(eachClass => eachClass.name !== character.class)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const updatedCharacter = { name, class: newClass, race: newRace, _id: character._id }
        handleEdit(updatedCharacter)
        setShowModal(false)
    }

    const handleLeaveCampaign = () => {
        axios.put(`http://localhost:8000/api/characters/${character._id}/remove/campaigns/${character.campaign._id}`, { campaign: null })
            .then(res => {
                console.log(res)
                const updatedCharacter = { name, class: newClass, race: newRace, _id: character._id }
                handleEdit(updatedCharacter)
                setShowModal(false)
            })
            .then(err => {
                console.log(err)
            })
    }

    return (
        <>
            <button
                className="text-white font-bold rounded transition ease-in-out delay-150 bg-green-500 hover:-translate-y-1 hover:scale-150 hover:bg-green-600 duration-300 ..."
                type="button"
                onClick={() => setShowModal(true)}
            >
                Edit
            </button>
            {showModal ? (
                <>
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
                    >
                        <div className="relative w-auto max-w-3xl mx-auto my-6">
                            {/*content*/}
                            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                                    <h3 className="text-3xl font-semibold">
                                        Edit <span className="underline text-fuchsia-700">{character.name}</span>
                                    </h3>
                                    <button
                                        className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form onSubmit={(e) => onSubmitHandler(e)}>
                                    <div className="relative max-w-full px-16 py-12 overflow-hidden bg-white rounded shadow-lg">
                                        <div >
                                            <div className="mb-6">
                                                <input className="font-bold text-gray-500" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="mb-6 md:flex md:items-center">
                                            <div className="md:w-1/3">
                                                <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                                    Race:
                                                </label>
                                            </div>
                                            <div className="md:w-2/3">
                                                <select name="" id="" onChange={(e) => setNewRace(e.target.value)} className="w-full px-4 py-4 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">
                                                    <option value={character.race}>{character.race}</option>
                                                    {otherRaces.map((race) =>
                                                        <option key={race.index} value={race.name}>{race.name}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mb-6 md:flex md:items-center">
                                            <div className="md:w-1/3">
                                                <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                                    Class:
                                                </label>
                                            </div>
                                            <div className="md:w-2/3">
                                                <select name="" id="" onChange={(e) => setNewClass(e.target.value)} className="w-full px-4 py-4 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">
                                                    <option value={character.class}>{character.class}</option>
                                                    {otherClasses.map((eachClass) =>
                                                        <option key={eachClass.index} value={eachClass.name}>{eachClass.name}</option>)}
                                                </select>                                            </div>
                                        </div>

                                        <div className="mb-8 md:flex md:items-center">
                                            <div className="md:w-1/3">
                                                <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                                    Campaign:
                                                </label>
                                            </div>
                                            <div className="flex text-center md:w-2/3">
                                                {character.campaign ?
                                                    <>
                                                        <p className="w-full px-4 py-4 leading-tight text-center text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">{character.campaign.name}</p>
                                                        <LeaveCampaignModal character={character} handleLeaveCampaign={handleLeaveCampaign} />
                                                    </>
                                                    :
                                                    <>
                                                        <p className="w-full px-4 py-4 leading-tight text-center text-gray-700 bg-gray-200 border-2 border-gray-200 rounded"> None </p>
                                                        <Link to="/campaigns" className="px-4 py-2 text-sm font-bold text-white rounded shadow bg-sky-500 hover:bg-sky-400 focus:shadow-outline focus:outline-none">Join One?</Link>
                                                    </>}
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <button onClick={() => navigate(`/characters/${character._id}`)} className="italic text-center underline text-cyan-800">See more information</button>
                                        </div>

                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                                        <button
                                            className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-gray-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                            type="submit"
                                        >
                                            Confirm Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            ) : null}
        </>
    );
}