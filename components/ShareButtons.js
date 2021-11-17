import React, {useState} from 'react'
import styled from 'styled-components'
import {
  TwitterIcon,
  TwitterShareButton,
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
const StyledDiv = styled.div`
.share-buttons {
  position: relative;
  display: flex;
  flex-flow: row;
  height: 50px;
 padding-left: 20px;
  z-index: 8000;
   
&:first-child {
  margin-top: 0;
}
}
.share-button {
  display: flex;
  position: relative;
 
  margin-bottom: 0px; cursor: pointer;
  margin-right: 5px;
}
.share-button:hover .share-button-secondary-content {
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.share-button-primary {
  position: relative;
   
 
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
 
`
function ShareButtons({classId}) {

  return (
    <StyledDiv>
<div className="share-buttons">
  <div className="share-button">
    
    <div className="share-button-primary">
    <TwitterShareButton
              url={`https://lindseyharrod.com/class?${classId}/`}
              title={`Share this class on Twitter!`}
              className='share_icon'
            >
              <TwitterIcon size={26} round className='share_border' />
            </TwitterShareButton> 
    </div>
  </div>

  <div className="share-button">
  
    <div className="share-button-primary">
    <FacebookShareButton
              url={`https://lindseyharrod.com/class?${classId}/`}
              title={`Share this class on Facebook!`}
              className='share_icon'
            >
              <FacebookIcon size={26} round />
            </FacebookShareButton>
    </div>
  </div>
  <div className="share-button">
  
    <div className="share-button-primary">
    <EmailShareButton
              url={`https://lindseyharrod.com/class?${classId}/`}
              title={`Share this class with Email!`}
              className='share_icon'
            >
              <EmailIcon size={26} round />
            </EmailShareButton>
    </div>
  </div>
</div>
    </StyledDiv>
  )
}

export default ShareButtons
  
           

            