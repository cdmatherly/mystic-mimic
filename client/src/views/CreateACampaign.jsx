import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const CreateACampaign = (props) => {
    const [name, setName] = useState('')
    const [validationErrors, setValidationErrors] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id
    const navigate = useNavigate()

    const createCampaign = (campaign) => {
        axios.post(`http://localhost:8000/api/${user}/campaigns`, campaign)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                setValidationErrors(err.response?.data?.errors)
            })
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault()
        createCampaign({name})
        navigate('/campaigns')
    }
    return (
            <div className="grid items-start justify-center gap-8 lg:mt-10">
                <div className="relative">
                <div className="absolute rounded-lg -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 blur-lg "></div>
                    <div className="relative max-w-full px-20 py-20 overflow-hidden bg-white rounded shadow-lg">
                    <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">New Campaign</h2>
                    <form onSubmit={(e) => onSubmitHandler(e)} className="w-full max-w-sm">
                        <br/>
                        <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-left md:mb-0" htmlFor="group-name">Campaign Name:</label>
                        <input id="group-name" className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        {validationErrors?.name && (<p style={{ color: 'red', marginLeft: '5px' }}>{validationErrors.name.message}</p>)}
                        <button className="px-4 py-2 mt-5 font-bold text-white bg-purple-500 rounded shadow hover:animate-pulse hover:bg-purple-400 focus:shadow-outline focus:outline-none" type="submit">
                            Create Group
                        </button>
                    </form>
                    </div>
                </div>
            </div>
    )
}
export default CreateACampaign;