import React from 'react'
import { NavLink } from 'react-router'

const Nabar = () => {
  return (
    <nav className='flex justify-center w-full h-[10%] py-4 px-6'>
     <div className="w-[800px] flex justify-between ">
         <h1 className='text-3xl font-medium '>Post</h1>
         <div className="flex gap-6">
            <NavLink className={({isActive})=> isActive ? `text-blue-300 underline`: ``}  to={'/'}>Post</NavLink>
            <NavLink className={({isActive})=> isActive ? `text-blue-300 underline`: ``} to={'/form'}>CreatePost</NavLink>
         </div>
     </div>

    </nav>
  )
}

export default Nabar
