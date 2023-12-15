import { Link } from 'react-router-dom'
import { Post } from '../types'

const PostItem = ({ post }: { post: Post }) => {
  return (
    <section>
      <div>
        {post.link ? (
          <Link to={post.link}>
            <h2>
              {post.title}
              <span>({post.link})</span>
            </h2>
          </Link>
        ) : (
          <Link to={`/posts/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
        )}
        <p>by {post.author.userName}</p>
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
