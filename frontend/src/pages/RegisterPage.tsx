import { RegisterForm } from '../features/auth/components/RegisterForm';
import { AuthLayout } from '../layouts/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us today!"
      footerText="Already have an account?"
      footerLinkText="Sign In"
      footerLinkHref="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
};
