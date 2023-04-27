import { useState } from 'react'

const StatSelect = (props) => {
    const { attribute, newStat, stat, attributePoints } = props
    const [count, setCount] = useState(stat)

    const attributePointCostIncrease = {
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
        14: 2,
        15: 2
    }

    const handleClick = (change) => {
        let newCount = count + change
        if (newCount >= 8 && newCount <= 15) {
            if (change === 1) {
                if (attributePoints - attributePointCostIncrease[newCount] >= 0) {
                    setCount(newCount)
                    return newStat(attribute, newCount)
                }
            }
            else if (change === -1) {
                setCount(newCount)
                return newStat(attribute, newCount)
            }
        }
    }

    return (
        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={attribute}>
                    {attribute}:
                </label>
            </div>
            <div className="md:w-2/3 relative flex justify-center">
                {/* <input id={attribute} name={attribute} type="number" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" min={8} max={15} defaultValue={8} onChange={ (event) => onChangeHandle(event.target.value) } /> */}
                <div className='absolute left-1 flex items-center'>
                    <p className='text-xs'>{(count >= 14) ? "(+2 pts)" : count === 8 ? "" : "(+1 pts)"}</p>
                    {count !== 8 && <button className="w-7 bg-gray-200 appearance-none border-2 border-gray-300 rounded px-1 ml-2 hover:bg-gray-100" type="button" onClick={(e) => { handleClick(-1) }}>-</button>}
                </div>
                <p className="inline font-bold text-lg">{count}</p>
                <div className='absolute right-1 flex items-center'>
                    {count !== 15 && <button className="w-7 bg-gray-200 appearance-none border-2 border-gray-300 rounded  px-1 mr-2 hover:bg-gray-100" type="button" onClick={(e) => { handleClick(1) }}> +</button>}
                    <p className='text-xs'>{(count >= 13) ? count === 15 ? "" : "(-2 pts)" : "(-1 pts)"}</p>
                </div>
            </div>
        </div>
    )
}

export default StatSelect