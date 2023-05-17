import React, { useState, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useContacts } from '../context/ContactsProvider';

const ContactModal = ({ showDialogModal, closeDialogModal }) => {
    const idRef = useRef();
    const nameRef = useRef();
    const { createContact } = useContacts();


    function handleSubmit(e) {
        e.preventDefault();
        createContact(idRef.current.value, nameRef.current.value);
        closeDialogModal(false);
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
                            <div className='font-medium'>Create Contact </div>
                            <div className='cursor-pointer text-[20px]' onClick={() => closeDialogModal(false)}>x</div>
                        </Dialog.Title>
                        <div className='pl-4  py-5'>
                            <form className='space-y-4 pl-5' onSubmit={handleSubmit}>
                                <div className='space-y-2'>
                                    <label htmlFor="">Id</label>
                                    <input className='block border-[1px] pl-2 border-[#c7c7c7] outline-none py-[5px] rounded-md w-full max-w-[70%] ' type="text" required ref={idRef} />
                                </div>
                                <div className='space-y-2'>
                                    <label htmlFor="">Name</label>
                                    <input className='block border-[1px] pl-2 border-[#c7c7c7] outline-none py-[5px] rounded-md w-full max-w-[70%] ' type="text" required ref={nameRef} />
                                </div>
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

export default ContactModal