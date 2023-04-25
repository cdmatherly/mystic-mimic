
const StatSelect = (props) => {
    const { stat } = props
    return (
        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" HTMLFor={stat}>
                    {stat}:
                </label>
            </div>
            <div className="md:w-2/3">
                <input id={stat} name={stat} type="number" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
            </div>
        </div>
    )
}

export default StatSelect