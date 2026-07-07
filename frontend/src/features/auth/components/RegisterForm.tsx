import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { registerSchema, type IRegisterCredentials } from '../auth.validation';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { registerUser } from '../authSlice';

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, loading } = useAppSelector((state) => state.auth);

  const initialValues: IRegisterCredentials = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (
    values: IRegisterCredentials,
    { setSubmitting, resetForm }: FormikHelpers<IRegisterCredentials>,
  ) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      resetForm();
      navigate('/');
    } catch {
      // Error is already handling by Redux slice
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <label className="ml-xs text-label-sm text-on-surface-variant" htmlFor="name">
              Name
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-md text-on-surface-variant">
                person
              </span>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className={`h-14 w-full rounded-xl border bg-white/60 pr-md pl-12 text-body-md text-primary shadow-sm transition-all outline-none placeholder:text-on-surface-variant/50 focus:bg-white/80 ${
                  errors.name && touched.name
                    ? 'border-error focus:border-error'
                    : 'border-white/80 focus:border-primary'
                }`}
              />
            </div>
            <ErrorMessage name="name" component="p" className="ml-xs text-label-sm text-error" />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="ml-xs text-label-sm text-on-surface-variant" htmlFor="email">
              Email
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-md text-on-surface-variant">
                mail
              </span>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                className={`h-14 w-full rounded-xl border bg-white/60 pr-md pl-12 text-body-md text-primary shadow-sm transition-all outline-none placeholder:text-on-surface-variant/50 focus:bg-white/80 ${
                  errors.email && touched.email
                    ? 'border-error focus:border-error'
                    : 'border-white/80 focus:border-primary'
                }`}
              />
            </div>
            <ErrorMessage name="email" component="p" className="ml-xs text-label-sm text-error" />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="ml-xs text-label-sm text-on-surface-variant" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-md text-on-surface-variant">
                lock
              </span>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className={`h-14 w-full rounded-xl border bg-white/60 pr-md pl-12 text-body-md text-primary shadow-sm transition-all outline-none placeholder:text-on-surface-variant/50 focus:bg-white/80 ${
                  errors.password && touched.password
                    ? 'border-error focus:border-error'
                    : 'border-white/80 focus:border-primary'
                }`}
              />
            </div>
            <ErrorMessage
              name="password"
              component="p"
              className="ml-xs text-label-sm text-error"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label
              className="ml-xs text-label-sm text-on-surface-variant"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-md text-on-surface-variant">
                lock
              </span>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={`h-14 w-full rounded-xl border bg-white/60 pr-md pl-12 text-body-md text-primary shadow-sm transition-all outline-none placeholder:text-on-surface-variant/50 focus:bg-white/80 ${
                  errors.confirmPassword && touched.confirmPassword
                    ? 'border-error focus:border-error'
                    : 'border-white/80 focus:border-primary'
                }`}
              />
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="p"
              className="ml-xs text-label-sm text-error"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-error-container p-sm text-center text-label-sm text-on-error-container">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="flex h-14 w-full items-center justify-center rounded-xl bg-primary text-title-sm text-on-primary transition-transform hover:bg-inverse-surface active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </Form>
      )}
    </Formik>
  );
};
