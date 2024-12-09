import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
        ghost: 'bg-transparent hover:bg-gray-100',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={twMerge(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
