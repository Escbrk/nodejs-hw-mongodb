import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  upsertContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();
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
  const contact = await getContactById(contactId);

  res.json({
    status: 200,
    message: `Succesfully got a contact with ID: ${contactId}`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { body } = req;
  const contact = await createContact(body);

  res.status(201).json({
    status: 201,
    message: 'Succesfully created a contact',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const { contact } = await upsertContact(contactId, body);

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact`,
    data: contact,
  });
};

export const putContactController = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const { contact, isNew } = await upsertContact(contactId, body, {
    upsert: true,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact`,
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  await deleteContactById(contactId);

  res.status(204).send();
};
