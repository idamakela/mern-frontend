import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import './App.css'

function App() {
  return (
    <div className='h-screen'>
      <Header />
      <main className='p-4'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
