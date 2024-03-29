import React, {useState} from 'react'
import gql from 'graphql-tag'
import Router from 'next/router'
import { useMutation } from '@apollo/client'

import { useUser, CURRENT_USER_QUERY } from './User'

import styled, { keyframes } from 'styled-components'
const loader = keyframes`
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
  opacity: 100%;
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
      opacity: 0;
    }
`
const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity

    }
  }
`

const Button1 = styled.div`
  border-radius: 50%;
  box-shadow: 0px 4px 8px -4px rgba(20, 20, 20, 0.4);
  border: 3px solid white;
  height: 60px;
  width: 60px;
  position: absolute;
  z-index: 1000;
  cursor: pointer;
  margin: 10px;
  align-self: flex-start;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  transition: 0.2s;
background: ${(props) => props.theme.fourth};
  &:hover {


  }
img {
  display: flex;
margin-left: -3px;
}

`
const Pic = styled.div`
 z-index: 2000;
  position: absolute;
  max-width: 600px;
  width: 90%;
  height: 400px;
  background: transparent;
.ribbon {
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: absolute;
}
.ribbon::before,
.ribbon::after {
  position: absolute;
  z-index: -1;
  content: '';
  display: block;
  border: 5px solid ${(props) => props.theme.second};
}
.ribbon span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 15px 0;
  background-color: ${(props) => props.theme.second};
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
  color: #fff;
  letter-spacing: 3px;
  font: 700 22px/1 'Bison';
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  text-transform: uppercase;
  text-align: center;
}
.ribbon-top-left {
  top: -10px;
  left: -10px;
&:before{
  top: 0px;
  right: 0;
  border-top-color: transparent;
  border-left-color: transparent;
}

&:after {
  bottom: 0;
  left: 0;  border-top-color: transparent;
  border-left-color: transparent;
}}
  span {
  right: -25px;
  top: 30px;
  transform: rotate(-45deg);
}
`
const Button2 = styled.div`
  border-radius: 50%;
  box-shadow: 0px 4px 8px -4px rgba(20, 20, 20, 0.4);
  /* border: 3px solid white; */
  height: 60px;
  width: 60px;
  position: absolute;
  z-index: 1000;

  margin: 10px;
  align-self: flex-start;
  cursor: pointer;
border: none;
padding: 2px;
  font-size: 12px;
  transition: 0.3s;
background: white;

  &:hover {
  transform: scale(1.05);
  }
img {
  background: white;
  border-radius: 50%;
}
.spin {
  animation: ${loader} 1s linear infinite;

}

`

function AddToCart({id,user}) {
const me = useUser()
  const [spin, setSpin] = useState(false)
  const handleSetSpin = () => {
      setSpin(true)
  const timer = setTimeout(() => {

    setSpin(false)
    }, 1000)
    return () => clearTimeout(timer)

  }
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id: id },
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY,
      },
    ],
  })
const proceedToCheckout = async () => {
    Router.push({
      pathname: '/checkout',
    })
  }

  const clickHandle = async () => {

    handleSetSpin()
    await addToCart()

  }
  const itemOwned = user.find((theUser) => {
    return theUser.id === me.id
  })
  const cart = me && me.cart.map((cartItem) => {
             
    return cartItem && cartItem.item.id 
   })
const itemInCart = cart.includes(id)
 
 if (itemOwned) return (
   <Pic pic="../static/img/check.svg">
            <div  className="ribbon ribbon-top-left" ><span>Enrolled</span></div>
          </Pic>
  )

  if(itemInCart) return (
<Button1 type="button"      title="Proceed to Checkout"  onClick={proceedToCheckout} >
<img height="30px" src="../static/img/shopping-cart.svg" alt="users cart" />
</Button1>
  )

return (
    <Button2 disabled={loading}  onClick={clickHandle} ><img className={spin ? 'spin' : ''}  src="../static/img/addmore.svg" title="Add to Cart"/>
    </Button2>
)
}

export default React.memo(AddToCart)
export { ADD_TO_CART_MUTATION }
