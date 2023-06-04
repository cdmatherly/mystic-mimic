import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthProvider';
import axios from 'axios'
import { useCookies } from 'react-cookie';

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validationErrors, setValidationErrors] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const navigate = useNavigate()
    
    const authenticateUser = (user) => {
        axios.post('http://localhost:8000/api/login', user)
            .then(res => {
                console.log(res)
                const user_id = res.data.user_id
                setCookie(['user_id'], user_id, {maxAge: 86400})
                navigate('/')
            })
            .catch(err => {
                setEmail('')
                setPassword('')
                setValidationErrors(null)
                console.log(user)
                console.log(err)
                setValidationErrors(err.response?.data)
            })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        authenticateUser({email, password})
    }

    return (
        <>
            <div className="relative max-w-full py-20 bg-no-repeat bg-cover" style={{
                                backgroundPosition: '100%',
                                backgroundImage: 'url("https://cdn.shopify.com/s/files/1/0059/3061/4851/products/B9A0964.jpg?v=1653900526&width=1445")',
                                height: '100vh',
                                width: 'auto'
                            }}>
                <div className="grid items-start justify-center">
                <div className="flex flex-col flex-1 w-2/5 max-h-full min-w-full px-10 py-12 bg-gray-800 rounded-lg bg-opacity-90 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                        <h1 className="mb-4 text-3xl font-extrabold text-black md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-500 from-sky-400">Mystic</span> Mimic</h1>
                        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-white">
                            - Sign in to your account -
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={(e)=>onSubmitHandler(e)}>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                        Email address:
                                    </label>
                                    {validationErrors?.error && (<p style={{ color: 'red', marginLeft: '5px' }}>{validationErrors.error}</p>)}
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={(event) =>{setEmail(event.target.value)}}
                                        value={email}
                                        required
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Password:
                                    </label>
                                    {/* <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div> */}
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={(event) =>{setPassword(event.target.value)}}
                                        value={password}
                                        required
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </button>
                            </div>
                        </form>
                            <p className="mt-10 text-sm text-center text-gray-200">
                                Not a member?{' '}
                                <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Register
                                </Link>
                            </p>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login