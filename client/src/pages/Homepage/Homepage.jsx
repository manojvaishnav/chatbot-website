import { VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Hero from '../../component/Homepage/Hero'
import Navbar from '../../component/Navbar'
import Hero2 from '../../component/Homepage/Hero2'
import Footer from '../../component/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Homepage = () => {
  const navigate = useNavigate()

  const check = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user?.token) {
      navigate('/')
    }
    try {
      const formdata = new FormData()
      formdata.append('token', user.token)

      const { data } = await axios.post('/auth/verify-token', formdata)

      if (data.success && data.login) {
        navigate('/dashboard')
      }

    } catch (error) {
      navigate('/')
    }
  }

  useEffect(() => {
    check()
  }, [])
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