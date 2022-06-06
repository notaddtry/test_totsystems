import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import {
  fetchFolders,
  addFolder,
  setShowModal,
} from '../../store/slices/folderSlice'
import { fetchMessages } from '../../store/slices/messageSlice'

import Loader from '../Loader'
import FolderItem from './FolderItem'
import NameModal from './NameModal'

const FolderList: React.FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const showModal = useAppSelector((state) => state.folder.showModal)
  const [loading, setLoading] = useState(true)

  const [folderName, setFolderName] = useState('')

  const folders = useAppSelector((state) => state.folder.folders)
  const error = useAppSelector((state) => state.folder.error)
  const loadingFromStore = useAppSelector((state) => state.folder.loading)

  const postFolder = () => {
    if (folderName.trim()) {
      if (showModal) dispatch(setShowModal(false))
      dispatch(addFolder(folderName))
      setFolderName('')
      M.toast({ html: 'Папка создана!' })
    }
  }

  useEffect(() => {
    dispatch(fetchFolders())
    dispatch(fetchMessages())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setLoading(loadingFromStore)
  }, [loadingFromStore])

  useEffect(() => {
    M.updateTextFields()
  }, [showModal])

  useEffect(() => {
    return () => {
      dispatch(setShowModal(false))
    }
    // eslint-disable-next-line
  }, [location])

  if (error) {
    return <h6>Ошибка загрузки. Попробуйте позже</h6>
  }

  if (loading) return <Loader />

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
          <span>Папок нет</span>
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
