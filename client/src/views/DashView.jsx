import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { useCookies } from 'react-cookie'


const Dash = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user_id = cookies.user_id
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const onClickHandler = (e) => {
        removeCookie(['user_id'])
        navigate('/')
    }

    return (
        <>
            <div className="absolute w-full bg-black">
                <ul className="flex justify-between border-b">
                    <div className="flex">
                        <li className="mr-1 -mb-px">
                            <Link to="/cac" className="inline-block px-4 py-2 font-semibold text-indigo-700 bg-black rounded-t focus:border-l focus:border-t focus:border-r hover:text-blue-800 hover:animate-pulse">Create Character</Link>
                        </li>
                        <li className="mr-1">
                            <Link to="/sac" className="inline-block px-4 py-2 font-semibold text-indigo-400 bg-black focus:border-l focus:border-t focus:border-r hover:text-blue-800 hover:animate-pulse" href="#">My Characters</Link>
                        </li>
                        <li className="mr-1">
                            <Link to="cag" className="inline-block px-4 py-2 font-semibold bg-black focus:border-l focus:border-t focus:border-r text-violet-400 hover:text-blue-800 hover:animate-pulse" href="#">Create Campaign</Link>
                        </li>
                        <li className="mr-1">
                            <Link to="vac" className="inline-block px-4 py-2 font-semibold bg-black focus:border-l focus:border-t focus:border-r text-violet-500 hover:text-blue-800 hover:animate-pulse" href="#">Find Campaign</Link>
                        </li>
                    </div>
                    <li className="mr-1">
                        <button onClick={e => { onClickHandler(e) }} className="inline-block px-4 py-2 font-semibold text-blue-600 bg-black focus:border-l focus:border-t focus:border-r dark:text-blue-500 hover:underline hover:animate-pulse"> Logout</button>
                    </li>
                </ul>
            </div>
            <div className="max-w-full px-20 py-10 overflow-hidden bg-no-repeat bg-cover rounded" style={{
                backgroundPosition: '100%',
                backgroundImage: 'url("https://cdn.shopify.com/s/files/1/0059/3061/4851/products/B9A0964.jpg?v=1653900526&width=1445")',
                height: '100vh',
                width: 'auto'
            }}>
                <div className="p-12 mt-10 overflow-y-auto bg-black rounded-lg bg-opacity-80" style={{ height: "85vh" }}>
                    <Outlet />
                </div>

            </div>
        </>
    )
}
export default Dash;