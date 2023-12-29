import {
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
} from 'react-router-dom'
import { Post } from '../types'
import Paginator from '../components/Paginator'
import PostItem from '../components/PostItem'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const page = url.searchParams.get('page') || 1

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + '/posts?page=' + page,
    {
      headers: {
        Accepts: 'application/json',
      },
    },
  )

  const backendRes = await response.json()

  return { page, ...backendRes }
}

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const data = useLoaderData() as {
    posts: Post[]
    totalPages: number
    page: number
  }

  return (
    <section className='flex h-full flex-col justify-between'>
      <div className='flex flex-col gap-2'>
        {data?.posts.map((post) => <PostItem post={post} key={post._id} />)}
      </div>
      <Paginator
        currentPage={data.page}
        totalPages={data.totalPages}
        setPage={(page) =>
          setSearchParams({ ...searchParams, page: page.toString() })
        }
      />
    </section>
  )
}

export default Index
