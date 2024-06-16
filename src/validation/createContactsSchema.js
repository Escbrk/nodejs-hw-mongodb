import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  phoneNumber: Joi.number().required().integer(),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
