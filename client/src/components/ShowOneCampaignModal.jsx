import { useState } from "react";
import axios from 'axios'
import { useCookies } from "react-cookie";

export default function Modal(props) {
    const { campaign, characters, setNewCampaign } = props
    const [ selectedCharacter, setSelectedCharacter ] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [ isOwner, setIsOwner ] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id
    
    user === campaign.user_id && setIsOwner(true)

    const handleJoin = () => {
        const thisCampaign = {campaign: campaign._id}
        axios.put(`http://localhost:8000/api/characters/${selectedCharacter}/add/campaigns/${campaign._id}`, thisCampaign)
            .then(res => {
                console.log(res)
                setNewCampaign(campaign)
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
                                <div className="flex justify-between items-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {campaign.name} 
                                    </h3>
                                    {isOwner && (<button
                                        className="ml-auto bg-red-500 text-white hover:bg-red-600 font-bold uppercase text-sm p-1 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                        onClick={() => setShowModal(false)}
                                    >
                                            Delete
                                    </button>)}
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