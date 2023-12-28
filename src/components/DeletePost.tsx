import { Trash2 } from 'lucide-react'
import { ActionFunctionArgs, Form, redirect } from 'react-router-dom'
import { Post } from '../types'
import auth from '../lib/auth'

export const action = async (args: ActionFunctionArgs) => {
  const { postId } = args.params

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + `/posts/${postId}`,
    {
      headers: {
        'Authorization': `Bearer ${auth.getJWT()}`,
      },
      method: 'DELETE',
    },
  )

  if (!response.ok) {
    const { message } = await response.json()
    return { message }
  }

  return redirect('/')
}

const DeletePost = ({ post }: { post: Post }) => {
  return (
    <Form method='delete' action={`/posts/${post._id}/delete`}>
      <button type='submit'>
        <Trash2 size={18} />
      </button>
    </Form>
  )
}

export default DeletePost
