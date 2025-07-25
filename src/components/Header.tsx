import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className='border-b border-gray-300 '>
      <nav className='h-16 container mx-auto flex items-center gap-6'>
        <div className='font-bold'>Header</div>
        <NavLink to={"/"}>Home</NavLink>
       
        <NavLink to={"/usereform"}>UseRef</NavLink>
        <NavLink to={"/useform"}>UseForm</NavLink>
      </nav>
    </header>
  )
}

export default React.memo(Header)