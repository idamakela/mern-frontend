import './index.css'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import auth from './lib/auth.ts'
import React from 'react'

import App from './App.tsx'
import RequireAuth from './components/RequireAuth.tsx'
import Index, { loader as indexLoader } from './routes/Index.tsx'
import LogIn, { action as logInAction } from './routes/LogIn.tsx'
import SignUp, { action as signUpAction } from './routes/SignUp.tsx'
import CreatePost, { action as createPostAction } from './routes/CreatePost.tsx'
import ShowPost, { loader as showPostLoader } from './routes/ShowPost.tsx'
import { action as createCommentAction } from './components/CommentForm.tsx'
import { action as voteAction } from './components/Vote.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        loader: indexLoader,
        element: <Index />,
      },
      {
        path: '/posts/:id',
        loader: showPostLoader,
        element: <ShowPost />,
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
        element: <RequireAuth />,
        children: [
          {
            path: 'create-post',
            action: createPostAction,
            element: <CreatePost />,
          },
          {
            path: '/posts/:postId/comments',
            action: createCommentAction,
          },
          {
            path: '/posts/:postId/vote',
            action: voteAction
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
