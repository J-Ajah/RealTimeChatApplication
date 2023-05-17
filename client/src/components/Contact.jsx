import React from 'react'
import { useContacts } from '../context/ContactsProvider'

const Contact = () => {
    const { contacts } = useContacts();

    return (

        <div>
            {
                contacts.map((contact) => {
                    return <div key={contact.id} className='py-2 hover:bg-[#babbbbe8] cursor-pointer pl-2'>{contact.name}</div>
                })
            }
        </div>
    )
}

export default Contact