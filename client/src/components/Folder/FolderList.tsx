import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  fetchFolders,
  addFolder,
  removeFolder,
  editFolder,
} from '../../store/slices/folderSlice'
import FolderItem from './FolderItem'

const FolderList = () => {
  const dispatch = useAppDispatch()

  const [folderName, setFolderName] = useState('')

  const folders = useAppSelector((state) => state.folder.folders)

  const postFolder = () => {
    if (folderName.trim()) {
      M.updateTextFields()
      dispatch(addFolder(folderName))
      setFolderName('')
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
    M.updateTextFields()
    dispatch(fetchFolders())
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {folders.length ? (
        <ul className='collection'>
          {folders.map((folder) => (
            <FolderItem {...folder} key={folder.id} />
          ))}
        </ul>
      ) : (
        <span>Загрузка...</span>
      )}

      <span onClick={postFolder}>+</span>
      <div className='modal_folder'>
        <div className='input-field col s6'>
          <input
            placeholder='Enter..'
            id='folder_name'
            type='text'
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <label htmlFor='folder_name'>Folder Name</label>
        </div>
      </div>
    </div>
  )
}

export default FolderList
