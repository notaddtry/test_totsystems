import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { request } from '../../hooks/http.hook'
import { useAppSelector } from '../../store/hooks'
import { IMessage } from '../../types'
import Loader from '../Loader'

const Message = () => {
  const params = useParams()
  const [message, setMessage] = useState<IMessage>()
  const [loading, setloading] = useState(false)
  const [marked, setMarked] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const fetchMessageInfo = async () => {
    const data = await request(`/api/messages/${params.id}`)
    setMessage(data)
    setMarked(data.isMarked)
    setFavorite(data.isFavorite)
    setloading(false)
  }

  const clickMarkHandler = async () => {
    const data = await request(`/api/messages/${params.id}/mark`, 'PUT')

    setMarked(data.isMarked)

    M.toast({
      html: `${data.isMarked ? 'Сообщение отмечено' : 'Отметка удалена'}`,
    })
  }

  const clickFavoriteHandler = async () => {
    const data = await request(`/api/messages/${params.id}/favorite`, 'PUT')

    setFavorite(data.isFavorite)

    M.toast({
      html: `${
        data.isFavorite ? 'Добавлено в избранное' : 'Удалено из избранного'
      }`,
    })
  }

  useEffect(() => {
    setloading(true)
    fetchMessageInfo()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div className='row'>
        <h2>Сообщение</h2>
        <i
          onClick={clickMarkHandler}
          className={`medium material-icons cursor ${
            marked ? 'red-text' : ''
          }`}>
          bookmark_border
        </i>
        <i
          onClick={clickFavoriteHandler}
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
