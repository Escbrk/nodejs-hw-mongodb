import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false, default: null },
    isFavourite: { type: Boolean, required: false, default: false },
    contactType: {
      type: String,
      required: false,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  { timestamps: true, versionKey: false },
);

export const Contact = model('contacts', contactSchema);
