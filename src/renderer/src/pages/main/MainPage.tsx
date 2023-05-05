import React from 'react'
import { Navigate } from 'react-router-dom'

const MainPage: React.FC = () => {
  return <Navigate to="/auth/login" />

  return <div>MainPage</div>
}

export default MainPage
