import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from 'react-router-dom'
import { ActionData } from '../types'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')
  const passwordConfirmation = formData.get('password_confirmation')

  if (password !== passwordConfirmation) {
    return { message: "Password don't match" }
  }

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/register', {
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

  return redirect('/log-in')
}

const SignUp = () => {
  const error = useActionData() as ActionData

  return (
    <section className='flex h-full flex-col items-center'>
      <h2 className='text-xl font-medium'>Create a new account</h2>
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
        <div className='flex flex-col'>
          <label htmlFor='password_confirmation' className='text-sm'>
            Password confirmation
          </label>
          <input
            type='password'
            name='password_confirmation'
            id='password_confirmation'
            required
            className='border-2'
          />
        </div>
        <div className='mt-6 flex items-center justify-center'>
          <button
            type='submit'
            className='rounded-lg bg-neutral-400 px-3 py-1 hover:scale-105'
          >
            Create user
          </button>
        </div>
      </Form>
    </section>
  )
}

export default SignUp
