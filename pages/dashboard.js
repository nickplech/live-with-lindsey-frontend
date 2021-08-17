import React from 'react'
import PleaseSignIn from '../components/PleaseSignIn'
import Footer from '../components/Footer'
import DashboardComponent from '../components/DashboardComponent'
import DashMobile from '../components/DashMobile'
import styled from 'styled-components'

const Desktop = styled.div`
  display: none;
  @media (min-width: 992px) {
    display: block;
    width: 100%;
  }
`
const Mobile = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
  @media (min-width: 992px) {
    display: none;
  }
`
const dashboard = () => {
  return (
    <PleaseSignIn>
      {(me) => (
        <>
          <Desktop>
            <DashboardComponent me={me} />
          </Desktop>
          <Mobile>
            <DashMobile me={me} />
          </Mobile>
          <Footer />
        </>
      )}
    </PleaseSignIn>
  )
}

export default dashboard
