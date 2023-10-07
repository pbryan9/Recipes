import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className='h-full w-full flex justify-center items-center'>
      <SignUp />
    </main>
  );
}
