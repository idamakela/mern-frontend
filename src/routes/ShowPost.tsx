import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { Post } from '../types'
import CommentForm from '../components/CommentForm'
import Vote from '../components/Vote'
import DeletePost from '../components/DeletePost'
import auth from '../lib/auth'
import DeleteComment from '../components/DeleteComment'

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + '/posts/' + id,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  const posts = await response.json()

  return posts
}

const ShowPost = () => {
  const post = useLoaderData() as Post
  const isAuthenticated = auth.isLoggedIn()

  /** Another way of fetching the data
   * const commentsFetcher = useFetcher({ key: 'comment-form-' + post._id })
   */

  return (
    <div>
      <div className='flex bg-neutral-300'>
        <Vote post={post} />
        <div className='grow p-2'>
          {post.link ? (
            <Link to={post.link} className='text-lg font-medium'>
              <h2>
                {post.title}
                <span className='text-xs'> ({post.link})</span>
              </h2>
            </Link>
          ) : (
            <h2 className='text-lg font-medium'>{post.title}</h2>
          )}
          <p className='text-xs'>by {post.author.userName}</p>
          {post.body && (
            <div className='mt-2'>
              <p>{post.body}</p>
            </div>
          )}
        </div>
        {isAuthenticated && (
          <div className='m-2'>
            <DeletePost post={post} />
          </div>
        )}
      </div>
      <div className='mt-4 flex flex-col gap-1 border-t-2'>
        {post.comments?.map((comment) => (
          <div
            key={comment._id}
            className='flex items-center justify-between border-b-2'
          >
            <p>
              <span className='font-medium'>@{comment.author.userName}: </span>{' '}
              {comment.body}
            </p>
            {isAuthenticated && <DeleteComment post={post} />}
          </div>
        ))}
      </div>
      <div className='mt-8'>
        <CommentForm postId={post._id} />
      </div>
    </div>
  )
}

export default ShowPost
