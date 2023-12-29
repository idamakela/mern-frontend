import { useLocation } from 'react-router-dom'
import { cn } from '../utils/classNames'

interface PaginatorProps {
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
}

const Paginator = (props: PaginatorProps) => {
  const pages = Array.from({ length: props.totalPages }, (_, i) => i + 1)
  const location = useLocation()
  const search = location.search

  return (
    <div className='flex items-center justify-center gap-1 text-xs'>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => props.setPage(page)}
          className={cn(
            'rounded-lg bg-neutral-400 px-2 py-1 hover:scale-105',
            search === '?page=' + page && 'bg-neutral-200 text-neutral-500',
            !search && page === 1 && 'bg-neutral-200 text-neutral-500'
          )}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default Paginator
