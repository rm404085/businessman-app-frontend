import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import { router } from './router'
import { PostProvider } from './components/Provider/PostProvider/PostProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <PostProvider>
     <RouterProvider router={router}>

    </RouterProvider>
   </PostProvider>
  </StrictMode>,
)
