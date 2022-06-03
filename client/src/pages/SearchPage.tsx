import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import SearchComponent from '../components/Search/SearchComponent'
import { useAppDispatch } from '../store/hooks'
import { fetchMessages, searchMessages } from '../store/slices/messageSlice'
import { IMessage } from '../types'

const SearchPage = () => {
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
      <h1>Найденные сообщения</h1>
      {search ? <h2>по запросу: {search}</h2> : <></>}

      <SearchComponent />
    </>
  )
}

export default SearchPage
