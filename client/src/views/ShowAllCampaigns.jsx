import EachCampaign from "../components/EachCampaign";


const ViewAllCampaigns = (props) => {
    return (
        <>
            <body className="min-h-screen py-16 bg-black">
                <div className="grid grid-cols-4 gap-10">
                    <EachCampaign />
                </div>
            </body>
        </>
    )
}
export default ViewAllCampaigns;