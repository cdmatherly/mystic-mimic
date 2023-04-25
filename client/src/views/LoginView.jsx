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
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-500 from-sky-400">Mystic</span> Mimic</h1>
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={(e)=>onSubmitHandler(e)}>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    <Link to="/register">
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Register
                            </a>
                        </p>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Login