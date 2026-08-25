import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import {
  registerCompanySchema,
  type RegisterCompanyFormFields,
} from '../validation/registerCompany';
import Input from '../../../components/ui/Input';
import { useNavigate } from 'react-router';
import { useRegisterCompany } from '../api/companyQuery';
import type { MunicipalityApiResponse } from '@/features/locations/types/locationTypes';
import { Button } from '../../../components/ui/button/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Textarea from '@/components/ui/textarea';

type RegisterCompanyFormProps = {
  onSuccessRedirect: string;
  municipalities: MunicipalityApiResponse[];
};

const RegisterCompanyForm = ({
  onSuccessRedirect,
  municipalities,
}: RegisterCompanyFormProps) => {
  const registerMutation = useRegisterCompany();
  const formId = useId();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCompanyFormFields>({
    resolver: zodResolver(registerCompanySchema),
    defaultValues: {
      name: '',
      description: '',
      contactEmail: '',
      contactPhone: '',
      municipalityId: '',
    },
  });

  const navigate = useNavigate();

  const onSubmitRegisterForm: SubmitHandler<RegisterCompanyFormFields> = (
    data,
  ) => {
    const payload = {
      name: data.name,
      description: data.description,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      municipalityId: Number(data.municipalityId),
    };
    registerMutation.mutate(payload, {
      onSuccess: () => {
        navigate(onSuccessRedirect);
      },
      onError: (error: unknown) => {
        setError('root', {
          type: 'server',
          message: (error as Error).message || 'Failed to Register Company ',
        });
      },
    });
  };

  const errId = (name: string) => `${formId}-${name}-error`;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmitRegisterForm)}
      noValidate
    >
      <Field data-invalid={!!errors.name}>
        <FieldLabel htmlFor="contactEmail">
          Company Name
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
          placeholder="Company Name"
        />

        {errors.name && (
          <FieldError id={errId('name')} errors={[errors.name]} />
        )}
      </Field>

      <Field data-invalid={!!errors.description}>
        <FieldLabel htmlFor="description">
          Description
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
          <span className="sr-only">(required)</span>
        </FieldLabel>

        <Textarea
          {...register('description')}
          id="description"
          required
          invalid={!!errors.description}
          aria-describedby={
            errors.description ? errId('description') : undefined
          }
          rows={4}
          placeholder="Description of your company"
        />

        {errors.description && (
          <FieldError id={errId('description')} errors={[errors.description]} />
        )}
      </Field>

      <Field data-invalid={!!errors.contactEmail}>
        <FieldLabel htmlFor="contactEmail">
          Contact Email
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
          <span className="sr-only">(required)</span>
        </FieldLabel>

        <Input
          {...register('contactEmail')}
          id="contactEmail"
          required
          invalid={!!errors.contactEmail}
          aria-describedby={
            errors.contactEmail ? errId('contactEmail') : undefined
          }
          placeholder="company@email.com"
        />

        {errors.contactEmail && (
          <FieldError
            id={errId('contactEmail')}
            errors={[errors.contactEmail]}
          />
        )}
      </Field>

      <Field data-invalid={!!errors.contactPhone}>
        <FieldLabel htmlFor="contactPhone">
          Contact Phone
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
          <span className="sr-only">(required)</span>
        </FieldLabel>

        <Input
          {...register('contactPhone')}
          id="contactPhone"
          required
          invalid={!!errors.contactPhone}
          aria-describedby={
            errors.contactPhone ? errId('contactPhone') : undefined
          }
          placeholder="+46*********"
        />

        {errors.contactPhone && (
          <FieldError
            id={errId('contactPhone')}
            errors={[errors.contactPhone]}
          />
        )}
      </Field>

      <Field data-invalid={!!errors.municipalityId}>
        <FieldLabel htmlFor="municipalityId">
          Municipality
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
          <span className="sr-only">(required)</span>
        </FieldLabel>

        <Controller
          name="municipalityId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString() ?? ''}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="municipalityId"
                aria-invalid={!!errors.municipalityId}
                aria-describedby={
                  errors.municipalityId ? errId('municipalityId') : undefined
                }
              >
                <SelectValue placeholder="Select municipality" />
              </SelectTrigger>

              <SelectContent>
                {municipalities.map((municipality) => (
                  <SelectItem
                    key={municipality.id}
                    value={municipality.id.toString()}
                  >
                    {municipality.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.municipalityId && (
          <FieldError
            id={errId('municipalityId')}
            errors={[errors.municipalityId]}
          />
        )}
      </Field>

      <Button disabled={isSubmitting} className="w-full" type="submit">
        Register
      </Button>
      {errors.root && (
        <p className="text-destructive text-center" role="alert">
          {errors.root.message}
        </p>
      )}
    </form>
  );
};

export default RegisterCompanyForm;
