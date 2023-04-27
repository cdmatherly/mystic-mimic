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
            {/* <div className=' h-96 w-72'>
                <div className="header h-11 bg-slate-200 relative cursor-pointer">Live Chat</div>
                <div className="body h-52 bg-slate-400 border border-solid border-black relative">
                    {messageList.map((messageContent) =>
                        <div key={messageContent.message} className='message h-auto p-2 flex' id={user.username === messageContent.author ? "you" : "other"}>
                            <div className='message-content w-auto h-auto bg-blue-600 text-white rounded mx-1 px-1 max-w-max flex items-center justify-end'>
                                <p>{messageContent.message}</p>
                            </div>
                            <div className='message-meta flex'>
                                <p>{messageContent.time}</p>
                                <p className='ml-2 font-semibold'>{messageContent.author}</p>
                            </div>
                        </div>)}
                </div>
                <div className="footer h-10 border border-black border-t-0 flex">
                    <input className=' h-full py-1 ' type="text" placeholder="Send a message" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
                    <button onClick={sendMessage}>&#9658;</button>
                </div>
            </div> */}

            <div class="justify-between flex flex-col h-80 w-80 bg-white rounded-lg">
                <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                    <div class="relative flex items-center space-x-4">
                        <div class="relative">
                            <span class="absolute text-green-500 right-0 bottom-0">
                                <svg width="20" height="20">
                                    <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                                </svg>
                            </span>
                        </div>
                        <div class="flex flex-col leading-tight">
                            <div class="text-2xl mt-1 flex items-center">
                                <span class="text-gray-700 mr-3">{user.username}</span>
                            </div>
                            <span class="text-lg text-gray-600">Welcome to your Live Chat!</span>
                        </div>
                    </div>
                </div>
                {/* Message Section */}
                <div id="messages" class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    <div class="chat-message">
                        <div class="flex items-end">
                            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Can be verified on any platform using docker</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-message">
                        <div class="flex items-end justify-end">
                            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Your error message says permission denied, npm global installs must be given root privileges.</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-message">
                    {messageList.map((messageContent) =>
                        <div key={messageContent.message} className='message h-auto p-2 flex-column' id={user.username === messageContent.author ? "you" : "other"}>
                            <div className='message-content w-auto h-auto bg-blue-600 text-white rounded mx-1 px-1 max-w-max flex items-center justify-end'>
                                <p>{messageContent.message}</p>
                            </div>
                            <div className='message-meta flex'>
                                <p>{messageContent.time}</p>
                                <p className='ml-2 font-semibold'> - {messageContent.author}</p>
                            </div>
                        </div>)}
                    </div>
                </div>

                {/* Button Section */}
                <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="relative flex">
                        <input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} type="text" placeholder="Send a message" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-10 bg-gray-200 rounded-md py-3"/>
                            <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
                                <button onClick={sendMessage} type="button" className="inline-flex items-center justify-center rounded-lg px-2 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                                    <span className="font-bold">Send</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
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