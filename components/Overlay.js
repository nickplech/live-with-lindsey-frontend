import React from 'react';
import CountDownTimer from './CountDownTimer'
import styled from 'styled-components'
import VideoSignUp from './VideoSignUp'
const Wrap = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
position: relative;
z-index: 14000;
background: rgba(0,0,0,.4);

`
const Tag = styled.p`

margin: 10px 2px;
border-radius: 5px;
display: flex;
text-align: center;
justify-content: center;
align-items: center;
color: white;
user-select: none;
padding: 1px 10px;
position: relative;
font-family: 'Bison';
letter-spacing: 2px;
z-index: 50000;
background: ${props => props.theme.third};
opacity: .8;
transition: .2s;
cursor: pointer;
&:hover {
  transform: scale(1.05);
  opacity: 1;
}
&:focus {
    transform: scale(1.05);
  opacity: 1;
}
`
function Overlay({ date, children, classId, owner, tags}) {
  return (
<Wrap>


</Wrap>
  );
}

export default Overlay;