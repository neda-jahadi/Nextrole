import { useNavigate } from 'react-router-dom';
import { useAddJob } from '../api/jobData';
import { useId } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { jobSchema, type JobFormFields } from '../validation/job';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  JOB_TYPES,
  JOB_TYPES_LABELS,
  WORK_MODE,
  WORK_MODE_LABELS,
} from '../constants/job';
import Input from '@/components/ui/Input';
import type { MunicipalityApiResponse } from '@/features/locations/types/locationTypes';
import { Button } from '@/components/ui/button/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Textarea from '@/components/ui/textarea';

type JobFormProps = {
  municipalities: MunicipalityApiResponse[];
};

const JobForm = ({ municipalities }: JobFormProps) => {
  const addJobMutation = useAddJob();

  const navigate = useNavigate();
  const formId = useId();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<JobFormFields>({
    resolver: zodResolver(jobSchema),
  });

  const onSubmitJobForm: SubmitHandler<JobFormFields> = (data) => {
    const payload = {
      title: data.title,
      type: data.type,
      workMode: data.workMode,
      description: data.description,
      salary: data.salary,
      municipalityId: Number(data.municipalityId),
    };

    addJobMutation.mutate(payload, {
      onSuccess: () => {
        navigate('/jobs');
      },
      onError: (error: unknown) => {
        setError('root', {
          type: 'server',
          message: (error as Error).message || 'Failed to create job',
        });
      },
    });
  };

  const isSaving = addJobMutation.isPending;

  const errId = (name: string) => `${formId}-${name}-error`;
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmitJobForm)}
        noValidate
        className="flex flex-col gap-6"
      >
        <Field data-invalid={!!errors.type}>
          <FieldLabel htmlFor="type">
            Job Type
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
            <span className="sr-only">(required)</span>
          </FieldLabel>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                <SelectTrigger
                  id="type"
                  aria-invalid={!!errors.type}
                  aria-describedby={errors.type ? errId('type') : undefined}
                >
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>

                <SelectContent>
                  {JOB_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {JOB_TYPES_LABELS[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p
              id={errId('type')}
              aria-live="polite"
              aria-hidden="false"
              className="text-danger"
            >
              {errors.type.message}
            </p>
          )}
        </Field>
        <Field data-invalid={!!errors.workMode}>
          <FieldLabel htmlFor="workMode">
            Work Mode
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
            <span className="sr-only">(required)</span>
          </FieldLabel>

          <Controller
            name="workMode"
            control={control}
            render={({ field }) => (
              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                <SelectTrigger
                  id="workMode"
                  aria-invalid={!!errors.workMode}
                  aria-describedby={
                    errors.workMode ? errId('workMode') : undefined
                  }
                >
                  <SelectValue placeholder="Select work mode" />
                </SelectTrigger>

                <SelectContent>
                  {WORK_MODE.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {WORK_MODE_LABELS[mode]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.workMode && (
            <FieldError id={errId('workMode')} errors={[errors.workMode]} />
          )}
        </Field>

        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">
            Job
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
            <span className="sr-only">(required)</span>
          </FieldLabel>
          <Input
            {...register('title')}
            id="title"
            required
            invalid={!!errors.title}
            aria-describedby={errors.title ? errId('title') : undefined}
            placeholder="e.g. Senior Frontend Developer"
          />
          {errors.title && (
            <FieldError id={errId('title')} errors={[errors.title]} />
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
            placeholder="Add job duties, expectations, requirements, etc."
          />

          {errors.description && (
            <FieldError
              id={errId('description')}
              errors={[errors.description]}
            />
          )}
        </Field>

        <Field data-invalid={!!errors.salary}>
          <FieldLabel htmlFor="salary">
            Salary
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
            <span className="sr-only">(required)</span>
          </FieldLabel>

          <Input
            {...register('salary')}
            id="salary"
            required
            invalid={!!errors.salary}
            aria-describedby={errors.salary ? errId('salary') : undefined}
            placeholder="e.g. 45,000 SEK/month"
          />

          {errors.salary && (
            <FieldError id={errId('salary')} errors={[errors.salary]} />
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

        <Button
          disabled={isSubmitting}
          className="w-full justify-center"
          type="submit"
        >
          {isSaving ? 'Saving ...' : 'Add Job'}
        </Button>
        {errors.root && (
          <p role="alert" className="text-destructive">
            {errors.root?.message ?? ''}
          </p>
        )}
      </form>
    </div>
  );
};

export default JobForm;
