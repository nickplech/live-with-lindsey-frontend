import React, {useState} from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
.share-buttons {
  position: absolute;
  width: 200px;
  height: 242px;
  top: 50%;
  z-index: 8000;
  left: .5%;
&:first-child {
  margin-top: 0;
}
}
.share-button {
  display: flex;
  position: relative;
  height: 40px;
  margin-bottom: 30px; cursor: pointer;
}
.share-button:hover .share-button-secondary-content {
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.share-button-primary {
  position: absolute;
  background: #fff;
  width: 55px;
  height: 55px;
  display: flex;
  text-align: center;
  border-radius: 50%;
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
  height: 40px;
}
.share-button-secondary-content {
  font-family: sans-serif;
  font-size: 1em;
  background: #fff;
  display: flex;
  margin-top: 11px;
  height:30px;
  text-align: left;
  padding-left: 50px;
  padding-right: 18px;
  line-height: 30px;
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
function ShareButtons() {

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
      <i className="share-button-icon fa fa-twitter"></i>
    </div>
  </div>

  <div className="share-button">
    <div className="share-button-secondary">
      <div className="share-button-secondary-content">
        share on facebook
      </div>
    </div>
    <div className="share-button-primary">
      <i className="share-button-icon fa fa-facebook"></i>
    </div>
  </div>
</div>
    </StyledDiv>
  )
}

export default ShareButtons
