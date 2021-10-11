import React, {useState} from 'react'
import styled from 'styled-components'
import {
  TwitterIcon,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
const StyledDiv = styled.div`
.share-buttons {
  position: absolute;
  
  height: 202px;
  bottom: 10px;
  z-index: 8000;
  left: 10px;
&:first-child {
  margin-top: 0;
}
}
.share-button {
  display: flex;
  position: relative;
  height: 30px;
  margin-bottom: 0px; cursor: pointer;
}
.share-button:hover .share-button-secondary-content {
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.share-button-primary {
  position: absolute;
   
 
  display: flex;
  text-align: center;
 
}
.share-button-icon {
  display: flex;
  color: #242424;
  align-self: center;
  text-align: center;
  margin: 0 auto;
  position: relative;
justify-self: center;
  font-size: 20px;
}
.share-button-secondary {
  overflow: hidden;
  margin-left: 15px;
  height: 25px;
}
.share-button-secondary-content {
  font-family: sans-serif;
  font-size: 1em;
  background: #fff;
  display: flex;
  margin-top: 2px;
  height:22px;
  text-align: left;
  padding-left: 30px;
  padding-right: 8px;
  line-height: 22px;
  color: #242424;
  border-radius: 0 20px 20px 0;
  -webkit-transform: translate3d(-100%, 0, 0);
          transform: translate3d(-100%, 0, 0);
  -webkit-transition: -webkit-transform 175ms ease;
  transition: -webkit-transform 175ms ease;
  transition: transform 175ms ease;
  transition: transform 175ms ease, -webkit-transform 175ms ease;
}

`
function ShareButtons({classId}) {

  return (
    <StyledDiv>
<div className="share-buttons">
  <div className="share-button">
    <div className="share-button-secondary">
      <div className="share-button-secondary-content">
        share on twitter
      </div>
    </div>
    <div className="share-button-primary">
    <TwitterShareButton
              url={`https://lindseyharrod.com/class?${classId}/`}
              title={`Join this meeting with the given code `}
              className='share_icon'
            >
              <TwitterIcon size={26} round className='share_border' />
            </TwitterShareButton> 
    </div>
  </div>

  <div className="share-button">
    <div className="share-button-secondary">
      <div className="share-button-secondary-content">
        share on facebook
      </div>
    </div>
    <div className="share-button-primary">
    <FacebookShareButton
              url={`https://lindseyharrod.com/class?${classId}/`}
              title={`Join this meeting with the given code `}
              className='share_icon'
            >
              <FacebookIcon size={26} round />
            </FacebookShareButton>
    </div>
  </div>
</div>
    </StyledDiv>
  )
}

export default ShareButtons
  
           

            