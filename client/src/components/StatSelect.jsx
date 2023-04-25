import { useState } from 'react'

const StatSelect = (props) => {
    const [count, setCount] = useState(8)
    const { stat, newStat } = props

    const onChangeHandle = (newValue) => {
        setCount(newValue)
        const oneStat = {} 
        oneStat[props.stat] = newValue
        newStat(oneStat)
        console.log(oneStat[stat]);
        console.log(stat);
    }
    return (
        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" HTMLFor={stat}>
                    {stat}:
                </label>
            </div>
            <div className="md:w-2/3">
                <input id={stat} name={stat} type="number" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" min={8} max={15} defaultValue={8} onChange={ (event) => onChangeHandle(event.target.value) } />
            </div>
        </div>
    )
}

export default StatSelect