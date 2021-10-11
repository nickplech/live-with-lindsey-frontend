import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'


const Wrap = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 245px;
  background: rgb(255, 215, 212);
  background: linear-gradient(
    0deg,
    rgba(255, 215, 212, 1) 20%,
    rgba(255, 255, 255, 1) 100%
  );
 
`
const BlackBack = styled.div`
  width: 100%;
  height: 60px;
  margin: 0;
  padding: 0;
  position: absolute;

  z-index: 2000;
  background: rgb(30, 30, 30);
  transform: translateY(125px);
`
const GradientDiv = styled.div`
  display: flex;
  background: ${(props) => props.theme.primary};
  overflow: hidden;
  background-size: cover;
  position: relative;
  flex-flow: column;
  align-items: center;
  &:before {
    height: 300px;
    content: '';
    width: 100%;
    background: rgb(255, 215, 212);
    background: linear-gradient(
      0deg,
      rgba(255, 215, 212, 1) 20%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`
const Block = styled.div`
  width: 90%;
  background-color: #f8b0b0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23ffd7d4'/%3E%3Cstop offset='1' stop-color='%23f8b0b0'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23fcc4c2'/%3E%3Cstop offset='1' stop-color='%23f8b0b0'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg %3E%3Cg transform=''%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform=''%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.4' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  border-radius: 10px;
  padding: 40px;
  transform: translate(0, 40px);
  z-index: 2000;
  display: grid;
  grid-template-columns: 1fr   1fr;
  height: 240px;
  position: relative;
  h1 {
    color: white;
    font-family: 'Bison';
    letter-spacing: 2px;
    margin: 0;
    margin-bottom: 25px;
    line-height: 36px;
    z-index: 4;
    grid-column: 1;
    @media (max-width: 768px) {
      text-align: center;
      max-width: 450px;
      grid-column: 1/3;
      font-size: 20px;
    }
  }
`
const StyledButton = styled.button`
  display: flex;
  padding: 15px 0px;
  align-items: center;
  justify-content: center;
  grid-column: 2;
  background: white;
  color: ${(props) => props.theme.second};
  border: none;
  border-radius: 5px;
 
  width:250px;justify-self: flex-end;
  text-transform: uppercase;
  font-family: 'Bison';
  letter-spacing: 4px;
  margin-bottom: 15px;
  transform: translateY(100px);
  height: 55px;
  font-size: 18px;
  z-index: 10;
  box-shadow: 2px 3px 4px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:active {
    outline: none;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
  &:focus {
    outline: none;
  }
`

const CallToAction = () => (
  <Wrap>
    <GradientDiv />
    <BlackBack />
    <Block>
      <h1>
        Your First Live Workout with Lindsey is <span>Completely Free!</span>
      </h1>
      <Link href="/signup">
        <StyledButton>Click to Get Started</StyledButton>
      </Link>
    </Block>
  </Wrap>
)

export default CallToAction
