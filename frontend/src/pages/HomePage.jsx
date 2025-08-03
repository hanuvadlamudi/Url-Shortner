import React from 'react'
import UrlShortenerUI from '../components/UrlShortenerUI'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 p-4">
    {/* <UrlShortenerUI /> */}
    {/* <LoginForm/> */}
    <RegisterForm/>

  </div>
  )
}

export default HomePage