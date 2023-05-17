import React from 'react'
import Sidebar from './Sidebar'
import { useConversations } from '../context/ConversationsProvider'
import OpenConversation from './OpenConversation';

const Dashboard = ({ id }) => {
    const { selectedConversation } = useConversations();

    return (
        <div className='flex h-[100vh] w-full '>
            <Sidebar id={id} />
            {
                selectedConversation && <OpenConversation /> 
        }
        </div>
    )
}

export default Dashboard