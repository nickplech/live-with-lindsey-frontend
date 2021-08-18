import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Signout from './Signout'
const NavMenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
    .accountsettings {
 
     
  }
`

const NavList = styled.ul`
  padding: 0 0.8em;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const BottomButtons = styled.div`
  display: inline-flex;
  width: 100%;
`
const NavLink = styled(motion.li)`
  font-weight: 600;
  height: 42px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: 'Bison';
  letter-spacing: 3px;
  a {
    text-decoration: none;
    color: #444;
    font-size: 20px;
    transition: all 200ms ease-in-out;
  }
  &:hover {
    a {
      color: #555;
    }
  }
  .login {
    background: transparent;
     border: none;
    font-size: 24px;
    font-family: 'Bison';
    padding-right: 10px;
    border-right: 2px solid #f8b0b0;
    outline: none;
    cursor: pointer;

  }

  .signup {
    background: transparent;
     border: none;
    font-size: 24px;
    font-family: 'Bison';    outline: none;
    padding-right: 10px;
       cursor: pointer;
  }
`
 
const variants = {
  show: {
    transform: 'translateX(0em)',
    opacity: 1,
  },
  hide: {
    transform: 'translateX(5em)',
    opacity: 0,
  },
}

export function NavMenu({ isOpen, toggle, me, addy }) {
  const userPic = me?.image?  me.image.publicUrlTransformed : '../static/img/profpic.svg'
  return (
    <NavMenuContainer>
      <NavList>
        <NavLink
          onClick={toggle}
          initial={false}
          animate={isOpen ? 'show' : 'hide'}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.3, duration: 0.2 },
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.05, duration: 0.05 },
            },
          }}
        >
          <Link href="/">
            <a>Home</a>
          </Link>
        </NavLink>
        <NavLink
          onClick={toggle}
          initial={false}
          animate={isOpen ? 'show' : 'hide'}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.4, duration: 0.2 },
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.1, duration: 0.05 },
            },
          }}
        >
          <Link href="/ondemand">
            <a>On-Demand Workouts</a>
          </Link>
        </NavLink>
        {addy && <NavLink
          initial={false}
          animate={isOpen ? 'show' : 'hide'}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.5, duration: 0.2 },
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.15, duration: 0.05 },
            },
          }}
        >
          <a href="/admdash">Admin Dashboard</a>
        </NavLink>}
         {!me ? null : 
          
        <NavLink
className="accountsettings"
onClick={toggle}
          initial={false}
          animate={isOpen ? 'show' : 'hide'}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.6, duration: 0.2 },
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.2, duration: 0.05 },
            },
          }}
        > 
           
    
          <Link href="/manageaccount">
            <a>Account Settings</a>
          </Link> 
        </NavLink>
       
}
<NavLink
className="accountsettings"
onClick={toggle}
          initial={false}
          animate={isOpen ? 'show' : 'hide'}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.6, duration: 0.2 },
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.2, duration: 0.05 },
            },
          }}
        > 
 </NavLink>
        <BottomButtons>
          <NavLink
            onClick={toggle}
            initial={false}
            animate={isOpen ? 'show' : 'hide'}
            variants={{
              show: {
                ...variants.show,
                transition: { delay: 0.7, duration: 0.2 },
              },
              hide: {
                ...variants.hide,
                transition: { delay: 0.25, duration: 0.05 },
              },
            }}
          >
            {!me ? (
              <Link href="/login">
                <button
                  onClick={toggle}
                  style={{ marginTop: '50px' }}
                  className="login"
                >
                  Login
                </button>
              </Link>
            ) : null}
          </NavLink>
          <NavLink
            onClick={toggle}
            initial={false}
            animate={isOpen ? 'show' : 'hide'}
            variants={{
              show: {
                ...variants.show,
                transition: { delay: 0.7, duration: 0.2 },
              },
              hide: {
                ...variants.hide,
                transition: { delay: 0.25, duration: 0.05 },
              },
            }}
          >
            {!me ? (
              <Link href="/signup">
                <button
                  onClick={toggle}
                  style={{ marginTop: '50px' }}
                  className="signup"
                >
                  Sign Up
                </button>
              </Link>
            ) : (
            <Signout onClick={toggle} style={{ marginTop: '50px' }} />
   )}
          </NavLink>
        </BottomButtons>
      </NavList>
    </NavMenuContainer>
  )
}
