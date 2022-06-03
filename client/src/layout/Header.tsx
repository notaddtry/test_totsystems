import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchMessages from '../components/Search/SearchMessages'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')

  const clickHandler = () => {
    navigate(-1)
  }

  useEffect(() => {
    setSearch('')
  }, [location])

  return (
    <nav className='deep-purple darken-1'>
      <div className='nav-wrapper row valign-wrapper'>
        {location.pathname !== '/' ? (
          <button
            className='waves-effect waves-light btn deep-purple darken-1 col s1'
            onClick={clickHandler}>
            Назад
          </button>
        ) : (
          <>
            <div className='col s1'></div>
          </>
        )}
        <div className='col s6'>
          <SearchMessages search={search} setSearch={setSearch} />
        </div>

        <ul id='nav-mobile' className='hide-on-med-and-down col s2'>
          <li className='waves-effect waves-light btn deep-purple darken-1'>
            <Link to='/'>
              <span>Home</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
