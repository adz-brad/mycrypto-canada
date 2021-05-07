import React from 'react'
import { Header, PageWrapper } from './components'
import Navbar from '../../components/navigation/navbar'


function Layout({ children, pageContext: { page } }) {
    return (

      <React.Fragment>

        <Header>
          <Navbar/>
        </Header>

        <PageWrapper>
          {children}
        </PageWrapper>

      </React.Fragment>
      
    )
  }
  
  export default Layout