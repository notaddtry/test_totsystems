import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { searchMessages } from '../../store/slices/messageSlice'
import { IMessage } from '../../types'

import styles from './search.module.scss'

interface ISearchMessages {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchMessages: React.FC<ISearchMessages> = ({ search, setSearch }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const searchedMessages = useAppSelector((state) => state.message.messages)

  const searchHandle = () => {
    if (search.trim()) {
      return navigate(`/message?s=${search}`)
    }
    navigate('/message')
    // dispatch(searchMessages({ query: search }))
  }

  return (
    <>
      <div className='modal_folder row valign-wrapper center'>
        <input
          placeholder='Поиск сообщений'
          type='text'
          value={search}
          className='white col s6'
          // value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className='waves-effect waves-light btn deep-purple darken-1 col s2'
          onClick={searchHandle}>
          Вперед!
        </button>
      </div>
    </>
  )
}

export default SearchMessages
