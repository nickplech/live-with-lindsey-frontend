import React from 'react';
import styled from 'styled-components'
import {useRouter} from 'next/router'

const Wrap = styled.div`
display: flex;
 position: relative;
 margin: 10px;
 .shell {
   cursor: pointer;
   width: 100%;
     background: ${props => props.theme.primary};
     display: flex;
     justify-content: center;
     align-items: center;
     flex-flow: column;
margin: 0px;
padding: 20px;
border-radius: 5px;
color: white;
box-shadow: 0px 5px 5px -3px rgba(20,20,20,.5);
transition:.3s;
&:hover {
  transform: scale(1.01);
}
 }
p {
  text-align: center;
margin: 2px;
line-height: 18px;
margin-top: 5px;
  outline: none;
  cursor: pointer;
  font-family: 'Bison';

letter-spacing: 3px;
font-size: 20px;
}
img {
  color: white;
  height: 30px;
  width: 30px;

}
`

function PortalButton(props) {
  function goToBread() {
'http://localhost:3001/admin'
  }
  function makeAClass() {
'http://localhost:3001/admin'
  }

  return (
    <Wrap>

      <a href="http://localhost:3001/admin" className="shell"><img src="../static/img/servers.svg"/><p >Admin Data Manager </p></a>



    </Wrap>
  );
}

export default PortalButton;