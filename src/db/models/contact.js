import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false },
    isFavourite: { type: Boolean, required: false, default: false },
    contactType: {
      type: String,
      required: false,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  { timestamps: true },
);

export const Contact = model('contacts', contactSchema);
