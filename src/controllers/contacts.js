import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  upsertContact,
} from '../services/contacts.js';
import { parseFilters } from '../utils/filter.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = req.query;
  const filter = parseFilters(req.query);

  try {
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
      userId: req.user._id,
      role: req.user.role,
    });
    if (!contacts) {
      return res.status(404).json({
        status: 404,
        message: 'Not Found!',
      });
    }

    return res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user.id, req.user.role);

  res.json({
    status: 200,
    message: `Succesfully got a contact with ID: ${contactId}`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { body, file } = req;
  const contact = await createContact(req.user._id, { ...body, photo: file }); //! why not req.user.id ?????

  res.status(201).json({
    status: 201,
    message: 'Succesfully created a contact',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { body, file } = req;
  const { contactId } = req.params;
  const { contact } = await upsertContact(contactId, { ...body, photo: file });

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact`,
    data: contact,
  });
};

export const putContactController = async (req, res) => {
  const { body, file } = req;
  const { contactId } = req.params;
  const { contact, isNew } = await upsertContact(
    contactId,
    { ...body, photo: file },
    {
      upsert: true,
    },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact`,
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  await deleteContactById(contactId, req.user._id, req.user.role);

  res.status(204).send();
};
