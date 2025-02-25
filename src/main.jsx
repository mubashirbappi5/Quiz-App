import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Layout/Root';
import Home from './Pages/Home';
import QuizPage from './Pages/QuizPage';
import History from './Pages/History';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[{
      path:'/',
      element:<Home/>
    },
    {
      path:'/quiz',
      element:<QuizPage/>
    },
    {
      path:'/history',
      element:<History/>
    },
   
  ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
