import * as Yup from 'yup';

export interface ILoginCredentials {
  email: string;
  password: string;
}

export const loginSchema = Yup.object({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});
