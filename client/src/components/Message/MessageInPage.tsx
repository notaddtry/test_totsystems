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

      <table className='centered'>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{message?.from}</td>
            <td>{message?.to}</td>
            <td>{message?.date}</td>
          </tr>
        </tbody>
      </table>
      <p>{message?.body}</p>
    </>
  )
}

export default Message
