import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { IMessage } from '../../types'
import Loader from '../Loader'

const SearchComponent: React.FC = () => {
  const messages = useAppSelector((state) => state.message.messages)
  const loading = useAppSelector((state) => state.message.loading)

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
          <div className='row  center'>
            <h4 className='col s3'>From</h4>
            <h4 className='col s3'>To</h4>
            <h4 className='col s3'>Preview</h4>
            <h4 className='col s3'>Date</h4>
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
                  <span className='col s3'>{message.from}</span>
                  <span className='col s3'>{message.to}</span>
                  <span className='col s3'>
                    {message.body.substr(0, 10) + '...'}
                  </span>
                  <span className='col s3'>{message.date}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default SearchComponent
