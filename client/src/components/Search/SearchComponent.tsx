import { useWindowWidth } from '@react-hook/window-size'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'

import Loader from '../Loader'
import MessagesInFolder from '../Message/MessagesInFolder'
import { MOBILE_WIDTH } from './../helpers/constants'

const SearchComponent: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const width = useWindowWidth()

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
          <table className='centered'>
            <thead>
              <tr>
                <th>From</th>
                {!(width <= MOBILE_WIDTH) ? <th>To</th> : <></>}
                <th>Preview</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr
                  className={`${
                    message?.isRead ? null : 'deep-purple lighten-5'
                  }`}
                  key={message.id}>
                  <MessagesInFolder
                    id={message.id}
                    from={message.from}
                    body={message.body}
                    to={message.to}
                    date={message.date}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default SearchComponent
