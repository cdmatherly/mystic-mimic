import { useState, useEffect } from 'react'

const Chat = (props) => {
    const { socket, user, campaign } = props
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


    return (
        <>
            <div className="flex flex-col justify-between bg-white rounded-lg h-80 w-80">
                <div className="flex justify-between py-3 border-b-2 border-gray-200 sm:items-center">
                    <div className="relative flex items-center p-1 space-x-4">
                        <div className="relative">
                            <span className="absolute text-green-500 right-0 bottom-0 left-0.5">
                                <svg width="20" height="20">
                                    {isConnected ? <circle cx="8" cy="8" r="8" fill="currentcolor"></circle> :
                                        <circle cx="8" cy="8" r="8" fill="red"></circle>
                                    }
                                </svg>
                            </span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <div className="flex flex-col items-center mt-1 text-2xl">
                                <span className="ml-2 mr-3 text-gray-700">{campaign ? campaign.name : "Not in any campaign!"}</span>
                            </div>
                            <span className="-ml-3 text-lg text-gray-600">Welcome, {user.username}!</span>
                        </div>
                    </div>
                </div>
                {/* Message Section */}
                <div id="messages" className="flex flex-col p-3 space-y-4 overflow-y-auto scrolling-touch scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2">
                    <div className="chat-message">
                        <div className="flex items-end">
                            <div className="flex flex-col items-start order-2 max-w-xs mx-2 space-y-2 text-xs">
                                <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Welcome to the chat feature!</span></div>
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
                            <div key={messageContent.message} className='h-auto p-2 message flex-column' id={user.username === messageContent.author ? "you" : "other"}>
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
                <div className="px-4 pt-4 mb-2 border-t-2 border-gray-200 sm:mb-0">
                    <div className="relative flex">
                        <input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} type="text" placeholder="Send a message" className="w-full py-3 pl-10 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md focus:outline-none focus:placeholder-gray-400" />
                        <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
                            <button onClick={sendMessage} type="button" className="inline-flex items-center justify-center px-2 py-3 text-white transition duration-500 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none">
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