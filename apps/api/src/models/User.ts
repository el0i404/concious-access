import { Schema, model, Document } from 'mongoose';

interface User extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  organization: string;
  registrationEmailCode: string;
  forgotPasswordEmailCode: string;
  isVerified: boolean;
  token: string;
}

const userSchema = new Schema<User>(
  {
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    organization: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'pass_creator',
    },
    password: {
      type: String,
      required: false,
    },
    registrationEmailCode: {
      type: String,
      required: false,
    },
    forgotPasswordEmailCode: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: false,
    },
    token: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<User>('User', userSchema);

export default User;
