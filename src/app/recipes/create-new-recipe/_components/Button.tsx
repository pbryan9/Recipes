import type { PropsWithChildren, MouseEventHandler } from 'react';

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  border?: 'none';
};

export default function Button({
  children,
  border = undefined,
  onClick,
  ...args
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type='button'
      onClick={onClick}
      {...args}
      className={`col-span-2  text-center rounded-md text-base h-full ${
        border !== 'none' && 'border border-gray-400'
      }`}
    >
      {children}
    </button>
  );
}
