import { Trash2 } from 'lucide-react'
import { ActionFunctionArgs, Form } from 'react-router-dom'
import { Post } from '../types'
import auth from '../lib/auth'

export const action = async (args: ActionFunctionArgs) => {
  const { postId } = args.params

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + `/posts/${postId}/comments`,
    {
      headers: {
        'Authorization': 'Bearer ' + auth.getJWT(),
      },
      method: 'DELETE',
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

const DeleteComment = ({ post }: { post: Post }) => {
  return (
    <Form method='delete' action={`/posts/${post._id}/comments`}>
      <button type='submit'>
        <Trash2 size={16} />
      </button>
    </Form>
  )
}

export default DeleteComment
