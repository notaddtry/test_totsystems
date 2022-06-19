import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { removeFolder } from '../../store/slices/folderSlice'
import { useAppDispatch } from '../../store/hooks'
import { IError, IFolder } from '../../types'
import { request } from '../helpers/http'

const FolderItem: React.FC<IFolder> = ({ name, id, canBeEdited }) => {
  const dispatch = useAppDispatch()
  const [messagesCount, setMessagesCount] = useState(0)
  const [error, setError] = useState<IError | null>(null)

  const deleteFolder = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault()

    dispatch(removeFolder(id))
    M.toast({ html: 'Папка удалена!' })
  }

  const fetchMessagesCount = async () => {
    try {
      if (error) setError(null)
      const data: IFolder = await request(`/api/folders/${id}`)

      if (data.messagesInFolder) {
        setMessagesCount(data.messagesInFolder?.length)
      }
    } catch (error) {
      setError({ message: 'Ошибка.Повторите позже' })
    }
  }

  useEffect(() => {
    fetchMessagesCount()
  }, [])

  return (
    <li className='collection-item' style={{ display: 'flex' }}>
      <Link to={`/folder/${id}`} style={{ display: 'flex', flex: '1 1 100%' }}>
        <span>
          {name} [{error ? ` ${error.message} ` : `${messagesCount}`}]
        </span>
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
