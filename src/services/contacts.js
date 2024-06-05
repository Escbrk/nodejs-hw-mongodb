import { Contact } from '../db/models/Contact.js';

export const getAllContacts = async () => await Contact.find();
export const getContactById = async (id) => await Contact.findById(id);
