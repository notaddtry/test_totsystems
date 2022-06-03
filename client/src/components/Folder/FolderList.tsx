import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  fetchFolders,
  addFolder,
  removeFolder,
  editFolder,
  setShowModal,
} from '../../store/slices/folderSlice'
import { fetchMessages } from '../../store/slices/messageSlice'
import FolderItem from './FolderItem'
import NameModal from './NameModal'
import SearchMessages from '../Search/SearchMessages'

const FolderList = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const showModal = useAppSelector((state) => state.folder.showModal)

  const [folderName, setFolderName] = useState('')

  const folders = useAppSelector((state) => state.folder.folders)
  const messages = useAppSelector((state) => state.message.messages)

  const postFolder = () => {
    if (folderName.trim()) {
      dispatch(addFolder(folderName))
      dispatch(setShowModal(false))
      setFolderName('')
      M.toast({ html: 'Папка создана!' })
    }
  }

  // const updateFolder = (event: React.MouseEvent<HTMLElement>, id: string) => {
  //   event.preventDefault()
  //   event.stopPropagation()
  //   if (folderName.trim()) {
  //     setFolderName('')
  //     dispatch(editFolder({ body: folderName, id }))
  //   }
  // }

  useEffect(() => {
    dispatch(fetchFolders())
    dispatch(fetchMessages())
  }, [])

  useEffect(() => {
    M.updateTextFields()
  }, [showModal])

  useEffect(() => {
    return () => {
      dispatch(setShowModal(false))
    }
  }, [location])

  return (
    <>
      <h2>Список папок</h2>

      <div className='row'>
        {folders.length ? (
          <ul className='collection'>
            {folders.map((folder) => (
              <FolderItem {...folder} key={folder.id} />
            ))}
          </ul>
        ) : (
          <span>Загрузка...</span>
        )}

        <button
          className='waves-effect waves-light btn deep-purple darken-1'
          onClick={() => dispatch(setShowModal(true))}>
          Добавить папку
        </button>
        {showModal ? (
          <>
            <NameModal
              setFolderName={setFolderName}
              folderName={folderName}
              placeholder={'Folder Name'}
              postFolder={postFolder}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default FolderList
