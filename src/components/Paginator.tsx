interface PaginatorProps {
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
}

const Paginator = (props: PaginatorProps) => {
  const pages = Array.from({ length: props.totalPages }, (_, i) => i + 1)

  return (
    <div>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => props.setPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default Paginator
