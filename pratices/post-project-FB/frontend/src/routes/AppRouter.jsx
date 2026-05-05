import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from '../layout/MainLayout'
import PostPage from '../pages/PostPage'
import FormPage from '../pages/FormPage'

const AppRouter = () => {
   
    let router = createBrowserRouter([
         {
            path : '/',
            element : <MainLayout/>,
            children : [
                {
                    path : "",
                    element : <PostPage/>
                },
                {
                   path : "/form",
                   element : <FormPage/>
                }
            ]
          
        }
    ])
  
  return <RouterProvider router={router}/>
}

export default AppRouter
