import React from 'react'
import { Link } from 'react-router-dom'

import { useWindowWidth } from '@react-hook/window-size'

const MOBILE_WIDTH = 768

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
    <Link to={`/message/${id}`}>
      <span className={`col ${width <= MOBILE_WIDTH ? 's4' : 's3'}`}>
        {from}
      </span>
      {!(width <= MOBILE_WIDTH) ? <span className='col s3'>{to}</span> : <></>}

      <span className={`col ${width <= MOBILE_WIDTH ? 's4' : 's3'}`}>
        {body.substr(0, 10) + '...'}
      </span>
      <span className={`col ${width <= MOBILE_WIDTH ? 's4' : 's3'}`}>
        {date}
      </span>
    </Link>
  )
}

export default MessagesInFolder
