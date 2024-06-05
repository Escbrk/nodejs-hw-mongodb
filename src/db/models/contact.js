import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    email: { type: String, require: false },
    isFavourite: { type: Boolean, require: false, default: false },
    contactType: {
      type: String,
      require: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  { timestamps: true },
);

export const Contact = model('contacts', contactSchema);
