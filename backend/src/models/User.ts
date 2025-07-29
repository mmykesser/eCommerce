import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserDocument } from '../interfaces/models/user.interface';

const userSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    refreshToken: { type: String },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const user = this as IUserDocument;

  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error instanceof Error ? error : new Error(String(error)));
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
