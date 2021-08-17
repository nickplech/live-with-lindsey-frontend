import React, { useState } from 'react'
import Link from 'next/link'
import OtpInput from 'react-otp-input'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import Error from './ErrorMessage'

const TWO_FACTOR_MUTATION = gql`
  mutation TWO_FACTOR_MUTATION($id: ID!) {
    twoFactorAuth(id: $id) {
      message
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
height: 50px;
width: 50px;
`
const MobileScreenShareIcon = styled.img`
height: 50px;
width: 50px;
`
const Div = styled.div`
  width: 100%;

  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
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
const P = styled.p`
  color: slategray;

  text-align: center;
  border: 3px solid ${(props) => props.theme.second};
  padding: 5px 15px;

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
  align-items: center;
  margin: 0 auto;
  transform: translateY(50px);
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
    border: 2px solid #f8b0b0;
    background: transparent;
    color: #f8b0b0;
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }
`

const TwoFacAuth = ({ id, userId }) => {
  const [message, setMessage ] = useState('')
  const [ui, setUi] = useState(false)
  const [tfa, setTfa] = useState('')
  console.log(tfa)

  const theId = id ? id : userId
  const [twoFactorAuth, { error }] = useMutation(TWO_FACTOR_MUTATION, {
    variables: { id: theId },
  })

  const [twoFactorAuthCheck, { loading }] = useMutation(
    TWO_FACTOR_CHECK_MUTATION,
    { variables: { twoFac: tfa.toString(), id: theId } },
  )

  function updateTfa(e) {
    const number = e.target.value

    setTfa(number)
  }

  async function handleSubmitTfa(e) {
    e.preventDefault()

    console.log(tfa.toString(), theId)
    await twoFactorAuthCheck()
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
        <Wrap>
          <EmptyFoo>
            <Div>
              <h1>One Last Step!</h1>
              <p>
                Upon clicking the button below, you will be sent a text message
                (standard carrier rates apply). Simply{' '}
                <span>
                  enter the five digit one-time passcode in the box that appears
                </span>
                , submit and you'll be on your way!
              </p>
              <img
                height="75"
                src="../static/img/plane.svg"
                alt="airplane sms"
              />
              <P onClick={sendTextMsg}>Send Authentication Text</P>
            </Div>
          </EmptyFoo>
          {ui === true && (
            <EntryUi>
              <div className="main">
                <h3>Welcome, {twoFactorAuth.message}</h3>

                <h4>
                  <Icon src='../static/img/lock-closed.svg' />
                  Let's keep your account secure
                </h4>

                <MobileScreenShareIcon className="phone" />

                <h6>Enter the code we sent to 502-399-3121</h6>

                <OtpInput
                  value={tfa}
                  onChange={(tfa) => {
                    console.info(tfa)
                    updateTfa(tfa)
                  }}
                  numInputs={6}
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
                  isInputNum
                />
                <a
                  disabled={tfa.length !== 5 || loading}
                  onClick={handleSubmitTfa}
                >
                  Authenticate
                </a>
                <p>
                  Didn't get a code ? &nbsp;
                
                    <a>Send Again</a>
                
                </p>

                <p>Wrong number ? &nbsp;</p>
               
                  <a>Update here</a>
            
              </div>
              <></>
            </EntryUi>
          )}
        </Wrap>
      ) : null}
    </>
  )
}

export default TwoFacAuth
