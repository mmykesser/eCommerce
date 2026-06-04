import { LoginForm } from '../features/auth/components/LoginForm';
import { AuthLayout } from '../layouts/AuthLayout';

export const LoginPage = () => {
  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back! Please sign in to continue"
      footerText="Don't have an account?"
      footerLinkText="Create yours now"
      footerLinkHref="#"
    >
      <LoginForm />
    </AuthLayout>
  );
};
