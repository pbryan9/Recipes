import type { PropsWithChildren, MouseEventHandler } from 'react';

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  children,
  onClick,
  ...args
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type='button'
      onClick={onClick}
      {...args}
      className='col-span-2 border border-gray-400 text-center rounded-md text-base h-full'
    >
      {children}
    </button>
  );
}
