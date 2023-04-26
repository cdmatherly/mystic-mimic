import { useEffect, useState } from "react";
import axios from 'axios'
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import EachCampaign from "../components/EachCampaign";


const ViewAllCampaigns = (props) => {
    const [campaigns, setCampaigns] = useState([])
    const [characters, setCharacters] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id
    const [newCampaign, setNewCampaign] = useState(null)
    const [updateCampaigns, setUpdateCampaigns] = useState(null)


    useEffect(() => {
        axios.get(`http://localhost:8000/api/campaigns`)
            .then(res => {
                console.log(res)
                setCampaigns(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
            axios.get(`http://localhost:8000/api/${user}/characters/campaign_null`)
            .then(res => {
                console.log(res)
                setCharacters(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [newCampaign, updateCampaigns])

    return (
        <>
            <div className="min-h-screen py-16 bg-black bg-opacity-80 rounded-lg">
                <div className="grid grid-cols-4 gap-10">
                    {campaigns.map((campaign) => 
                    <EachCampaign key={campaign._id} campaign={campaign} characters={characters} setNewCampaign={setNewCampaign} setUpdateCampaigns={setUpdateCampaigns}/>
                    )}
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default ViewAllCampaigns;