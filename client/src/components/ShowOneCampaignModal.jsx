import { useState } from "react";
import axios from 'axios'
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function Modal(props) {
    const { campaign, characters, setNewCampaign, setUpdateCampaigns } = props
    const [ selectedCharacter, setSelectedCharacter ] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id
    const navigate = useNavigate()

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

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/campaigns/${campaign._id}`)
            .then(res => {
                console.log(res)
                setUpdateCampaigns(res)
                setShowModal(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const navToCharacter = (id) => {
        navigate(`/soc/${id}`)
    }

    return (
        <>
            <button
                className="px-4 py-2 font-bold text-white bg-purple-500 rounded shadow animate-pulse hover:bg-purple-400 focus:shadow-outline focus:outline-none"
                type="button"
                onClick={() => setShowModal(true)}
            >
                View Campaign
            </button>
            {showModal ? (
                <>
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
                    >
                        <div className="relative w-auto max-w-3xl mx-auto my-6">
                            {/*content*/}
                            <div className="relative flex flex-col w-full px-10 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none ">
                                {/*header*/}
                                <div className="flex items-center justify-around gap-5 p-5 border-b border-solid rounded-t border-slate-200">
                                    <h3 className="text-3xl font-semibold">
                                        {campaign.name} 
                                    </h3>
                                    {user === campaign.owner._id && (
                                    <button
                                        className="p-1 ml-auto text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded shadow outline-none hover:bg-red-600 hover:shadow-lg focus:outline-none"
                                        onClick={() => handleDelete()}
                                    >
                                            Delete
                                    </button>
                                    )}
                                </div>
                                {/*body*/}
                                <div className="relative flex-auto p-6">
                                    <p>Info about each campaign here!</p>
                                    <p className="mt-5 text-lg font-semibold">Players:</p>
                                    {/* shows message if character list is empty */}
                                    {campaign.characters.length !== 0 ? campaign.characters.map((character) => 
                                        <p key={character._id} className="text-right"><button onClick={() => navToCharacter(character._id)}>{character.name}</button></p>
                                    ) : <p className="text-right">None yet!</p>}
                                </div>
                                {/*footer*/}
                                <select name="character" id="character" className="px-2 py-1" onChange={(e) => setSelectedCharacter(e.target.value)}>
                                    <option value="null">Select a Character</option>
                                    {characters.map((character) => 
                                    <option key={character._id} value={character._id} >{character.name}</option>
                                    )}
                                </select>
                                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                                    <button
                                        className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-gray-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button onClick={(e) => {handleJoin(e)}}
                                        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                        type="button"
                                    >
                                        Join Campaign
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            ) : null}
        </>
    );
}