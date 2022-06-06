import React from 'react'
import { Outlet } from 'react-router'

import Footer from './Footer'
import Header from './Header'

const HomeLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className='container'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default HomeLayout
