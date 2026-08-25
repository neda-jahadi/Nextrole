import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import {
  registerUserSchema,
  type RegisterUserFormFields,
} from '../validation/registerUser';
import Input from '../../../components/ui/Input';
import { useRegister } from '../api/authQueries';
import { useNavigate } from 'react-router';
import { Button } from '../../../components/ui/button/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

type RegisterFormProps = {
  onSuccessRedirect: string;
};

const RegisterForm = ({ onSuccessRedirect }: RegisterFormProps) => {
  const registerMutation = useRegister();
  const formId = useId();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserFormFields>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const navigate = useNavigate();

  const onSubmitRegisterForm: SubmitHandler<RegisterUserFormFields> = (
    data,
  ) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    registerMutation.mutate(payload, {
      onSuccess: () => {
        navigate(onSuccessRedirect);
      },
      onError: (error: unknown) => {
        setError('root', {
          type: 'server',
          message: (error as Error).message || 'Failed to Signup ',
        });
      },
    });
  };

  const errId = (name: string) => `${formId}-${name}-error`;

  return (
    <form
      onSubmit={handleSubmit(onSubmitRegisterForm)}
      noValidate
      className="flex flex-col gap-4"
    >
      <Field data-invalid={!!errors.name}>
        <FieldLabel htmlFor="name">
          Name
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
          <span className="sr-only">(required)</span>
        </FieldLabel>
        <Input
          {...register('name')}
          id="name"
          required
          invalid={!!errors.name}
          aria-describedby={errors.name ? errId('name') : undefined}
          placeholder="Your Name"
        />
        {errors.name && (
          <FieldError id={errId('name')} errors={[errors.name]} />
        )}
      </Field>

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
          placeholder="test@gmail.com"
        />
        {errors.email && (
          <FieldError id={errId('email')} errors={[errors.email]} />
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

      <Field data-invalid={!!errors.confirm_password}>
        <FieldLabel htmlFor="confirm_password">
          Confirm Password
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
          <span className="sr-only">(required)</span>
        </FieldLabel>
        <Input
          {...register('confirm_password')}
          id="confirm_password"
          required
          invalid={!!errors.confirm_password}
          aria-describedby={
            errors.confirm_password ? errId('confirm_password') : undefined
          }
          placeholder="8 charachters"
        />
        {errors.confirm_password && (
          <FieldError
            id={errId('confirm_password')}
            errors={[errors.confirm_password]}
          />
        )}
      </Field>
      <Button
        disabled={isSubmitting}
        className="w-full justify-center"
        type="submit"
      >
        Register
      </Button>
      {errors.root && (
        <p role="alert" className="text-destructive">
          {errors.root?.message ?? ''}
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
