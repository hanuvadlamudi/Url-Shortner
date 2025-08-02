import React from 'react'
import UrlShortenerUI from '../components/UrlShortenerUI'
import LoginForm from '../components/LoginForm'

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 p-4">
    {/* <UrlShortenerUI /> */}
    <LoginForm/>
  </div>
  )
}

export default HomePage