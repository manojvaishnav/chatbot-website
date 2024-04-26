import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import WebsiteSetting from '../../component/Tab Panel/WebsiteSetting'
import QAPanel from '../../component/Tab Panel/QAPanel'
import WebsiteScraping from '../../component/Tab Panel/WebsiteScraping'
import { useNavigate } from 'react-router-dom'

const Chatbot = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const isLogin = localStorage.getItem('isLoginVerified')

    if (isLogin === 'false' || isLogin == null) {
      navigate('/login')
    }

  }, [])

  return (
    <>
      <Tabs isFitted variant='unstyled' colorScheme='purple' >
        <TabList mb='1em'>
          <Tab _selected={{ color: 'white', bg: 'purple.500' }}>Website Setting</Tab>
          <Tab _selected={{ color: 'white', bg: 'purple.500' }}>QA's</Tab>
          <Tab _selected={{ color: 'white', bg: 'purple.500' }}>Website</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <WebsiteSetting />
          </TabPanel>
          <TabPanel>
            <QAPanel />
          </TabPanel>
          <TabPanel>
            <WebsiteScraping />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Chatbot