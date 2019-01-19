import { Document, Model, model, Schema } from "mongoose";

export interface ContactRequest {
  firstName: string;
  lastName: string;
  username: string,
  email: string;
  address?: string;
}

export interface ContactCriteria {
  page?: number;
  size?: number;
  firstname?: string;
  lastname?: string;
}

export interface Contact {
  uid: string,
  firstName: string;
  lastName: string;
  username: string,
  email: string;
  address: string;
}

export interface ContactModel extends Contact, Document {}

export const ContactSchema: Schema = new Schema({
  uid: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, require: true },
  address: { type: String, require: false},
});

export const Contact: Model<ContactModel> = model<ContactModel>("Contact", ContactSchema);
