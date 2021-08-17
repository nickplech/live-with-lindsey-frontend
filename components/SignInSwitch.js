import { useUser } from './User'
import LoginRemix from './LoginRemix'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import TwoFacAuth from './TwoFacAuth'
const NeedToAuthenticate = styled.div`
  color: white;
  text-align: center;
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 150px;
  align-items: center;
  overflow-x: hidden;
  padding: 75px 15px;
  h1 {
    z-index: 1000;
    text-align: center;
    font-family: 'Bison';
    letter-spacing: 3px;
    position: absolute;
    font-size: 38px;
    line-height: 36px;
    margin: 0 auto;
    @media (max-width: 992px) {
      font-size: 28px;
    }
    @media (max-width: 768px) {
      font-size: 22px;
    }
  }
`
const EmptyFoo = styled.div`
  background-color: white;
  height: calc(100% - 60px);
  width: 100%;


  justify-content: center;
  align-items: center;
  margin: 0;




  z-index: 1000;

img {
  margin-top: 10px;
}
`
const Div = styled.div`
  width: 100%;
  height: 350px;
  margin: 0 auto;
display: flex;
flex-flow: column;
justify-content: center;
align-items: center;
font-family: 'Bison';

 transform: translateY(30px);
`
const P = styled.p`
  color: slategray;
margin: 0px auto;
  text-align: center;
margin-bottom: 8px;
  width: 90%;


  line-height: 26px;
   font-size: 28px;
   color: ${props => props.theme.second};
   letter-spacing: 5px;
       @media(max-width: 662px) {
      font-size: 22px;
    }
  &:nth-of-type(2) {
      width: 90%;
    max-width: 500px;
     font-size: 18px;
     color: slategray;
     cursor: pointer;
     letter-spacing: 3px;
    @media(max-width: 662px) {
      font-size: 14px;
    }
  }
`
const SignInSwitch = ({children}) => {

  const me = useUser()

   const allClear = me && me.hasPassedTwoFac === true
   if(allClear) return children
  if (!allClear && me)
return <TwoFacAuth userId={me && me.id}/>



if(!me) return (
  <LoginRemix/>
    )

}

export default SignInSwitch
