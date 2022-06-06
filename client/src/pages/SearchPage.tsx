import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

import { useAppDispatch } from '../store/hooks'
import { fetchMessages, searchMessages } from '../store/slices/messageSlice'

import SearchComponent from '../components/Search/SearchComponent'

const SearchPage: React.FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const search = location.search.split('=')[1]

  useEffect(() => {
    if (search) {
      dispatch(searchMessages(search))
    } else {
      dispatch(fetchMessages())
    }
    // eslint-disable-next-line
  }, [location])

  return (
    <>
      <h1>Найденные сообщения</h1>
      {search ? <h2>по запросу: {search}</h2> : <></>}

      <SearchComponent />
    </>
  )
}

export default SearchPage
