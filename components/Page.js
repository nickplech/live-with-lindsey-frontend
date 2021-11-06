import React, { useEffect } from 'react'
import { useUserSocket } from './contexts/SignedInSocket'

import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Header from './Header'
import Meta from './Meta'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useToast } from './contexts/LocalState'
const theme = {
  red: '#FF0000',
  blue: 'rgba(100,100,230,1)',
  green: 'rgba(50,230,150,1)',
  lightblue: 'rgba(100,160,250,1)',
  primary: '#ffd7d4',
  second: '#f8b0b0',
  third: '#3b543b',
  fourth: '#6b996b',
  black: 'rgba(0,0,0,1)',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '100vw',
  innerWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0,0,0,0.09)',
}



const GlobalStyle = createGlobalStyle`

	html {
		box-sizing: border-box;
		font-size: 10px;
overscroll-behavior: none;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}
	body {
		padding: 0;
		margin: 0;
		font-size: 1.4rem;
		line-height: 2;
		font-family: 'Bison';
  
	}
a {
text-decoration: none;
color: ${theme.black};
}


`
const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.black};
`

const Inner = styled.div`
  margin: 0 auto;
  padding: 0;
`

const StyledContainer = styled(ToastContainer).attrs({
  // custom props
})`
 z-index: 99999;
  .Toastify__toast-container {}
  .Toastify__toast {
    background: ${props => props.theme.offWhite};
    color: slategrey;
    font-family: 'Bison';
    border: 1px solid rgba(20,20,20,.5);
    letter-spacing: 2px;
  }
  .Toastify__toast--error {}
  .Toastify__toast--warning {}
  .Toastify__toast--success {}
  .Toastify__toast-body {}
  .Toastify__progress-bar {
    background: ${props => props.theme.second};
  }
`;
export default function Page({ children }) {
  const userSocket = useUserSocket()
 
  const {updateStatus} = useToast()

  useEffect(() => {
    if (userSocket == null) return
    userSocket.on('updateActiveStatus', ({classId, theName, status}) => {
      if (status === 'GOING LIVE') { 
        toast(`${theName} has been set to STANDBY, class will resume momentarily`)
      }
      if (status === 'LIVE') { 
        toast(` ${theName} is now ${status}!`)
      }
      if (status === 'COMPLETE') {
        toast(`${theName} is no longer live. A recording will be available On-Demand momentarily`)
      }
      updateStatus(classId, status)
    
    })
    return () => userSocket.off('updateActiveStatus')
  }, [userSocket])


    return (
    <>
      <GlobalStyle/>
      <ThemeProvider theme={theme}>
       <StyledPage>
        <StyledContainer
          position="top-right"
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
          <Meta />
          <Header />
          <Inner>{children}</Inner>
     
  </StyledPage>
 </ThemeProvider>
 </>
    )
  }
