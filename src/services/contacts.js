import createHttpError from 'http-errors';
import { Contact } from '../db/models/contact.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
  userId,
  role,
}) => {
  const skip = perPage * (page - 1);

  const contactsFilter = Contact.find();

  if (filter.type) {
    contactsFilter.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsFilter.where('isFavourite').equals(filter.isFavourite);
  }

  if (role !== 'admin') {
    contactsFilter.where('parentId').equals(userId);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsFilter).lean().countDocuments(),
    Contact.find()
      .merge(contactsFilter)
      .lean()
      .skip(skip)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder.toLowerCase(),
      })
      .exec(),
  ]);

  const paginationInformation = createPaginationInformation(
    page,
    perPage,
    contactsCount,
  );

  return {
    contacts,
    ...paginationInformation,
  };
};

export const getContactById = async (id, userId, role) => {
  let contact;

  if (role !== 'admin') {
    contact = await Contact.findById(id).where('parentId').equals(userId);
  } else {
    contact = await Contact.findById(id);
  }

  if (!contact) {
    throw createHttpError(
      404,
      'You dont have access to this contact or it was not created',
    );
  }

  return contact;
};
export const createContact = async (payload, userId) =>
  await Contact.create({ ...payload, parentId: userId });

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
