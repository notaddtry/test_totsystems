import { useWindowWidth } from '@react-hook/window-size'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { IMessage } from '../../types'
import Loader from '../Loader'
import MessagesColumns from '../Message/MessagesColumns'
import MessagesInFolder from '../Message/MessagesInFolder'

const SearchComponent: React.FC = () => {
  const messages = useAppSelector((state) => state.message.messages)
  const loading = useAppSelector((state) => state.message.loading)
  const width = useWindowWidth()

  const MOBILE_WIDTH = 768

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && !messages.length ? (
        <div className='row'>
          <h5 className='col s12 center'>Сообщений нет</h5>
        </div>
      ) : (
        <>
          <MessagesColumns />
          <ul className='collection'>
            {messages.map((message) => (
              <li
                className={`collection-item row center ${
                  message?.isRead ? '' : 'deep-purple lighten-5'
                }`}
                style={{ padding: '10px 0px' }}
                key={message.id}>
                <MessagesInFolder
                  id={message.id}
                  from={message.from}
                  body={message.body}
                  to={message.to}
                  date={message.date}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default SearchComponent
