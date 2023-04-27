import { useState, useEffect } from 'react'

const Chat = (props) => {
    const { socket, user, campaign } = props
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

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
        socket.on("receive_message", (data) => {
            console.log(data)
            setMessageList((list) => [...list, data])
        })
    }, [socket])


    return (
        <>
            <div className="justify-between flex flex-col h-80 w-80 bg-white rounded-lg">
                <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                    <div className="relative flex items-center space-x-4 p-1">
                        <div className="relative">
                            <span className="absolute text-green-500 right-0 bottom-0 left-0.5">
                                <svg width="20" height="20">
                                    <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                                </svg>
                            </span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <div className="text-2xl mt-1 flex items-center">
                                <span className="text-gray-700 mr-3 ml-2">{user.username}</span>
                            </div>
                            <span className="text-lg text-gray-600 -ml-3">Welcome to your Live Chat!</span>
                        </div>
                    </div>
                </div>
                {/* Message Section */}
                <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    <div className="chat-message">
                        <div className="flex items-end">
                            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Welcome to the chat feature!</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-message">
                        <div className="flex items-end justify-end">
                            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Start by typing in a message below.</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-message">
                    {messageList.map((messageContent) =>
                        <div key={messageContent.message} className='message h-auto p-2 flex-column' id={user.username === messageContent.author ? "you" : "other"}>
                            <div className='message-content w-auto h-auto bg-blue-600 text-white rounded-lg px-4 py-2 max-w-max flex items-center justify-end text-xs'>
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
                        <input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} type="text" placeholder="Send a message" className="w-full py-3 pl-10 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md focus:outline-none focus:placeholder-gray-400"/>
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