import createHttpError from 'http-errors';
import { Contact } from '../db/models/contact.js';
import { ROLES } from '../constants/constants.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const user = req.user;
    const { contactId } = req.params;

    if (roles.includes(ROLES.ADMIN) && user.role === ROLES.ADMIN) return next();

    if (roles.includes(ROLES.USER) && user.role === ROLES.USER) {
      const contact = await Contact.findOne({
        _id: contactId,
        userId: user._id,
      });

      if (!contact) return next(createHttpError(403, 'Access error'));
    }

    return next();
  };
