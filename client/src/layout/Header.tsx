import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='deep-purple darken-1'>
      <div className='nav-wrapper'>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <Link to='/'>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to='/folder/1'>
              <span>Folder</span>
            </Link>
          </li>
          <li>
            <Link to='/message/1'>
              <span>Message</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
