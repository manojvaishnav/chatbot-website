import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './component/Sidebar'
import Homepage from './pages/Homepage/Homepage'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import CodePage from './pages/Code/CodePage'
import Chatbot from './pages/Chatbot/Chatbot'
import ErrorPage from './pages/Error/ErrorPage'
import axios from 'axios'

const App = () => {

  const checkLogin = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user?.token) {
      localStorage.setItem('isLoginVerified', false)
    }
    try {
      const formdata = new FormData()
      formdata.append('token', user.token)

      const { data } = await axios.post('https://chatbot-website.onrender.com/api/v1/auth/verify-token', formdata)

      if (data.success && data.login) {
        localStorage.setItem('isLoginVerified', true)
      }

    } catch (error) {
      localStorage.setItem('isLoginVerified', false)
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Sidebar content={<Dashboard />} />} />
          <Route path='/chatbot' element={<Sidebar content={<Chatbot />} />} />
          <Route path='/code' element={<Sidebar content={<CodePage />} />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App