interface PaginatorProps {
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
}

const Paginator = (props: PaginatorProps) => {
  const pages = Array.from({ length: props.totalPages }, (_, i) => i + 1)

  return (
    <div className='flex flex-col items-center'>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => props.setPage(page)}
          className='rounded-lg bg-neutral-400 px-3 py-1 hover:scale-105 active:text-neutral-200'
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default Paginator
