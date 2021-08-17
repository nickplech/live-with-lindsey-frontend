import React from 'react'
import Router from 'next/router'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import { CURRENT_USER_QUERY, useUser } from './User'
import { ADD_TO_CART_MUTATION } from './AddToCart'

const Box = styled.div`
  background-color: transparent;
  align-self: center;
  justify-self: center;
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content: center;
  align-items: center;
  z-index: 15000;
  transform: translate(0px, 130px);
  .btn {
    border-radius: 5px;
    background-color: transparent;
    font-family: 'Bison';
    color: ${(props) => props.theme.second};
    font-size: 18px;
    letter-spacing: 3px;
    text-align: center;
    padding: 0 8px;
    line-height: 33px;
    /* grid-column: 1; */
    border: 2px solid ${(props) => props.theme.second};
    min-width: 130px;
    margin: 0 auto;
    transition: 0.3s;
    text-decoration: none;
    z-index: 9001;
    cursor: pointer;
  }
  .one {
    color: ${(props) => props.theme.second};
    grid-column: 1;
  }
  .pay {
    grid-column: 1/3;
    color: ${(props) => props.theme.second};
    &:hover {
      background: ${(props) => props.theme.second};
      color: white;
    }
  }
`
const AlreadyHaveIt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  color: white;
  font-family: 'Bison';
  transform: translateY(80px);
`

const NotLoggedIn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  color: white;
  z-index: 90000;
  font-family: 'Bison';
  transform: translateY(130px);
  .btn {
    border-radius: 5px;
    background-color: transparent;
    font-family: 'Bison';
    color: ${(props) => props.theme.second};
    font-size: 18px;
    letter-spacing: 3px;
    text-align: center;
    padding: 0 8px;
    z-index: 90000;
    position: relative;
    line-height: 33px;
    border: 2px solid ${(props) => props.theme.second};
    min-width: 130px;
    margin: 0 10px;
    transition: 0.3s;
    text-decoration: none;
    cursor: pointer;
  }
  .pay {
    grid-column: 1/3;
    color: ${(props) => props.theme.second};
    &:hover {
      background: ${(props) => props.theme.second};
      color: white;
    }
  }
`
const VideoSignUp = ({ date, classId, owner }) => {
  const me = useUser()
  const [addToCart, { error }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id: classId },
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY,
      },
    ],
  })
  console.log(owner)
  const signUpOnClick = () => {
    Router.push({
      pathname: '/signup',
    })
  }
  const login = () => {
    Router.push({
      pathname: '/login',
    })
  }
  const handlePurchaseButton = async () => {
    await addToCart()
    Router.push({
      pathname: '/checkout',
      query: { id: classId },
    })
  }
  const displayMe = owner === true ? 'flex' : 'none'
  const displayOther = owner === false ? 'flex' : 'none'
  return owner === false && !me ? (
    <NotLoggedIn>
      <a onClick={signUpOnClick} className="btn pay">
        Click to Sign Up!
      </a>
      <a onClick={login} className="btn pay">
        Log In
      </a>
    </NotLoggedIn>
  ) : (
    <>
      <AlreadyHaveIt style={{ display: displayMe }} />
      <Box style={{ display: displayOther }}>
        <a onClick={handlePurchaseButton} className="btn pay">
          Add to Cart + Checkout!
        </a>
      </Box>
    </>
  )
}

export default VideoSignUp
