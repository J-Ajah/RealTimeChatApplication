import React, { useState } from 'react'
import { Tab, Dialog } from '@headlessui/react'
import Conversation from './Conversation';
import Contact from './Contact';
import ContactModal from './ContactModal';
import NewConversationModal from './NewConversationModal';


const CONVERSATION_KEY = "Conversation"; // 0
const CONTACT_KEY = "Contacts"; // 1
const Sidebar = ({ id }) => {
    const [indexSelected, setIndexSelected] = useState(0);
    const [showDialogModal, setShowDialogModal] = useState(false)


    const conversationOpen = indexSelected === 0 ? CONVERSATION_KEY : CONTACT_KEY

    return (
        <div className='w-[250px] flex flex-col h-[100vh] flex-[2] '>
            <Tab.Group className="border-r-[1px] h-full" as="div" selectedIndex={indexSelected}>
                <Tab.List className="border-b-[1px] flex ">
                    <Tab as="fragment" className="outline-none w-full">
                        {({ selected }) => (
                            /* Use the `selected` state to conditionally style the selected tab. */
                            <button
                                className={`
                                    ${selected ? 'bg-blue-500 text-white ' : 'bg-white text-black '} 
                                !h-full px-2 py-2  !outline-none w-full`}
                                onClick={() => { setIndexSelected(0) }}
                            >
                                {CONVERSATION_KEY}
                            </button>
                        )}
                    </Tab>
                    <Tab data-headlessui-state="selected" as="fragment" className="outline-none w-full">
                        {({ selected }) => (
                            /* Use the `selected` state to conditionally style the selected tab. */
                            <button
                                className={`
                                    ${selected ? 'bg-blue-500 text-white ' : 'bg-white text-black '} 
                                !h-full px-2 !outline-none w-full`}
                                onClick={() => { setIndexSelected(1) }}
                            >
                                {CONTACT_KEY}
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel><Conversation /></Tab.Panel>
                    <Tab.Panel><Contact /></Tab.Panel>
                </Tab.Panels>

            </Tab.Group>
            <div className='bottom-info border-t-[1px] border-r-[1px]'>
                <div>
                    <span className='font-[600]'> Your Id:</span> <span>{id}</span>
                </div>
                <button className='block w-full bg-blue-500 text-[white] py-4'
                    onClick={() => setShowDialogModal(true)}>{`${conversationOpen === CONVERSATION_KEY ? 'New ' + conversationOpen : conversationOpen}`}</button>
            </div>
            {
                showDialogModal && conversationOpen === CONVERSATION_KEY ? <NewConversationModal showDialogModal={showDialogModal} closeDialogModal={setShowDialogModal} /> : <ContactModal showDialogModal={showDialogModal} closeDialogModal={setShowDialogModal} />
            }

        </div>
    )
}

export default Sidebar