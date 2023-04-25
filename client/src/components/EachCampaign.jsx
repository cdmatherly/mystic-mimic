import charImg from '../images/bard_lute_char_img.jpeg';
import ShowOneCampaignModal from './ShowOneCampaignModal'

const EachCampaign = (props) => {
    const { campaign } = props

    return (
        <>
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 rounded-lg blur-lg "></div>
                <div className="relative max-w-full rounded overflow-hidden shadow-lg px-40 py-20 bg-white">
                        <div>
                            <img className="h-20" src={charImg} alt="Character Image"></img>
                            <div className="mb-6">
                                <label className="text-gray-500 font-bold">
                                    {campaign.name}
                                </label>
                            </div>
                            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">View Campaign</button>
                            <ShowOneCampaignModal campaign={campaign}/>
                        </div>
                </div>
            </div>
        </>
    )
}

export default EachCampaign;