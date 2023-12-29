import { Link } from 'react-router-dom'
import { Link as LinkIcon } from 'lucide-react'
import { Post } from '../types'
import Vote from './Vote'

const PostItem = ({ post }: { post: Post }) => {
  return (
    <section className='flex'>
      <Vote post={post} />
      <div className='flex grow flex-col gap-2 border-2 p-2'>
        {post.link ? (
          <Link to={post.link} className='flex flex-wrap items-center gap-1'>
            <div className='flex items-center justify-center'>
              <LinkIcon size={14} />
            </div>
            <h2 className='text-lg font-medium first-letter:capitalize'>
              {post.title}
            </h2>
            <span className='text-xs'>({post.link})</span>
          </Link>
        ) : (
          <Link to={`/posts/${post._id}`}>
            <h2 className='text-lg font-medium first-letter:capitalize'>
              {post.title}
            </h2>
          </Link>
        )}
        <p className='text-xs'>by {post.author.userName}</p>
        {post.link && (
          <span>
            <Link
              to={`/posts/${post._id}`}
              className='text-xs font-medium uppercase'
            >
              Show post
            </Link>
          </span>
        )}
      </div>
    </section>
  )
}

export default PostItem
