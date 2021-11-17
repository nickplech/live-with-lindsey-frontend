import React from 'react';
import styled from 'styled-components'

const Wrap = styled.div`
height: 600px;
width: 100%;
background: white;


`
const BlackAndWhite = styled.div`
  width: 30%;
  height: 50px;
  position: relative;
  margin: 200px auto 0;
transform: skew(-45deg) rotate(-45deg);
  display: flex;
  justify-content: center;
  align-items: center;
      opacity:1;
background-color: #fffced;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23ff9ea0' stroke-width='90.1' stroke-opacity='0.13' %3E%3Ccircle fill='%23fffced' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23fff8e9' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23fef3e6' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23feefe2' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23fdeade' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23fde6da' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23fde1d6' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23fcdcd2' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23fcd7ce' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23fbd2ca' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23fbcdc5' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23fac8c1' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23fac2bc' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23fabcb8' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23f9b7b3' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23f9b1ae' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23f8aaa9' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23f8a4a4' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
/* background-attachment: fixed; */


    background-position: center;
    `
function SubHero(props) {
  return (
    <Wrap>

    </Wrap>
  );
}

export default SubHero;