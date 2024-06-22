import createHttpError from 'http-errors';
import { Contact } from '../db/models/contact.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const user = req.user;
    const { contactId } = req.params;

    if (roles.includes('admin') && user.role === 'admin') return next();

    if (roles.includes('user') && user.role === 'user') {
      const contact = await Contact.findById({
        _id: contactId,
        parentId: user._id,
      });

      if (!contact) return next(createHttpError(403, 'Access error'));
    }
  };
