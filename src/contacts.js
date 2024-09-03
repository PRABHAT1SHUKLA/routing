import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getContacts(query) {
    await fakeNetwork(`getContacts:${query}`);
    let contacts = await localforage.getItem("contacts");
    if(!contacts) contacts =[];
    if(query) {
        contacts: matchSorter(contacts, query , {keys : ["first" , "last"]});
    }

    return contacts.sort(sortBy("last" , createdAt))
    
}

export async function CreateContact(){

    await fakeNetwork();
    let id = Math.random().toString(36).substring(2,9);
    let contact = { id , createdAt: Date.now()};

    let contacts = await getContacts();

    contacts.unshift(contact);

    await set(contacts);

    return contact;

}



export async function getContact(id){
     await fakeNetwork(`contact:${id}`);
 
      let contacts = await localforage.getItem("contacts");

      let contact= contacts.find(contact => contact.id === id);

      return contact ?? null

}


export async function updateContact(id,updates){
  await fakeNetwork()

  let contacts= await localforage.getItem("contacts");

  let contact = contacts.find(contact => contact.id === id);

  if(!contact) throw new Error("No contact found for id " , id)

  let newContact = contacts.map(contact => contact.id === id ? {...contaccts, ...updates} : contact)
  
  await set(newContact);

  return contact;


}

export async function deleteContact(id){
    let contacts = await localforage.getItem("contacts");

    let contact =  contacts.find(contact => contact.id === id );

    if(!contact) throw new Error("n such item with given id exists", id);

    let newContact = contacts.filter(function(contact){
        return  contact.id != id;

    })

    await set(newContact)
  
    return contact;

}

function set(contacts) {
    return localforage.setItem("contacts", contacts);
  }

//fake cache

let fakeCache = {};

async function fakeNetwork(key){
    if(!key){

        fakeCache={};
    }

    if (fakeCache[key]){
        return
    }

    fakeCache[key] = true;

    return new Promise(res => {
        setTimeout(res, Math.random()*800)
    })
}





