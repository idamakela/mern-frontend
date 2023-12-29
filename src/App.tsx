import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <div className='h-full'>
      <Header />
      <main className='h-full p-2 md:p-4'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
