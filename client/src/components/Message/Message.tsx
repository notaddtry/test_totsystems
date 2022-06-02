import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { request } from '../../hooks/http.hook'
import { IMessage } from '../../types'

const Message = () => {
  const params = useParams()
  const [message, setMessage] = useState<IMessage>()

  const fetchMessageInfo = async () => {
    const data = await request(`/api/messages/${params.id}`)
    setMessage(data)
  }

  useEffect(() => {
    fetchMessageInfo()
  }, [])

  return (
    <div>
      {message?.from}
      <br />
      {message?.to}
      <br />
      {message?.body}
    </div>
  )
}

export default Message