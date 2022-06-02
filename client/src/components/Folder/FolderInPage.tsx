import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { request } from '../../hooks/http.hook'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { editFolder, setShowModal } from '../../store/slices/folderSlice'
import { IError, IFolder, IMessage } from '../../types'
import NameModal from './NameModal'
import SearchMessages from './SearchMessages'

const Folder = () => {
  const params = useParams()

  const folders = useAppSelector((state) => state.folder.folders)
  const folderToUpdate = folders.find((folder) => folder.id === params.id)

  const dispatch = useAppDispatch()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [folder, setFolder] = useState<IFolder>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<IError>()

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
      // setNewFolderName('')
      dispatch(editFolder({ body: newFolderName, id }))
      dispatch(setShowModal(false))
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [folderToUpdate])

  useEffect(() => {
    M.updateTextFields()
  }, [showModal])

  if (loading) {
    return <span>Загрузка...</span>
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
          <div className='row  center '>
            <h5 className='col s4'>From</h5>
            <h5 className='col s4'>To</h5>
            <h5 className='col s4'>Preview</h5>
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
                  <span className='col s4 '>{message.from}</span>
                  <span className='col s4'>{message.to}</span>
                  <span className='col s4'>
                    {message.body.substr(0, 10) + '...'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default Folder
