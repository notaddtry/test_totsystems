import React from 'react'
import styles from './layout.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={`${styles.footer} page-footer deep-purple darken-1`}>
      <div className='footer-copyright'>
        <div className='container'>© 2022 Copyright Text</div>
      </div>
    </footer>
  )
}

export default Footer
