import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { removeFolder } from '../../store/slices/folderSlice'
import { IFolder } from '../../types'
import { request } from '../../hooks/http.hook'
import SearchMessages from '../Search/SearchMessages'

const FolderItem: React.FC<IFolder> = ({ name, id, canBeEdited }) => {
  const dispatch = useAppDispatch()
  const [messagesCount, setMessagesCount] = useState(0)

  const deleteFolder = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault()

    dispatch(removeFolder(id))
    M.toast({ html: 'Папка удалена!' })
  }

  const fetchMessagesCount = async () => {
    const data: IFolder = await request(`/api/folders/${id}`)
    if (data.messagesInFolder) {
      setMessagesCount(data.messagesInFolder?.length)
    }
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
        <button
          className='right btn deep-purple darken-1'
          onClick={(event) => deleteFolder(event, id)}>
          <i className='medium material-icons cursor'>delete_forever</i>
        </button>
      ) : (
        <></>
      )}
    </li>
  )
}

export default FolderItem
