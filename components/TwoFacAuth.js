import React, { useState } from 'react'
import Link from 'next/link'
import {toast} from 'react-toastify'
import OtpInput from 'react-otp-input'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import Error from './ErrorMessage'
 

const TWO_FACTOR_MUTATION = gql`
  mutation TWO_FACTOR_MUTATION($id: ID!) {
    twoFactorAuth(id: $id) {
      id
      firstName
      cellPhone
    }
  }
`

const TWO_FACTOR_CHECK_MUTATION = gql`
  mutation TWO_FACTOR_MUTATION($twoFac: String, $id: ID!) {
    twoFactorAuthCheck(twoFac: $twoFac, id: $id) {
      message
    }
  }
`

const Wrap = styled.div`
  color: white;
  text-align: center;
  display: flex;
  position: relative;
  flex-flow: column;
  justify-content: center;
  margin-top: 0px;
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
      font-size: 32px;
    }
    @media (max-width: 768px) {
      font-size: 32px;
    }
  }
  .m-logo {
    display: block;
    width: 1600px;
    /* max-width: 300px;
    min-width: 100px; */
    height: 150px;
    margin: 0 auto;
    position: absolute;
  }
  a {
    color: ${(props) => props.theme.third};
    padding-bottom: 3px;
    border-bottom: 3px solid white;
  }
  .authButton {
    background: #f8b0b0;
    color: white;
    border-radius: 5px;
    padding: 2px 6px;
    letter-spacing: 2px;
    font-size: 18px;
    border: none;
    cursor: pointer;
    transition: .3s;
&:hover {
  transform: scale(1.06);
  box-shadow: 0 8px 7px -3px rgba(0,0,0,.2);
}
  }
`
const EmptyFoo = styled.div`
  background-color: white;
  border-radius: 5px;
  font-size: 15px;

  justify-content: center;
  align-items: center;
  margin: 0;

  z-index: 1000;

  img {
    margin-top: 10px;
  }
`
const Icon = styled.img`
height: 40px;
width: 40px;
margin-bottom: 20px;
`

const Div = styled.div`
  width: 100%;

  margin: 0 auto;
  display: flex;
  flex-flow: column;
  /* justify-content: center; */
  align-items: center;
  font-family: 'Bison';
  h1 {
    font-family: 'Bison';
    color: ${(props) => props.theme.second};
    transform: translateY(-5px);
    position: relative;
  }
  p {
    color: slategrey;
    font-size: 18px;
    max-width: 500px;
    line-height: 20px;
    letter-spacing: 2px;
  }
  span {
    color: ${(props) => props.theme.second};
  }
`
const P = styled.button`
 

  text-align: center;
  border: 3px solid ${(props) => props.theme.second};
  padding: 5px 15px;
font-family: 'Bison';
  transition: 0.3s;
  font-size: 20px;
  color: white;
  background-color: ${(props) => props.theme.second};
  letter-spacing: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 4px -4px rgba(20, 20, 20, 0.2);
  }
`
const EntryUi = styled.form`
  display: flex;
  justify-content: space-evenly;
  flex-flow: column;
  align-items: center;
  margin: 0 auto;
  transform: translateY(0px);
  input {
    height: 40px;
    margin: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    font-family: 'Bison';
    font-size: 18px;
    width: 200px;
    border: 3px solid grey;
    text-align: center;
    letter-spacing: 5px;
    padding: 5px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
  a {
  
    background: transparent;
    color: #f8b0b0;
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }
  h6 {
    color: slategray;
    font-size: 17px;
    margin: 0;
  }
  p {
    color: slategray;
    font-size: 22px;
  }
`
 
const Flexy = styled.div`
display: flex;
flex-flow: row;
width: 350px;
margin: 0 auto;
color: slategray;
height: 100px;
justify-content: center;
align-items: center;
p {
  margin: 0 5px;
  font-size: 18px;
}
a {
  padding: 3px 6px;
  border-radius: 5px;
  background: #f8b0b0;
  color: white;
}
div {
  margin: 0 15px;
}
`
 
const TwoFacAuth = ({ id, userId }) => {
  const [message, setMessage ] = useState('')
  const [ui, setUi] = useState(false)
  const [tfa, setTfa] = useState('')
  console.log(tfa)

  const theId = id ? id : userId
  const [twoFactorAuth, {data, loading }] = useMutation(TWO_FACTOR_MUTATION, {
    variables: { id: theId },
  })

  const [twoFactorAuthCheck, {  error }] = useMutation(
    TWO_FACTOR_CHECK_MUTATION,
    { variables: { twoFac: tfa.toString(), id: theId } },
  )

  function updateTfa(tfa) {
 

    setTfa(tfa)
  }

  async function handleSubmitTfa(e) {
    e.preventDefault()

    console.log(tfa.toString(), theId)
    await twoFactorAuthCheck()
    if(error) {
  toast(error)
 
}
  }

  async function sendTextMsg() {
    const res = await twoFactorAuth()
    if (error) return <Error error={error} />
    await setMessage(res.data.message)
    await setUi(true)
  }

  
  return (
    <>
  
      {userId || id ? (
         <Wrap> <Div><Icon src='../static/img/lock-closed.svg' />
                     <h1>
                 
                  Let's keep your account secure
                </h1></Div>
               {error && <Error error={error} /> }
       { ui === true ?  <EntryUi>
          
       
        <OtpInput
          value={tfa}
          onChange={updateTfa}
          numInputs={5}
          inputStyle={{
            fontSize: '24px',
            width: '36px',
            height: '36px',
            margin: '4px',
            borderTop: '0px',
            borderLeft: '0px',
            borderRight: '0px',
            outline: 'none',
            borderColor: '#000a46',
          }}
          Style={{
            margin: '20px auto',
            padding: '10px',
          }}
        
        />
         <h6>Enter the code sent to Phone Number {data?.twoFactorAuth?.cellPhone}</h6>

        {ui && <a className="authButton"
          disabled={tfa.length !== 5 || loading}
          onClick={handleSubmitTfa}
        >
          Submit Code to Verify! 
        </a>}
        <Flexy>
          <div>
        <p>
          Didn't get a code ? &nbsp;
           </p>

            <a onClick={sendTextMsg}>Send Again</a>
        </div>
     {/* <div>
        <p>Wrong number ? &nbsp;</p>
       
          <a onClick={updatePhoneNumber}>Update here</a>
    </div> */}
    </Flexy>
    </EntryUi> : 
          <EmptyFoo>
            <Div> 
              <p>
                Click below to send yourself a text message containing an Authentication Code
                (standard carrier rates apply)
               
                
              </p>  
           
              <P onClick={sendTextMsg}>Send Authentication Text</P>
            </Div>
          </EmptyFoo>
    }
      </Wrap>
      ) : null}  
    </>
  )
}

export default TwoFacAuth
