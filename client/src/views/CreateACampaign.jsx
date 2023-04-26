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
        navigate('/vac')
    }
    return (
        <div className="min-h-screen py-16 bg-black bg-opacity-80 rounded-lg">
            <div className="grid gap-8 items-start justify-center">
                <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 rounded-lg blur-lg "></div>
                    <div className="relative max-w-full rounded overflow-hidden shadow-lg px-20 py-20 bg-white">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">New Campaign</h2>
                    <form onSubmit={(e) => onSubmitHandler(e)} className="w-full max-w-sm">
                        <br/>
                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="group-name">Campaign Name:</label>
                        <input id="group-name" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        {validationErrors?.name && (<p style={{ color: 'red', marginLeft: '5px' }}>{validationErrors.name.message}</p>)}
                        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-5" type="submit">Create Group</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateACampaign;