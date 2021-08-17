import React, { Component } from 'react'
import styled from 'styled-components'
import Phone from './Phone'

const StyledHero = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  position: relative;
  min-height: 440px;
  padding-top: 0px;
  background-color: #611acc;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238e55e8' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  overflow-x: hidden;
  z-index: 0;
  &:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100px;
    background: #f4f3fa;
    z-index: 4;
  }
`
const Left = styled.div`
  z-index: 5;
  padding-left: 25px;
  grid-column: 1;
  p {
    position: relative;
    display: block;
    max-width: 600px;
    z-index: 5;
  }
`
const Buttons = styled.div`
  z-index: 5;
  grid-column: 2;
  display: flex;

  flex-flow: column;
  justify-content: center;
`
const Button = styled.button`
  background: url('../static/img/yogaman.png') no-repeat center center;
  background-size: contain;
  padding: 10px;
  height: 105px;
  width: 105px;
  margin: 15px;
  border-radius: 50%;
  border: 5px solid white;
  transition: 0.2s;
  outline: none;
  cursor: pointer;
  &:nth-child(1) {
    margin-top: 100px;
  }
  &:nth-child(2) {
    background: url('../static/img/shack.png') no-repeat center center;
    background-size: contain;
  }
  &:nth-child(3) {
    background: url('../static/img/spaicon.png') no-repeat center center;
    background-size: contain;
  }
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1.05);
  }
`

class PhoneDisplay extends Component {
  state = {
    text1: 'fit1',
    text2: 'fit2',
    confirmation: 'confirm',
    title: 'Fitness Reminders',
  }

  changeTextsFit = () => {
    this.setState({
      text1: 'fit1',
      text2: 'fit2',
      confirmation: 'confirm',
      title: 'Fitness Reminders',
    })
  }

  changeTextsReal = () => {
    this.setState({
      text1: 'real1',
      text2: 'real2',
      confirmation: 'confirm',
      title: 'Real Estate Reminders',
    })
  }

  changeTextsSpa = () => {
    this.setState({
      text1: 'spa1',
      text2: 'spa2',
      confirmation: 'cancel',
      title: 'Spa & Beauty Reminders',
    })
  }

  render() {
    return (
      <StyledHero>
        <Left>
          <Phone
            title={this.state.title}
            text1={this.state.text1}
            text2={this.state.text2}
            confirmation={this.state.confirmation}
          />
        </Left>
        <Buttons>
          {/* <Button
            onClick={this.changeTextsFit}
            business="Fitness Instruction"
          />
          <Button onClick={this.changeTextsReal} business="Real Estate" />
          <Button onClick={this.changeTextsSpa} business="Beauty &amp; Spa" /> */}
        </Buttons>
      </StyledHero>
    )
  }
}

export default PhoneDisplay
