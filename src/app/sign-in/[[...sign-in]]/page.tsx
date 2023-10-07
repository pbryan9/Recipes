import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className='h-full w-full flex justify-center items-center'>
      <SignIn />
    </main>
  );
}
