const Dash = (props) => {
    return (
        <>
            <div className="bg-black">
                <ul className="flex border-b">
                    <li className="-mb-px mr-1">
                        <a className="bg-black inline-block focus:border-l focus:border-t focus:border-r hover:text-blue-800 rounded-t py-2 px-4 text-indigo-700 font-semibold" href="cac">Create Character</a>
                    </li>
                    <li className="mr-1">
                        <a className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 text-indigo-400 hover:text-blue-800 font-semibold" href="#">View Characters</a>
                    </li>
                    <li className="mr-1">
                        <a className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 text-violet-400 hover:text-blue-800 font-semibold" href="#">Create Group</a>
                    </li>
                    <li className="mr-1">
                        <a className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 text-violet-500 hover:text-blue-800 font-semibold" href="#">Find Group</a>
                    </li>
                    <li className="mr-1">
                        <a className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 font-semibold text-blue-600 dark:text-blue-500 hover:underline"> Logout</a>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Dash;