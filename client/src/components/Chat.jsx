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
        <div className=' h-96 w-72'>
            <div className="relative cursor-pointer header h-11 bg-slate-200">Live Chat</div>
            <div className="relative border border-black border-solid body h-52 bg-slate-400">
                {messageList.map((messageContent) =>
                    <div key={messageContent.message} className='flex h-auto p-2 message' id={user.username === messageContent.author ? "you" : "other" }>
                        <div className='flex items-center justify-end w-auto h-auto px-1 mx-1 bg-blue-300 rounded message-content max-w-max'>
                            <p>{messageContent.message}</p>
                        </div>
                        <div className='flex message-meta'>
                            <p>{messageContent.time}</p>
                            <p className='ml-2 font-semibold'>{messageContent.author}</p>
                        </div>
                    </div>)}
            </div>
            <div className="flex h-10 border border-t-0 border-black footer">
                <input className='h-full py-1 ' type="text" placeholder="Send a message" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat