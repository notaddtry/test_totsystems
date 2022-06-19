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
  }, [location])

  return (
    <>
      <h2>Найденные сообщения</h2>
      {search ? <h3>по запросу: {search}</h3> : <></>}

      <SearchComponent />
    </>
  )
}

export default SearchPage
