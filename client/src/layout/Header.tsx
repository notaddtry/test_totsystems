import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchMessages from '../components/Folder/SearchMessages'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const clickHandler = () => {
    navigate(-1)
  }

  return (
    <nav className='deep-purple darken-1'>
      <div className='nav-wrapper row'>
        {location.pathname !== '/' ? (
          <button
            className='waves-effect waves-light btn deep-purple darken-1 left'
            onClick={clickHandler}>
            Назад
          </button>
        ) : (
          <></>
        )}
        <div className='col s6 push-s3'>
          <SearchMessages />
        </div>

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
