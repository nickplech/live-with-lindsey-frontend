import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Nav from './Nav'
import MenuToggle from './MenuToggle'
import Router from 'next/router'
import NProgress from 'nprogress'

// import SignInNoDisplay from './SignInNoDisplay'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}
Router.onRouteChangeError = () => {
  NProgress.done()
}

const Logo = styled.div`
  font-size: 1.3rem;
  margin-left: 2rem;
  transform: scale(1) translateY(5px);
  display: flex;
  align-self: center;
  justify-self: flex-start;
  /* position: fixed; */
  transition: 0.3s;
  z-index: 800;
  grid-column: 1;
  @media (min-width: 768px) {
    grid-column: 1;
  }
  img {
    padding: 0rem 0.1rem;
    background: transparent;
    margin: 5px auto;
    text-transform: uppercase;
    text-decoration: none;
  }
  &:hover {
    transform: scale(1.1) translateY(5px);
  }
`

// const PriceTag = styled.span`
//   background: ${(props) => props.theme.red};
//   /* transform: rotate(-3deg); */
//   color: white;
//   font-weight: 600;
//   padding: 5px;
//   line-height: 1;
//   font-size: 2rem;
//   display: inline-block;
//   position: absolute;
//   z-index: 1000;
//   left: 120px;
//   top: -40px;
// `
const StyledHeader = styled.header`
  .bar {
    /* position: fixed; */
    display: grid;

    justify-content: space-between;
    background: rgb(30, 30, 30);
    width: 100%;
    align-items: stretch;
    z-index: 1000;
    /* height: 60px; */
    grid-template-columns: 1fr 1fr 1fr;
    @media (min-width: 768px) {
      font-size: 1.3rem;

      grid-template-columns: 100px 1fr;

      display: flex;
      align-self: center;
      justify-self: center;
      /* position: fixed; */
      transition: 0.3s;
      z-index: 800;
    }
  }
  .sub-bar {
    display: grid;
    position: relative;
    top: 0px;
    background: rgb(30, 30, 30);

    /* height: 45px; */
    align-self: center;
    border-bottom: 1px solid ${(props) => props.theme.black};
    opacity: 1;
  }
  .signoutM {
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 13px;
    background: none;
    border: 0;
    color: ${(props) => props.theme.second};
    justify-content: center;
    z-index: 5;
    cursor: pointer;
    justify-self: flex-end;
    align-self: center;
    height: 30px;
    width: 80px;
    margin: 0 20px;
    border: 2px solid ${(props) => props.theme.second};
    border-radius: 5px;
    transition: 0.3s;
    &:hover,
    &:focus {
      outline: none;
      background: ${(props) => props.theme.second};
      color: white;
    }
    @media (min-width: 768px) {
      display: none;
    }
  }
`

function Header() {
  const [isOpen, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!isOpen)
  }
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>
              <img width="50px" src="../static/img/lindseymiami.svg" />
            </a>
          </Link>
        </Logo>{' '}
        {/* <Link href="/signup">
          <button style={{ gridColumn: 3 }} className="signoutM">
            Sign Up
          </button>
        </Link> */}
        <Nav toggle={toggleMenu} isOpen={isOpen} />{' '}
        <MenuToggle toggle={toggleMenu} isOpen={isOpen} />
      </div>
    </StyledHeader>
  )
}

export default Header
