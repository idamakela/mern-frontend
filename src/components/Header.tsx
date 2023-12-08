import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='flex justify-between border-b-2 p-4'>
      <h1 className='text-xl font-medium'>ChangedIT</h1>
      <div className='flex gap-2'>
        <Link to='/sign-up'>
          <button className='rounded-lg bg-neutral-400 px-3 py-1 text-sm hover:scale-105'>
            Sign Up
          </button>
        </Link>
        <Link to='/log-in'>
          <button className='rounded-lg bg-neutral-400 px-3 py-1 text-sm hover:scale-105'>
            Log In
          </button>
        </Link>
      </div>
    </header>
  )
}

export default Header
