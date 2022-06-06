import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { request } from '../helpers/http'
import { IError, IMessage } from '../../types'

import Loader from '../Loader'

const Message: React.FC = () => {
  const params = useParams()
  const [message, setMessage] = useState<IMessage>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<IError | null>(null)
  const [marked, setMarked] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const fetchMessageInfo = async () => {
    try {
      if (error) setError(null)
      const data: IMessage = await request(`/api/messages/${params.id}`)
      setMessage(data)
      setMarked(data.isMarked)
      setFavorite(data.isFavorite)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError({ message: 'Ошибка,повторите позже' })
    }
  }

  const clickHandler = async (options: string) => {
    try {
      const data = await request(`/api/messages/${params.id}/${options}`, 'PUT')

      if (options === 'favorite') {
        setFavorite(data.isFavorite)
      } else {
        setMarked(data.isMarked)
      }

      M.toast({
        html: `
        ${
          options === 'favorite'
            ? data.isFavorite
              ? 'Добавлено в избранное'
              : 'Удалено из избранного'
            : data.isMarked
            ? 'Сообщение отмечено'
            : 'Отметка удалена'
        }
        `,
      })
    } catch {
      M.toast({
        html: `Ошибка. Попробуйте позже`,
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchMessageInfo()
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <h6>{error.message}</h6>
  }

  return (
    <>
      <div className='row'>
        <h2>Сообщение</h2>
        <i
          onClick={() => clickHandler('mark')}
          className={`medium material-icons cursor ${
            marked ? 'red-text' : ''
          }`}>
          bookmark_border
        </i>
        <i
          onClick={() => clickHandler('favorite')}
          className={`medium material-icons cursor ${
            favorite ? 'deep-purple-text darken-1' : ''
          }`}>
          favorite_border
        </i>
      </div>
      <div className='row'>
        <span className='col s4'>
          <h4>From:</h4>
          <h6>{message?.from}</h6>
        </span>
        <span className='col s4'>
          <h4>To:</h4>
          <h6>{message?.to}</h6>
        </span>
        <span className='col s4'>
          <h4>Date:</h4>
          <h6>{message?.date}</h6>
        </span>
        <br />
        <br />
        <span className='col s12'>
          <h6>{message?.body}</h6>
        </span>
      </div>
    </>
  )
}

export default Message
