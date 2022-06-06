import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import SearchMessages from '../components/Search/SearchMessages'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')

  const clickHandler = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (search) setSearch('')
    // eslint-disable-next-line
  }, [location])

  return (
    <nav className='deep-purple darken-1'>
      <div className='nav-wrapper row valign-wrapper'>
        {location.pathname !== '/' ? (
          <button
            className='waves-effect waves-light btn deep-purple darken-1 col s1 block_center flex_center'
            onClick={clickHandler}>
            <i className='material-icons'>arrow_back</i>
          </button>
        ) : (
          <>
            <div className='col s1 block_center'></div>
          </>
        )}
        <div className='col s6 block_center'>
          <SearchMessages search={search} setSearch={setSearch} />
        </div>

        <Link
          to='/'
          className='waves-effect waves-light btn deep-purple darken-1 col s1 block_center flex_center'>
          <i className='material-icons cursor'>home</i>
        </Link>
      </div>
    </nav>
  )
}

export default Header
