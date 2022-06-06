import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'

import Loader from '../Loader'
import MessagesColumns from '../Message/MessagesColumns'
import MessagesInFolder from '../Message/MessagesInFolder'

const SearchComponent: React.FC = () => {
  const [loading, setLoading] = useState(true)

  const messages = useAppSelector((state) => state.message.messages)
  const loadingFromStore = useAppSelector((state) => state.message.loading)
  const error = useAppSelector((state) => state.message.error)

  useEffect(() => {
    setLoading(loadingFromStore)
  }, [loadingFromStore])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <h6>Ошибка загрузки...</h6>
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
