import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { request } from '../../hooks/http.hook'
import { IFolder, IMessage } from '../../types'

const Folder = () => {
  const params = useParams()
  const [messages, setMessages] = useState<IMessage[]>([])

  const fetchData = async () => {
    const data = await request(`/api/folders/${params.id}`)
    setMessages(data.messagesInFolder)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!messages.length) {
    return <span>Сообщений нет</span>
  }

  return (
    <ul className='collection'>
      {messages.map((message) => (
        <li className='collection-item' key={message.id}>
          <Link to={`/message/${message.id}`}>{message.body}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Folder
