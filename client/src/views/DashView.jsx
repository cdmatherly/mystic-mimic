const Dash = (props) => {
    return (
        <>
            <ul class="flex border-b">
                <li class="-mb-px mr-1">
                    <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-indigo-700 font-semibold" href="#">Create Character</a>
                </li>
                <li class="mr-1">
                    <a class="bg-white inline-block py-2 px-4 text-indigo-400 hover:text-blue-800 font-semibold" href="#">View Characters</a>
                </li>
                <li class="mr-1">
                    <a class="bg-white inline-block py-2 px-4 text-violet-400 hover:text-blue-800 font-semibold" href="#">Create Group</a>
                </li>
                <li class="mr-1">
                    <a class="bg-white inline-block py-2 px-4 text-violet-500 font-semibold" href="#">Find Group</a>
                </li>
                <li class="mr-1">
                    <a className="bg-white inline-block py-2 px-4 font-semibold text-blue-600 dark:text-blue-500 hover:underline">Logout</a>
                </li>
            </ul>
        </>
    )
}
export default Dash;