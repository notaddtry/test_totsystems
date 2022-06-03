import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import useRoutes from './routes'

function App() {
  const routes = useRoutes()

  return (
    <div className='wrapper'>
      <Router>
        <>{routes}</>
      </Router>
    </div>
  )
}

export default App
