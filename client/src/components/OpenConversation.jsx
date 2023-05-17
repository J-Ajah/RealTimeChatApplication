import React, { useCallback, useState } from 'react'
import { useConversations } from '../context/ConversationsProvider';

const OpenConversation = () => {
    const [text, setText] = useState("");
    const { sendMessage, selectedConversation } = useConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const lastMessageRef = useCallback((node) => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    },[])


    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(selectedConversation.recipients.map(r => r.id), text)

        setText("")
    }
    return (
        <div className='relative w-full h-full  flex-[10] flex-row items-center justify-between'>
            <div className='flex  h-full flex-grow-1 justify-items-end  w-full'>
                <div className={`flex-col h-[85%] flex overflow-auto items-end justify-items-end px-3 w-full`}>
                    {
                        selectedConversation.messages?.map((message, index) => {
                            const lastMessage = selectedConversation.messages.length - 1 === index
                            return (
                                <div ref={lastMessage ? lastMessageRef : null} key={index} className={`my-1 flex flex-col w-fit max-w-[400px]  ${message.fromMe ? 'place-self-end' : 'place-self-start'} `}>
                                    <div
                                        className={`rounded px-2 py-1 ${message.fromMe ? 'bg-blue-500 text-white' : 'border-[1px]'}`}
                                    >
                                        {message.text}
                                    </div>
                                    <div className={`text-[#c8c8c8] small ${message.fromMe ? 'text-right' : ''}`}>
                                        {message.fromMe ? 'You' : message.senderName}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="absolute bottom-0 w-full">
                <form className='flex flex-col w-full'>
                    <div className='flex flex-row w-full'>
                        <textarea className="w-[100%] h-[90px] p-[10px] border-[1px] outline-none" value={text} placeholder='Say something...' required
                            onChange={(e) => setText(e.target.value)}></textarea>
                        <button className='bg-blue-500 rounded-md rounded-l-none px-6 text-white font-[400]' type='submit' onClick={handleSubmit}>Send</button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default React.memo(OpenConversation)