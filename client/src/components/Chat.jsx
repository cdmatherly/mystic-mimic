import { useState, useEffect } from 'react'

const Chat = (props) => {
    const { socket, user } = props
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                author: user.username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
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
            <div className="header h-11 bg-slate-200 relative cursor-pointer">Live Chat</div>
            <div className="body h-52 bg-slate-400 border border-solid border-black relative">
                {messageList.map((messageContent) =>
                    <div key={messageContent.message} className='message h-auto p-2 flex' id={user.username === messageContent.author ? "you" : "other" }>
                        <div className='message-content w-auto h-auto bg-blue-300 rounded mx-1 px-1 max-w-max flex items-center justify-end'>
                            <p>{messageContent.message}</p>
                        </div>
                        <div className='message-meta flex'>
                            <p>{messageContent.time}</p>
                            <p className='ml-2 font-semibold'>{messageContent.author}</p>
                        </div>
                    </div>)}
            </div>
            <div className="footer h-10 border border-black border-t-0 flex">
                <input className=' h-full py-1 ' type="text" placeholder="Send a message" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat