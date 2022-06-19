import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import { editFolder, setShowModal } from '../../store/slices/folderSlice'
import { useWindowWidth } from '@react-hook/window-size'
import { IError, IFolder, IMessage } from '../../types'
import { request } from '../helpers/http'

import NameModal from './NameModal'
import Loader from '../Loader'
import MessagesInFolder from '../Message/MessagesInFolder'
import { MOBILE_WIDTH } from './../helpers/constants'

const FolderInPage: React.FC = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const width = useWindowWidth()

  const folders = useAppSelector((state) => state.folder.folders)
  const folderToUpdate = folders.find((folder) => folder.id === params.id)

  const [messages, setMessages] = useState<IMessage[]>([])
  const [folder, setFolder] = useState<IFolder | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<IError | null>(null)

  const [newFolderName, setNewFolderName] = useState(folder?.name || '')
  const showModal = useAppSelector((state) => state.folder.showModal)

  const fetchData = async () => {
    try {
      const data = await request(`/api/folders/${params.id}`)
      setMessages(data.messagesInFolder)
      setFolder(data)
    } catch (error) {
      setError(error as IError)
    }
    setLoading(false)
  }

  const updateFolder = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault()
    event.stopPropagation()
    if (newFolderName?.trim()) {
      dispatch(setShowModal(false))
      dispatch(editFolder({ body: newFolderName, id }))
      M.toast({ html: 'Папка обновлена!' })
    }
  }

  useEffect(() => {
    fetchData()
  }, [folderToUpdate])

  useEffect(() => {
    M.updateTextFields()
  }, [showModal])

  useEffect(() => {
    return () => {
      if (showModal) dispatch(setShowModal(false))
    }
  }, [location])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <div className='row valign-wrapper'>
        <span className='col s9'>
          <h2>Папка:</h2>
          <h3>{folder?.name}</h3>
        </span>

        <button
          className={`'waves-effect waves-light btn deep-purple darken-1 col s3 flex_center ${
            folder?.canBeEdited ? '' : 'disabled'
          }`}
          disabled={!folder?.canBeEdited}
          onClick={() => dispatch(setShowModal(true))}>
          {width <= MOBILE_WIDTH ? (
            <i className='large material-icons'>edit</i>
          ) : (
            <span className='flex_center'>
              <i className='large material-icons'>edit</i>
              Редактировать
            </span>
          )}
        </button>
      </div>

      {showModal ? (
        <NameModal
          setFolderName={setNewFolderName}
          folderName={newFolderName || ''}
          placeholder={'New folder name'}
          postFolder={(e) => updateFolder(e!, folder!.id)}
        />
      ) : (
        <></>
      )}

      {!loading && !messages.length ? (
        <div className='row'>
          <h5 className='col s12 center'>Сообщений нет</h5>
        </div>
      ) : (
        <>
          <table className='centered'>
            <thead>
              <tr>
                <th>From</th>
                {!(width <= MOBILE_WIDTH) ? <th>To</th> : <></>}
                <th>Preview</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr
                  className={`${
                    message?.isRead ? null : 'deep-purple lighten-5'
                  }`}
                  key={message.id}>
                  <MessagesInFolder
                    id={message.id}
                    from={message.from}
                    body={message.body}
                    to={message.to}
                    date={message.date}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default FolderInPage
