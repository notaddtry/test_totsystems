import React from 'react'
import { useNavigate } from 'react-router'

interface ISearchMessages {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchMessages: React.FC<ISearchMessages> = ({ search, setSearch }) => {
  const navigate = useNavigate()

  const searchHandle = () => {
    if (search.trim()) {
      return navigate(`/message?s=${search}`)
    }
    navigate('/message')
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') searchHandle()
  }

  return (
    <>
      <div className='modal_folder row valign-wrapper center'>
        <input
          placeholder='Поиск сообщений'
          type='text'
          value={search}
          className='white col s6'
          onKeyDown={(e) => handleKeyPress(e)}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className='waves-effect waves-light btn deep-purple darken-1 col s2 flex_center'
          onClick={searchHandle}>
          <i className='material-icons cursor'>search</i>
        </button>
      </div>
    </>
  )
}

export default SearchMessages
