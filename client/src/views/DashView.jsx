import {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider';
import { useCookies } from 'react-cookie'

const Dash = (props) => {
    const { user } = useContext(AuthContext)
    console.log(user)

    return (
        <>
            <div className="bg-black">
                <ul className="flex border-b">
                    <li className="-mb-px mr-1">
                        <Link to="/cac" className="bg-black inline-block focus:border-l focus:border-t focus:border-r hover:text-blue-800 rounded-t py-2 px-4 text-indigo-700 font-semibold">Create Character</Link>
                    </li>
                    <li className="mr-1">
                        <Link className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 text-indigo-400 hover:text-blue-800 font-semibold" href="#">View Characters</Link>
                    </li>
                    <li className="mr-1">
                        <Link className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 text-violet-400 hover:text-blue-800 font-semibold" href="#">Create Group</Link>
                    </li>
                    <li className="mr-1">
                        <Link className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 text-violet-500 hover:text-blue-800 font-semibold" href="#">Find Group</Link>
                    </li>
                    <li className="mr-1">
                        <Link className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 font-semibold text-blue-600 dark:text-blue-500 hover:underline"> Logout</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Dash;