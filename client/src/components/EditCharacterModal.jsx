import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LeaveCampaignModal from './LeaveCampaignModal'

export default function Modal(props) {
    const { character, handleEdit, races, classes } = props
    const [newRace, setNewRace] = useState(character.race)
    const [newClass, setNewClass] = useState(character.class)
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(character.name)

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
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Edit <span className="text-fuchsia-700 underline">{character.name}</span>
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form onSubmit={(e) => onSubmitHandler(e)}>
                                    <div className="relative max-w-full rounded overflow-hidden shadow-lg px-16 py-16 bg-white">
                                        <div >
                                            <div className="mb-6">
                                                <input className="text-gray-500 font-bold" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="md:flex md:items-center mb-6">
                                            <div className="md:w-1/3">
                                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                    Race:
                                                </label>
                                            </div>
                                            <div className="md:w-2/3">
                                                <select name="" id="" onChange={(e) => setNewRace(e.target.value)} className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight">
                                                    <option value={character.race}>{character.race}</option>
                                                    {otherRaces.map((race) =>
                                                        <option key={race.index} value={race.name}>{race.name}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="md:flex md:items-center mb-6">
                                            <div className="md:w-1/3">
                                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                    Class:
                                                </label>
                                            </div>
                                            <div className="md:w-2/3">
                                                <select name="" id="" onChange={(e) => setNewClass(e.target.value)} className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight">
                                                    <option value={character.class}>{character.class}</option>
                                                    {otherClasses.map((eachClass) =>
                                                        <option key={eachClass.index} value={eachClass.name}>{eachClass.name}</option>)}
                                                </select>                                            </div>
                                        </div>

                                        <div className="md:flex md:items-center mb-6">
                                            <div className="md:w-1/3">
                                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                    Campaign:
                                                </label>
                                            </div>
                                            <div className="md:w-2/3 flex text-center">
                                                {character.campaign ?
                                                    <>
                                                        <p className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight text-center">{character.campaign.name}</p>
                                                        <LeaveCampaignModal character={character} handleLeaveCampaign={handleLeaveCampaign} />
                                                    </>
                                                    :
                                                    <>
                                                        <p className="bg-gray-200 border-2 border-gray-200 rounded w-full py-4 px-4 text-gray-700 leading-tight text-center"> None </p>
                                                        <Link to="/vac" className="shadow bg-sky-500 hover:bg-sky-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm">Join One?</Link>
                                                    </>}
                                            </div>
                                        </div>

                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Confirm Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}