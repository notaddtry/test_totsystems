import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { removeFolder } from '../../store/slices/folderSlice'
import { IFolder } from '../../types'
import { request } from '../../hooks/http.hook'
import SearchMessages from './SearchMessages'

const FolderItem: React.FC<IFolder> = ({ name, id, canBeEdited }) => {
  const dispatch = useAppDispatch()
  const [messagesCount, setMessagesCount] = useState(0)

  const deleteFolder = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault()

    dispatch(removeFolder(id))
  }

  const fetchMessagesCount = async () => {
    const data = await request('/api/messages')
    setMessagesCount(data.length)
  }

  useEffect(() => {
    fetchMessagesCount()
  }, [])

  return (
    <li className='collection-item' style={{ display: 'flex' }}>
      <Link to={`/folder/${id}`} style={{ display: 'flex', flex: '1 1 100%' }}>
        <span>{name}</span>
        <span>[{messagesCount}]</span>
      </Link>
      {canBeEdited ? (
        <button className='right' onClick={(event) => deleteFolder(event, id)}>
          X
        </button>
      ) : (
        <></>
      )}
    </li>
  )
}

export default FolderItem
