import { useState } from "react";
import axios from 'axios'

export default function Modal(props) {
    const { campaign, characters, setNewCharacter } = props
    const [ selectedCharacter, setSelectedCharacter ] = useState(null)
    const [showModal, setShowModal] = useState(false);

    const handleJoin = () => {
        const character = {selectedCharacter}
        axios.put(`http://localhost:8000/api/characters/${selectedCharacter}/add/campaigns/${campaign._id}`, character)
            .then(res => {
                console.log(res)
                setNewCharacter(character)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => setShowModal(true)}
            >
                View Campaign
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
                                        {campaign.name} 
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            x
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p>Info about each campaign here!</p>
                                    {campaign.characters.map((character) => 
                                        <p key={character._id}>{character.name}</p>
                                    )}
                                </div>
                                {/*footer*/}
                                <select name="character" id="character" className="px-2 py-1" onChange={(e) => setSelectedCharacter(e.target.value)}>
                                {characters.map((character) => 
                                    <option key={character._id} value={character._id} >{character.name}</option>
                                )}
                                </select>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button onClick={(e) => {handleJoin(e)}}
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        Join Campaign
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}