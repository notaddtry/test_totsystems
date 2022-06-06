import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import useRoutes from './routes'

const App: React.FC = () => {
  const routes = useRoutes()

  return (
    <div className='wrapper'>
      <Router basename='/'>
        <>{routes}</>
      </Router>
    </div>
  )
}

export default App
