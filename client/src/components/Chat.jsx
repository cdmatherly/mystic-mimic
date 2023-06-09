import { useState, useEffect } from 'react'

const Chat = (props) => {
    const { socket, user, campaign, diceRoll, madeDiceRoll } = props
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const [isConnected, setIsConnected] = useState(false)

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                author: user.username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                campaign
            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMessage('')
        }
    }

    useEffect(() => {
        socket.off("receive_message").on("receive_message", (data) => {
            console.log(data)
            setMessageList((list) => [...list, data])
        })
        socket.on('confirm_join', (msg) => {
            setIsConnected(true)
        })
    }, [socket])

    useEffect(() => {

        if (diceRoll.roll && campaign) {
            let messageData = {
                author: user.username,
                message: `Rolled ${diceRoll.bonusObj.skill} ${diceRoll.roll} ${diceRoll.operator} ${diceRoll.bonusObj.bonus} = ${diceRoll.result}`,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                campaign,
                id: Math.random()
            }

            socket.emit("send_message", messageData)
        }

            if (diceRoll && campaign) {

                if (!diceRoll.bonusObj.skill){
                    diceRoll.bonusObj.skill = ''
                }

                setMessageList((list) => [...list, {author: user.username,
                message: `Rolled ${diceRoll.bonusObj.skill}: ${diceRoll.roll} ${diceRoll.operator} ${diceRoll.bonusObj.bonus} = ${diceRoll.result}`,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                campaign,
                id: Math.random()
            }]) 
        }


    }, [diceRoll])

    const reconnect = () => {
        setIsConnected(true)
    }


    return (
        <>
            <div className="flex flex-col justify-between bg-white rounded-lg w-80 h-full" style={{height: '75vh'}}>
                <div className="flex justify-between py-3 border-b-2 border-gray-200 sm:items-center">
                    <div className="relative flex items-center p-1 space-x-4">
                        <div className="relative">
                            <span className="absolute flex w-3 h-3">
                                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
                                {isConnected ?
                                    <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full"></span> :
                                    <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
                                }
                            </span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <div className="flex flex-col items-center mt-1 text-2xl">
                                <span className="mr-5 font-bold text-gray-700">{campaign ? campaign.name : "Not in any campaign!"}</span>
                            </div>
                            <span className="ml-1 text-lg text-gray-600">Welcome, {user.username}!</span>
                            {!isConnected && campaign && <button onClick={() => reconnect()} className=''> <p className='text-right -mr-5'>Connect</p></button>}
                        </div>
                    </div>
                </div>
                {/* Message Section */}
                <div id="messages" className="flex flex-col p-3 space-y-4 overflow-y-auto scrolling-touch scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2">
                    <div className="chat-message">
                        <div className="flex items-end">
                            <div className="flex flex-col items-start order-2 max-w-xs mx-2 space-y-2 text-xs">
                                <div><span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg rounded-bl-none">Welcome to the chat feature!</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-message">
                        <div className="flex items-end justify-end">
                            <div className="flex flex-col items-end order-1 max-w-xs mx-2 space-y-2 text-xs">
                                <div><span className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg rounded-br-none ">Start by typing in a message below.</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-message">
                        {messageList.map((messageContent) =>
                            <div key={messageContent.id} className='h-auto p-2 message flex-column' id={user.username === messageContent.author ? "you" : "other"}>
                                <div className='flex items-center justify-end w-auto h-auto px-4 py-2 text-xs text-white bg-blue-600 rounded-lg message-content max-w-max'>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className='flex message-meta'>
                                    <p>{messageContent.time}</p>
                                    <p className='ml-2 font-semibold'> - {messageContent.author}</p>
                                </div>
                            </div>)}
                    </div>
                </div>

                {/* Button Section */}
                <div className="px-4 pt-4 md:mb-3 border-t-2 border-gray-200 mb-0">
                    <div className="relative flex">
                        <input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} type="text" placeholder="Send a message" className="w-full py-3 pl-10 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md focus:outline-none focus:placeholder-gray-400" />
                        <div className="absolute inset-y-0 right-0 items-center hidden sm:flex">
                            <button onClick={sendMessage} type="button" disabled={!isConnected} className="inline-flex items-center justify-center px-2 py-3 text-white transition duration-500 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none disabled:bg-slate-300">
                                <span className="font-bold">Send</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 ml-2 transform rotate-90">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>        </>
    )
}

export default Chat