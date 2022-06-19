import React from 'react'
import { Link } from 'react-router-dom'

import { useWindowWidth } from '@react-hook/window-size'
import { MOBILE_WIDTH } from './../helpers/constants'

interface IMessagesInFolder {
  id: string
  from: string
  body: string
  to: string
  date: string
}

const MessagesInFolder: React.FC<IMessagesInFolder> = ({
  id,
  from,
  body,
  to,
  date,
}) => {
  const width = useWindowWidth()

  return (
    <>
      <td className={`col ${width <= MOBILE_WIDTH ? 's4' : 's3'}`}>
        <Link to={`/message/${id}`}>{from}</Link>
      </td>
      {!(width <= MOBILE_WIDTH) ? (
        <td className='col s3'>
          <Link to={`/message/${id}`}>{to}</Link>
        </td>
      ) : (
        <></>
      )}

      <td className={`col ${width <= MOBILE_WIDTH ? 's4' : 's3'}`}>
        <Link to={`/message/${id}`}>{body.substr(0, 10) + '...'}</Link>
      </td>
      <td className={`col ${width <= MOBILE_WIDTH ? 's4' : 's3'}`}>
        <Link to={`/message/${id}`}>{date}</Link>
      </td>
    </>
  )
}

export default MessagesInFolder
