import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { IFolder } from '../../types/folder.interface'

const FolderList = () => {
  const { request, loading, error, clearError } = useHttp()
  const [folders, setFolders] = useState<IFolder[]>([])
  const folderRef = useRef<HTMLInputElement>(null)
  const [createdName, setCreatedName] = useState<string | undefined>('')

  const fetchFolder = async () => {
    try {
      clearError()
      const data = await request('/api/folders')
      setFolders(data)
    } catch (error) {
      console.log(error)
    }
  }

  const addFolder = () => {
    setCreatedName(folderRef.current?.value)
  }

  const postFolder = useCallback(async () => {
    try {
      const data = await request(
        '/api/folders',
        'POST',
        folderRef.current?.value
      )
    } catch (error) {
      console.log(error)
    }
  }, [createdName])

  useEffect(() => {
    fetchFolder()
  }, [postFolder])

  useEffect(() => {
    postFolder()
  }, [createdName])

  useEffect(() => {
    M.updateTextFields()
  }, [folders])

  // if (loading) {
  //   return <span>loading...</span>
  // }
  if (error) {
    return <span>something went wrong...</span>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {folders.map((folder) => (
        <Link
          key={folder.id}
          style={{ marginRight: '1rem' }}
          to={`/folder/${folder.id}`}>
          {folder.name}
        </Link>
      ))}
      <span onClick={addFolder}>+</span>
      <div className='modal_folder'>
        <div className='input-field col s6'>
          <input
            placeholder='Enter..'
            id='folder_name'
            type='text'
            ref={folderRef}
          />
          <label htmlFor='folder_name'>Folder Name</label>
        </div>
      </div>
    </div>
  )
}

export default FolderList
