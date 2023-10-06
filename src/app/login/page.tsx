type LoginProps = {};

export default function Login({}: LoginProps) {
  return (
    <>
      <section className='h-full w-full flex items-center justify-center'>
        <article className='bg-gray-800 border border-white/60  h-3/5 aspect-square rounded-md p-6 flex flex-col items-center justify-center gap-6'>
          <h1 className='text-4xl mb-6'>Log In</h1>
          <form className='w-full grid grid-cols-3 gap-y-4 text-2xl items-center'>
            <label htmlFor='username' className='col-span-1 font-bold'>
              Username
            </label>
            <input
              className='col-span-2 rounded-md text-gray-800 px-6 py-2 h-full'
              id='username'
              type='text'
            ></input>
            <label htmlFor='password' className='col-span-1 font-bold'>
              Password
            </label>
            <input
              className='col-span-2 rounded-md text-gray-800 px-6 py-2 h-full'
              id='password'
              type='password'
            ></input>
            <button
              className='col-start-2 col-span-1 px-6 py-4 border border-gray-400 rounded-md mt-6'
              type='button'
            >
              Submit
            </button>
          </form>
        </article>
      </section>
    </>
  );
}
