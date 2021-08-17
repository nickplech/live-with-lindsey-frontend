import React from 'react'
import styled from 'styled-components'
import ThreeDLindsey from './3dLindsey'

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
`
const StyledHero = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  min-width: 350px;
  margin: 0 auto;
  background: url('../static/img/lindsey-harrod---background.jpg') no-repeat;
  background-size: cover;
  background-position: center center;
  overflow-x: hidden;
  z-index: 0;
`

const Line = styled.div`
  background: ${(props) => props.theme.primary};
  width: 100%;
  height: 10px;
`
const Hero = () => (
  <Wrapper>
    <StyledHero>
      <ThreeDLindsey></ThreeDLindsey>
    </StyledHero>
    <Line />
  </Wrapper>
)

export default Hero
