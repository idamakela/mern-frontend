import { Link } from 'react-router-dom'
import { Post } from '../types'
import Vote from './Vote'

const PostItem = ({ post }: { post: Post }) => {
  return (
    <section className='flex'>
      <Vote post={post}/>
      <div className='flex flex-col gap-2 border-2 p-2 grow'>
        {post.link ? (
          <Link to={post.link}>
            <h2 className='text-lg font-medium first-letter:capitalize'>
              {post.title}
              <span className='text-xs'> ({post.link})</span>
            </h2>
          </Link>
        ) : (
          <Link to={`/posts/${post._id}`}>
            <h2 className='text-lg font-medium first-letter:capitalize'>{post.title}</h2>
          </Link>
        )}
        <p className='text-xs'>by {post.author.userName}</p>
        {post.link && (
          <span>
            <Link to={`/posts/${post._id}`}>Show post</Link>
          </span>
        )}
      </div>
    </section>
  )
}

export default PostItem
