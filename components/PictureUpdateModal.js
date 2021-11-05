import React from 'react'
import Popup from 'reactjs-popup'
import Account from './Account'
import styled from 'styled-components'

const Background = styled.div`
  background: rgba(20, 20, 20, 0.8);
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  z-index: 89000;
`
const Wrap = styled.div`
  display: flex;
  position: relative;
`
const Mode = styled.div`
  box-shadow: 0px 10px 5px -3px rgba(20, 20, 20, 0.2);
  z-index: 90000;
  position: relative;
  font-size: 12px;
  display: flex;
  flex-flow: column;
  width: 380px;
  padding: 20px;

  border-radius: 15px;
  margin: 0 auto;
  background: rgba(240, 240, 240, 1);
  margin-top: 80px;
  .content {
    width: 100%;
    padding: 10px 5px;

    position: relative;
  }

  .close {
    cursor: pointer;
    position: absolute;
    display: block;
    outline: none;
    padding: 2px 5px;
    border: none;
    line-height: 20px;
    right: -20px;
    top: -20px;
    font-size: 24px;
    /* background: ; */
    border-radius: 50%;
  }
`

const SignUpTitle = styled.h3`
  font-family: 'Bison';
  font-size: 28px;
  text-align: left;
  /* line-height: 26px; */
  margin: 0 0 26px 0px;
  color: ${(props) => props.theme.second};
`

const Pic = styled.div`
  background: url(${(props) => props.pic}) center center;
  border-radius: 50%;
  background-position: center center;
  background-size: cover;
  height: 110px;
  grid-column: 1;
  transition: 300ms;
  z-index: 1000;
  position: absolute;
  justify-content: center;
display: flex;
  width: 110px;
  cursor: pointer;
  @media (max-width: 768px) {
    height: 40px;
    width: 40px;
    transform: translate(-10px, 30px);
    align-items: center;
    background-color: white;
  }
  .pic {
    z-index: 8888;
    position: absolute;
    height: 110px;
    width: 110px;  grid-column: 1;
    
    user-select: none;
    align-items: center;
    justify-content: center;
    color: transparent;
    text-align: center;
    font-size: 28px;
    line-height: 25px;
    @media (max-width: 768px) {
      height: 40px;
      width: 40px;
    }
    &:hover {
    
      @media (min-width: 768px) {
        height: 110px; position: absolute;
      color: white;
      border-radius: 50%;
        width: 110px;background: #f8b0b0;
        opacity: 0.5;
      }
    }
  }

  p {
    display: flex;
    @media (max-width: 768px) {
      display: none;
    }
  }
`

function ModalPicture({ image, toggle }) {
  return (
    <Wrap>
      <Popup
        trigger={
        
            <Pic pic={image}   onClick={toggle}>
              <div className="pic">
                <p>CHANGE PROFILE PIC</p>
              </div>
            </Pic>
          
        }
        modal
        nested
      >
        {(close) => (
          <Background>
            <Background />
            <Mode>
              <button className="close" onClick={close}>
                &times;
              </button>

              <div className="content">
                <SignUpTitle> Upload A Profile Pic</SignUpTitle>
                <Account />
              </div>
            </Mode>
          </Background>
        )}
      </Popup>
    </Wrap>
  )
}

export default ModalPicture
