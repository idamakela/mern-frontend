import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import auth from './lib/auth.ts'
import React from 'react'

import './index.css'
import App from './App.tsx'
import Index from './routes/Index.tsx'
import LogIn, { action as logInAction } from './routes/LogIn.tsx'
import SignUp, { action as signUpAction } from './routes/SignUp.tsx'
import CreatePost, {action as createPostAction} from './routes/CreatePost.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'sign-up',
        action: signUpAction,
        element: <SignUp />,
      },
      {
        path: 'log-in',
        action: logInAction,
        element: <LogIn />,
      },
      {
        path: 'log-out',
        action: () => {
          auth.logOut()
          return redirect('/')
        },
      },
      {
        path: 'create-post',
        action: createPostAction,
        element: <CreatePost />
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
