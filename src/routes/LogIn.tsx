import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from 'react-router-dom'
import auth from '../lib/auth'

// for react router dom Forms - create something
export const action = async (args: ActionFunctionArgs) => {
  const { request } = args

  const formData = await request.formData()

  // how to get datLogIna from the form, mathers the input names
  const username = formData.get('username')
  const password = formData.get('password')

  // using .env, which is already packed into vite - no config requiered
  // add what endpoint in backend handles the request - /register
  // send extra things with the request - obs! body needs to be a string
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/login', {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const { message } = await response.json()
    return { message }
  }

  const { token } = await response.json()
  auth.logIn(token)

  return redirect('/')
}

const LogIn = () => {
  // if anything is returned from an action, this hook catches it - we use it for error handling rn
  const error = useActionData() as { message: string } | undefined

  return (
    <section className='flex h-full flex-col items-center'>
      <h2 className='text-xl font-medium'>Log in to your account</h2>
      <Form method='post' className='min-w-md mt-4 flex flex-col gap-1'>
        {error && (
          <p>
            <b>Error: </b>
            {error.message}
          </p>
        )}
        <div className='flex flex-col'>
          <label htmlFor='username' className='text-sm'>
            Username
          </label>
          <input
            type='text'
            name='username'
            id='username'
            required
            className='border-2'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password' className='text-sm'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            required
            className='border-2'
          />
        </div>
        <div className='mt-6 flex items-center justify-center'>
          <button
            type='submit'
            className='rounded-lg bg-neutral-400 px-3 py-1 hover:scale-105'
          >
            Log in
          </button>
        </div>
      </Form>
    </section>
  )
}

export default LogIn
