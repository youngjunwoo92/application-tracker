import { ButtonHTMLAttributes, useMemo, forwardRef, ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from './../../utilities/cn';
import Spinner from './Spinner';

type ButtonVariant = 'filled' | 'outlined';

type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'dark';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    children,
    color = 'primary',
    disabled = false,
    loading = false,
    className,
    fullWidth,
    variant,
    size,
    ...props
  },
  ref,
) {
  const buttonVariants = useMemo(
    () =>
      cva(
        // default styling
        `rounded-sm inline-flex justify-center items-center transition-all${
          fullWidth ? ' w-full' : ''
        }`,
        {
          variants: {
            variant: {
              filled: `bg-${color}-bg text-${color}-fg shadow-md shadow-${color} hover:bg-${color}-hover disabled:opacity-80 disabled:hover:bg-none`,
              outlined: `outline outline-1 outline-${color}-bg hover:bg-${color}-bg hover:outline-none disabled:opacity-80 disabled:hover:bg-none`,
            },
            size: {
              sm: 'h-8 px-4 text-md',
              md: 'h-9 px-6 text-md',
              lg: 'h-10 px-8 text-lg',
            },
            fullWidth: {
              true: 'w-full',
              false: '',
            },
          },
          defaultVariants: {
            variant: 'filled',
            size: 'md',
          },
        },
      ),
    [fullWidth, color],
  );

  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
});

export default Button;
