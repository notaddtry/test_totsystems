import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { searchMessages } from '../../store/slices/messageSlice'
import { IMessage } from '../../types'

interface ISearchMessages {
  messages: IMessage[]
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
}

const SearchMessages: React.FC = ({}) => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const searchedMessages = useAppSelector((state) => state.message.messages)

  const searchHandle = () => {
    navigate(`/message?s=${search}`)
    // dispatch(searchMessages({ query: search }))
  }

  return (
    <div className='modal_folder row'>
      <div className='input-field col s4'>
        <input
          placeholder='Enter..'
          id='folder_name'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor='folder_name'>Поиск</label>
      </div>
      <button
        className='waves-effect waves-light btn deep-purple darken-1'
        onClick={searchHandle}>
        Отправить
      </button>
    </div>
  )
}

export default SearchMessages
