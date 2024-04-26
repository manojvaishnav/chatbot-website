import { VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Hero from '../../component/Homepage/Hero'
import Navbar from '../../component/Navbar'
import Hero2 from '../../component/Homepage/Hero2'
import Footer from '../../component/Footer'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLogin = localStorage.getItem('isLoginVerified')
    const isUser = localStorage.getItem('user')

    if (isLogin === 'true' && isUser != null) {
      navigate('/dashboard')
    }
  })

  return (
    <>
      <VStack w={'full'}>
        <Navbar />
        <Hero />
        <Hero2 />
        <Footer />
      </VStack>
    </>
  )
}

export default Homepage