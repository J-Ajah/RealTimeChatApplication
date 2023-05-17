import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ContactsContext = React.createContext();

export const useContacts = () => {
  return useContext(ContactsContext);
};

export function ContactsProvider ({ children }){
  const [contacts, setContact] = useLocalStorage("contacts", []);

  function createContact (id, name) {
    setContact((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  };
  return (
    <ContactsContext.Provider
      value={{
        contacts,
        createContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
