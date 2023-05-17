import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useContacts } from '../context/ContactsProvider';
import { useConversations } from '../context/ConversationsProvider';

const NewConversationModal = ({ showDialogModal, closeDialogModal }) => {
    const [selectedContactsId, setSelectedContactsId] = useState([]);

    const { contacts } = useContacts();
    const { createConversations } = useConversations();

    function handleSubmit(e) {
        e.preventDefault();
        createConversations(selectedContactsId)
        closeDialogModal(false);
    }

    function handleBoxChange(contactId) {
        // console.log("Contact Id ", contactId)
        setSelectedContactsId((prevSelectedContactId) => {

            if (prevSelectedContactId?.includes(contactId)) {
                return prevSelectedContactId.filter(prevId => (contactId !== prevId))
            } else {
                return [...prevSelectedContactId, contactId]
            }
        })

    }


    return (
        <Transition
            show={showDialogModal}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as='div'
        >
            <Dialog open={showDialogModal} onClose={() => closeDialogModal(false)} className="relative z-50">
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-[600px]  bg-white rounded-md">
                        <Dialog.Title className="border-b-[1px] py-2 pl-8 pr-4 tracking-normal flex justify-between items-center">
                            <div className='font-medium'>Create Conversation </div>
                            <div className='cursor-pointer text-[20px]' onClick={() => closeDialogModal(false)}>x</div>
                        </Dialog.Title>
                        <div className='pl-4  py-5'>
                            <form className='space-y-4 pl-5' onSubmit={handleSubmit}>
                                {
                                    contacts.map((contact) => {
                                        return <div key={contact.id} className='flex  items-center space-x-3'>
                                            <input onChange={() => handleBoxChange(contact.id)} className='border-[1px] block border-[#c7c7c7] outline-none  rounded-md cursor-pointer' type="checkbox" />
                                            <label className="block" htmlFor="">{contact.id}</label>
                                        </div>
                                    })
                                }
                                <div className=' py-2 space-x-4 my-4'>
                                    <button type="submit" className='bg-blue-500 text-[#fff] px-[10px] py-[5px] rounded-md hover:bg-[#e6e6e6] hover:text-black transition delay-75'>Create</button>
                                    <button onClick={() => closeDialogModal(false)}>Cancel</button>

                                </div>
                            </form>
                        </div>

                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    )
}


export default NewConversationModal