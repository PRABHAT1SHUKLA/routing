import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import './index.css'
import Root ,{loader as rootLoader,
  action as rootAction
}from './routes/root';
import ErrorPage from './error-page';
import Contact , {loader as contactLoader,
  action as contactAction,
} from './routes/contact';
import { action as destroyAction } from './routes/destroy';
import EditContact ,{ action as editAction} from './routes/edit';
import Index from './routes';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true , element: <Index/>},
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path:"contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div> Oops! there was an error.</div>
      }
      
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
