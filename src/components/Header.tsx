import { Link, useFetcher } from 'react-router-dom'
import auth from '../lib/auth'

const Header = () => {
  const isAuthenticated = auth.isLoggedIn()
  const fetcher = useFetcher()

  return (
    <header className='flex justify-between border-b-2 p-4'>
      <Link to='/'>
        <h1 className='text-xl font-medium'>ChangedIT</h1>
      </Link>
      <div className='flex gap-2'>
        {isAuthenticated ? (
          <>
            <Link to='/create-post'>
              <button className='rounded-lg bg-neutral-400 px-3 py-1 text-sm hover:scale-105'>
                New post
              </button>
            </Link>
            <fetcher.Form method='post' action='/log-out'>
              <button
                type='submit'
                className='rounded-lg bg-neutral-400 px-3 py-1 text-sm hover:scale-105'
              >
                Log out
              </button>
            </fetcher.Form>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  )
}

export default Header
