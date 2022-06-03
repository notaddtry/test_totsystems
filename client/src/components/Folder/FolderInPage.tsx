import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { request } from '../../hooks/http.hook'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { editFolder, setShowModal } from '../../store/slices/folderSlice'
import { IError, IFolder, IMessage } from '../../types'
import NameModal from './NameModal'
import SearchMessages from '../Search/SearchMessages'
import Loader from '../Loader'

const FolderInPage: React.FC = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const location = useLocation()

  const folders = useAppSelector((state) => state.folder.folders)
  const folderToUpdate = folders.find((folder) => folder.id === params.id)

  const [messages, setMessages] = useState<IMessage[]>([])
  const [folder, setFolder] = useState<IFolder>()
  const [loading, setLoading] = useState(false)
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
      dispatch(editFolder({ body: newFolderName, id }))
      dispatch(setShowModal(false))
      M.toast({ html: 'Папка обновлена!' })
    }
  }

  useEffect(() => {
    setError(null)
    setLoading(true)
    fetchData()
  }, [folderToUpdate])

  useEffect(() => {
    M.updateTextFields()
  }, [showModal])

  useEffect(() => {
    return () => {
      dispatch(setShowModal(false))
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
        <h2 className='col s9'>Папка:{folder?.name}</h2>

        <button
          className={`'waves-effect waves-light btn deep-purple darken-1 col s3 ${
            folder?.canBeEdited ? '' : 'disabled'
          }`}
          disabled={!folder?.canBeEdited}
          onClick={() => dispatch(setShowModal(true))}>
          Редактировать
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
          <div className='row  center'>
            <h4 className='col s3'>From</h4>
            <h4 className='col s3'>To</h4>
            <h4 className='col s3'>Preview</h4>
            <h4 className='col s3'>Date</h4>
          </div>
          <ul className='collection'>
            {messages.map((message) => (
              <li
                className={`collection-item row center ${
                  message?.isRead ? '' : 'deep-purple lighten-5'
                }`}
                style={{ padding: '10px 0px' }}
                key={message.id}>
                <Link to={`/message/${message.id}`}>
                  <span className='col s3'>{message.from}</span>
                  <span className='col s3'>{message.to}</span>
                  <span className='col s3'>
                    {message.body.substr(0, 10) + '...'}
                  </span>
                  <span className='col s3'>{message.date}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default FolderInPage
