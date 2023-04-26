import { useEffect, useState } from "react";
import axios from 'axios'
import { useCookies } from "react-cookie";
import EachCampaign from "../components/EachCampaign";


const ViewAllCampaigns = (props) => {
    const [campaigns, setCampaigns] = useState([])
    const [characters, setCharacters] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id
    const [newCharacter, setNewCharacter] = useState(null)


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
            axios.get(`http://localhost:8000/api/${user}/characters`)
            .then(res => {
                console.log(res)
                setCharacters(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [newCharacter])

    return (
        <>
            <div className="min-h-screen py-16 bg-black">
                <div className="grid grid-cols-4 gap-10">
                    {campaigns.map((campaign) => 
                    <EachCampaign key={campaign._id} campaign={campaign} characters={characters} setNewCharacter={setNewCharacter}/>
                    )}
                </div>
            </div>
        </>
    )
}
export default ViewAllCampaigns;