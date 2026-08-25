import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import { loginSchema, type LoginFormFields } from '../validation/login';
import { Button } from '../../../components/ui/button/button';
import { useLogin } from '../api/authQueries';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

type LoginFormProps = {
  onSuccessRedirect: string;
};

const LoginForm = ({ onSuccessRedirect }: LoginFormProps) => {
  const loginMutation = useLogin();
  const formId = useId();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmitLoginForm: SubmitHandler<LoginFormFields> = (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    loginMutation.mutate(payload, {
      onSuccess: () => {
        navigate(onSuccessRedirect);
      },
      onError: (error: unknown) => {
        setError('root', {
          type: 'server',
          message: (error as Error).message || 'Failed to log in ',
        });
      },
    });
  };

  const errId = (name: string) => `${formId}-${name}-error`;

  return (
    <form
      onSubmit={handleSubmit(onSubmitLoginForm)}
      noValidate
      className="flex flex-col gap-4"
    >
      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email">
          Email
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
          <span className="sr-only">(required)</span>
        </FieldLabel>

        <Input
          {...register('email')}
          id="email"
          required
          invalid={!!errors.email}
          aria-describedby={errors.email ? errId('email') : undefined}
          placeholder="test@email.com"
        />

        {errors.email && (
          <FieldError id={errId('salary')} errors={[errors.email]} />
        )}
      </Field>

      <Field data-invalid={!!errors.password}>
        <FieldLabel htmlFor="password">
          Password
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
          <span className="sr-only">(required)</span>
        </FieldLabel>

        <Input
          {...register('password')}
          id="password"
          required
          invalid={!!errors.password}
          aria-describedby={errors.password ? errId('password') : undefined}
          placeholder="8 charachters"
        />

        {errors.password && (
          <FieldError id={errId('password')} errors={[errors.password]} />
        )}
      </Field>

      <Button
        disabled={isSubmitting}
        className="w-full justify-center"
        type="submit"
      >
        Login
      </Button>
      {errors.root && (
        <p className="text-destructive text-center" role="alert">
          {errors.root.message}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
