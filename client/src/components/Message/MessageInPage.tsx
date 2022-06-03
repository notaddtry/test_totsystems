import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { request } from '../../hooks/http.hook'
import { useAppSelector } from '../../store/hooks'
import { IMessage } from '../../types'
import Loader from '../Loader'

const Message = () => {
  const params = useParams()
  const [message, setMessage] = useState<IMessage>()
  const [loading, setloading] = useState(false)

  const fetchMessageInfo = async () => {
    const data = await request(`/api/messages/${params.id}`)
    setMessage(data)
    setloading(false)
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
      <h2>Сообщение</h2>
      <div className='row'>
        <span className='col s4'>
          <h5>From: {message?.from}</h5>
        </span>
        <span className='col s4'>
          <h5>To: {message?.to}</h5>
        </span>
        <span className='col s4'>
          <h5>Date: {message?.date}</h5>
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
