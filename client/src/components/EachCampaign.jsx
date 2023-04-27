import { useState } from 'react' 
import charImg from '../images/bard_lute_char_img.jpeg';
import ShowOneCampaignModal from './ShowOneCampaignModal'

const EachCampaign = (props) => {
    const { campaign, characters, setNewCampaign, setUpdateCampaigns} = props


    return (
        <>
            <div className="relative">
                <div className="absolute rounded-lg -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 blur-lg"></div>
                <div className="relative h-full max-w-full overflow-hidden bg-white rounded shadow-lg">
                        <div className='p-20'>
                            <img className="h-20" src={charImg} alt="Character Image"></img>
                            <div className="mb-6">
                                <p className="font-bold text-gray-500">
                                    {campaign.name}
                                </p>
                                <p className='font-semibold text-gray-400'>{campaign.characters.length} Players</p>
                            </div>
                            <ShowOneCampaignModal campaign={campaign} characters={characters} setNewCampaign={setNewCampaign} setUpdateCampaigns={setUpdateCampaigns}/>
                            <p className='mt-4 font-bold'>Owner: <span className='font-semibold text-red-400'>{campaign.owner.username}</span></p>
                        </div>
                </div>
            </div>
        </>
    )
}

export default EachCampaign;