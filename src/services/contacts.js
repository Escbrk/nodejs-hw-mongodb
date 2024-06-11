import createHttpError from 'http-errors';
import { Contact } from '../db/models/contact.js';

export const getAllContacts = async () => await Contact.find().lean();
export const getContactById = async (id) => {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
};
export const createContact = async (payload) => await Contact.create(payload);

export const upsertContact = async (id, payload, options = {}) => {
  const rawResults = await Contact.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResults || !rawResults.value) {
    throw createHttpError(404, 'Contact not found');
  }

  return {
    contact: rawResults.value,
    isNew: !rawResults?.lastErrorObject?.updatedExisting,
  };
};

export const deleteContactById = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw createHttpError(404, 'Contact you want to delete - not found');
  }
};
