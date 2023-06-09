import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import axios from 'axios'

const Register = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validationErrors, setValidationErrors] = useState(null)
    const [uniqueValidationErrors, setUniqueValidationErrors] = useState(null)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const navigate = useNavigate()
    
    const createUser = (user) => {
        axios.post('http://localhost:8000/api/register', user)
            .then(res => {
                console.log(res)
                const user_id = res.data.user._id
                setCookie(['user_id'], user_id, {maxAge: 86400})
                navigate('/characters/new')
            })
            .catch(err => {
                console.log(user)
                console.log(err)
                setValidationErrors(err.response?.data?.errors)
                setUniqueValidationErrors(err.response?.data)
            })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        createUser({username, email, password, confirmPassword})
    }

    return (
        <>
            <div className="relative max-w-full px-20 py-20 overflow-hidden bg-no-repeat bg-cover shadow-lg " style={{
                            backgroundPosition: '100%',
                            backgroundImage: 'url("https://cdn.shopify.com/s/files/1/0059/3061/4851/products/B9A0964.jpg?v=1653900526&width=1445")',
                            height: '100vh',
                            width: 'auto'
                        }}>
                <div className="grid items-start justify-center">
                <div className="flex flex-col flex-1 w-2/5 max-h-full min-w-full px-10 py-12 bg-gray-800 rounded-lg bg-opacity-90 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                        <h1 className="mb-4 text-3xl font-extrabold text-black dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-500 from-sky-400">Mystic</span> Mimic</h1>
                        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-white">
                            -  Create an account  -
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={(e) => onSubmitHandler(e)}>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-left text-white">
                                        Username:
                                    </label>
                                    {validationErrors?.username && (<p style={{ color: 'red', marginLeft: '5px' }}>{validationErrors.username.message}</p>)}
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        // required
                                        onChange={(event) =>{setUsername(event.target.value)}}
                                        value={username}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-left text-white">
                                        Email address:
                                    </label>
                                    {validationErrors?.email && (<p style={{ color: 'red', marginLeft: '5px' }}>{validationErrors.email.message}</p>)}
                                    {uniqueValidationErrors && (<p style={{ color: 'red', marginLeft: '5px' }}>{uniqueValidationErrors}</p>)}

                                </div>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        // required
                                        onChange={(event) =>{setEmail(event.target.value)}}
                                        value={email}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Password:
                                    </label>
                                    {validationErrors?.password && (<p style={{ color: 'red', marginLeft: '5px' }}>{validationErrors.password.message}</p>)}
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        // autoComplete="current-password"
                                        onChange={(event) =>{setPassword(event.target.value);
                                            (confirmPassword === event.target.value) ? setIsPasswordValid(true) : setIsPasswordValid(false) }}
                                            value={password}
                                            // required
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center justify-between">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-white">
                                        Confirm Password:
                                    </label>
                                    {/* {validationErrors?.confirmPassword && (<p style={{ color: 'red', marginLeft: '5px' }}>{validationErrors.confirmPassword.message}</p>)} */}
                                    {(password != confirmPassword) && (<p style={{ color: 'red', marginLeft: '5px' }}>Passwords must match</p>)}
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        onChange={(event) =>{setConfirmPassword(event.target.value);
                                            (password === event.target.value) ? setIsPasswordValid(true) : setIsPasswordValid(false) }}
                                            value={confirmPassword}
                                            // required
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                </div>
                            </div>

                            <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                                        disabled:bg-gray-500"
                                        disabled={!isPasswordValid}
                                        >
                                        Register
                                    </button>
                            </div>
                        </form>

                        <p className="mt-10 text-sm text-center text-gray-200">
                            Already a member?{' '}
                            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Login
                            </Link>
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register