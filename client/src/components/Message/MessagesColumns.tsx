import { useWindowWidth } from '@react-hook/window-size'
import React from 'react'

const MOBILE_WIDTH = 768

const MessagesColumns: React.FC = () => {
  const width = useWindowWidth()

  return (
    <div className='row  center'>
      <h4 className={`col ${width <= MOBILE_WIDTH ? 's4' : 's3'}`}>From</h4>
      {!(width <= 728) ? <h4 className='col s3'>To</h4> : <></>}

      <h4 className={`col ${width <= MOBILE_WIDTH ? 's4' : 's3'}`}>Preview</h4>
      <h4 className={`col ${width <= MOBILE_WIDTH ? 's4' : 's3'}`}>Date</h4>
    </div>
  )
}

export default MessagesColumns
