import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './component/Sidebar'
import Homepage from './pages/Homepage/Homepage'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import CodePage from './pages/Code/CodePage'
import Chatbot from './pages/Chatbot/Chatbot'
import ErrorPage from './pages/Error/ErrorPage'

const App = () => {
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