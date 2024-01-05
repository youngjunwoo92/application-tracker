export type ButtonColors =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'warning';

export const theme = {
  header: {
    height: '64px',
  },
};

export const size = {
  header: {
    value: 60,
    formatted: 'h-[60px]',
  },
  maxSectionWidth: {
    formatted: 'max-w-[1920px] w-full',
  },
};

export const buttonStyles = (color: ButtonColors) => ({
  size: {
    sm: 'px-4 py-2 text-md',
    md: 'px-6 py-3 text-md',
    lg: 'px-8 py-3 text-lg',
  },
  variant: {
    filled: `bg-${color}-bg text-${color}-fg hover:bg-${color}`,
    outlined: `outline outline-1 outline-${color}-bg hover:bg-${color}-bg hover:outline-none`,
  },
});
