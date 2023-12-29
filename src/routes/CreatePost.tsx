import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from 'react-router-dom'
import { ActionData } from '../types'
import auth from '../lib/auth'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const postData = Object.fromEntries(formData.entries())

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.getJWT()}`,
    },
    body: JSON.stringify(postData),
  })

  if (!response.ok) {
    const { message } = await response.json()
    return { message }
  }

  return redirect('/')
}

const CreatePost = () => {
  const error = useActionData() as ActionData

  return (
    <section className='flex h-full flex-col items-center'>
      <h2 className='text-xl font-medium'>Create a new post</h2>
      <Form method='post' className='min-w-md mt-4 flex flex-col gap-1'>
        {error && (
          <p>
            <b>Error: </b>
            {error.message}
          </p>
        )}
        <div className='flex flex-col'>
          <label htmlFor='title' className='text-sm'>
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            required
            className='border-2'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='link' className='text-sm'>
            Link (optional)
          </label>
          <input type='text' name='link' id='link' className='border-2' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='body' className='text-sm'>
            Body (optional)
          </label>
          <textarea name='body' id='body' className='border-2' />
        </div>
        <div className='mt-6 flex items-center justify-center'>
          <button
            type='submit'
            className='rounded-lg bg-neutral-400 px-3 py-1 hover:scale-105'
          >
            Create post
          </button>
        </div>
      </Form>
    </section>
  )
}

export default CreatePost
