import { InputHTMLAttributes, useMemo } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { cva } from 'class-variance-authority';

import { cn } from '@/utilities/cn';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fullWidth?: boolean;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  showErrorMessage?: boolean;
}

const Input = ({
  label,
  fullWidth = false,
  register,
  error,
  className,
  showErrorMessage = false,
  ...props
}: Props) => {
  const inputVariants = useMemo(
    () =>
      cva(
        [
          'h-12',
          'overflow-hidden',
          'rounded-md',
          'pl-4',
          'focus:outline',
          'focus:outline-[1.5px]',
          'focus:outline-transparent',
          'outline',
          'outline-[1.5px]',
          'outline-transparent',
          'transition-all',
          'bg-card-bg',
          'text-text-primary',
        ],
        {
          variants: {
            fullWidth: { true: 'w-full', false: '' },
            error: {
              true: 'outline-error-bg focus:outline-error-bg',
              false: 'focus:outline-primary-bg',
            },
          },
          defaultVariants: {
            fullWidth: false,
          },
        },
      ),
    [],
  );

  return (
    <div className="flex flex-col">
      {label && <label>{label}</label>}
      <input
        {...register}
        {...props}
        className={cn(
          inputVariants({
            fullWidth,
            error: error === undefined ? false : Object.keys(error).length > 0,
          }),
          className,
        )}
      />
      {showErrorMessage ? (
        error?.message ? (
          <span role="alert" className="mt-2 h-5 text-sm text-error">
            {error.message}
          </span>
        ) : (
          <span className="mt-2 h-5" />
        )
      ) : null}
    </div>
  );
};

export default Input;
