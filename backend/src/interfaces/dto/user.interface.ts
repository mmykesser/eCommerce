export interface IUpdateUserData {
  name?: string;
  email?: string;
  role: 'admin' | 'user';
}
