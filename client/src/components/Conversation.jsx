import React from 'react'
import { useConversations } from '../context/ConversationsProvider';

const Conversation = () => {
    const { conversations, selectedConversationIndex, } = useConversations();

    return (

        <div>
            {
                conversations?.map((conversation, index) => {
                    return <div key={index} className='py-2 hover:bg-[#babbbbe8] cursor-pointer pl-2' onClick={() => selectedConversationIndex(index)}>{conversation?.recipients.map(r => r.name).join(", ")}</div>
                })
            }
        </div>
    )
}

export default Conversation