import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <div className='h-screen'>
      <Header />
      <main className='p-4 h-4/5'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
