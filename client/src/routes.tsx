import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomeLayout from './layout/HomeLayout'
import FolderPage from './pages/FolderPage'
import HomePage from './pages/HomePage'
import MessagePage from './pages/MessagePage'
import SearchPage from './pages/SearchPage'
import Undefined from './pages/Undefined'

const useRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route element={<HomePage />} index />
        <Route element={<FolderPage />} path='/folder/:id' />
        <Route element={<MessagePage />} path='/message/:id' />
        <Route element={<SearchPage />} path='/message' />
        <Route path='*' element={<Undefined />} />
      </Route>
    </Routes>
  )
}

export default useRoutes
