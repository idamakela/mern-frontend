import { ActionFunctionArgs, useFetcher } from 'react-router-dom'
import auth from '../lib/auth'
import { Post } from '../types'
import { useRef } from 'react'

export const action = async (args: ActionFunctionArgs) => {
  const { postId } = args.params
  const formData = await args.request.formData()

  // should be an API client - cus do not write ccode more than once
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + `/posts/${postId}/comments`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.getJWT(),
      },
      method: 'POST',
      body: JSON.stringify({ commentBody: formData.get('body') }),
    },
  )

  if (!response.ok) {
    const { message } = await response.json()
    return { message }
  }

  const post = (await response.json()) as Post

  return {
    comments: post.comments,
  }
}

const CommentForm = ({ postId }: { postId: string }) => {
  const fetcher = useFetcher({ key: 'comment-form-' + postId })
  const textRef = useRef<HTMLTextAreaElement>(null)

  // To clear the text field when it's loading
  if (fetcher.data && textRef.current) {
    textRef.current.value = ''
  }

  // Clean the textarea on submit
  // fetcher.state
  // fetcher.data

  return (
    <div className='flex h-full flex-col items-center'>
      <h3 className='text-lg font-medium'>Leave a comment</h3>
      <fetcher.Form
        method='post'
        action={`/posts/${postId}/comments`}
        className='min-w-md mt-4 flex flex-col gap-2'
      >
        <textarea ref={textRef} name='body' id='body' className='border-2' />
        <button
          type='submit'
          className='rounded-lg bg-neutral-400 px-3 py-1 hover:scale-105'
        >
          Post comment
        </button>
      </fetcher.Form>
    </div>
  )
}

export default CommentForm
