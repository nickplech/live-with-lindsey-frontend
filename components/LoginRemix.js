import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'
import Link from 'next/link'
import styled from 'styled-components'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      item {
        id
        email
        firstName
        lastName
        hasPassedTwoFac
      }
    }
  }
`
const Grid = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  grid-template-rows: 1fr 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 60% 40%;
    grid-template-rows: 1fr;
  }
  .left {
    grid-column: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../static/img/loginbackground.jpg') no-repeat center center;
    background-size: cover;
    font-family: 'Bison';
    letter-spacing: 2px;
    font-size: 20px;
    @media (min-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: 300px 1fr;
      letter-spacing: 3px;
      font-size: 25px;
    }
  }
  .p {
    color: rgba(30, 30, 30);
    position: absolute;
    transform: translateY(-280%);
    @media (min-width: 562px) {
      transform: translateY(-360%);
    }
    @media (min-width: 768px) {
      transform: translateY(-460%);
    }
  }
  .right {
    grid-column: 1;
    grid-row: 2;
    box-shadow: -10px 20px 24px 2px rgba(0, 0, 0, 0.2),
      -10px 20px 10px 5px rgba(0, 0, 0, 0.1),
      -10px 20px 10px -5px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(30, 30, 30);
    @media (min-width: 768px) {
      grid-row: 1;
      grid-column: 2;
    }
  }
  .bottom {
    display: grid;
    grid-column: 1/3;
    grid-row: 2;
    position: relative;
    width: 100%;
    height: 100%;
  }
`
const StyledP = styled.p`
  margin-bottom: 0;
  color: white;
  margin-top: 20px;
  font-family: 'Comfortaa';
  cursor: pointer;
  transition: 300ms;
  &:hover {
    transform: translateX(5px);
  }
`

const Form2 = styled.form`
  background: transparent;
  padding: 5px;
  margin: 20px;
  margin-top: 0px;
  font-size: 1.5rem;
 
  font-weight: 600;
  position: relative;
  @media (min-width: 768px) {
    padding: 20px;
  }
  h2 {
    font-family: 'Bison thickoutline';
    margin: 0;
    margin-bottom: 5px;
    font-size: 30px;
    
    color: ${(props) => props.theme.primary};
  
    @media (min-width: 768px) {
      font-size: 44px;
      line-height: 44px;
      margin-bottom: 20px;
    }
  }
  input,
  select {
    width: 90%;
    /* margin: 10px; */
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
    margin-bottom: 20px;
    font-family: 'Comfortaa';
    background: transparent;
    border: 3px solid rgba(255, 255, 255, 0.7);
    border-radius: 7px;
    color: white;
    &:focus {
      outline: 0;
    }
    @media (min-width: 321px) {
      padding-top: 0.7rem;
      padding-bottom: 0.7rem;
    }
    @media (min-width: 768px) {
      width: 100%;
      margin-bottom: 30px;
    }
  }
  button,
  input[type='submit'] {
    position: relative;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    color: ${(props) => props.theme.second};
    z-index: 5;
    cursor: pointer;
    padding: 7px 10px 7px 10px;
    margin: 0 0px;
    border: 2px solid ${(props) => props.theme.second};
    border-radius: 5px;
    transition: 0.3s;
    &:hover,
    &:focus {
      outline: none;
      background: ${(props) => props.theme.second};
      color: white;
    }
  }
`
function LoginRemix(props) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  })
  const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  return (
    <Grid>
      <div className="left">
        <p className="p">stay home.stay fit.stay happy.</p>
      </div>
      <div className="right">
        <Form2
          method="post"
          onSubmit={async (e) => {
            e.preventDefault()
            const res = await signin()
            console.log(res)
            // var socket = await io()
            // socket.on(
            //   'msg',
            //   function (message) {
            //     console.log(message)
            //   },
            //   function (err) {
            //     console.error(err)
            //     throw new Error(err)
            //   },
            // )
            resetForm()
          }}
        >
          <h2>Sign Into Your Account</h2>
          <Error error={error} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button type="submit">Sign In!</button>
          <Link href="/resetrequest">
            <StyledP>Forget Your Password?</StyledP>
          </Link>
        </Form2>
      </div>
    </Grid>
  )
}

export default LoginRemix
