import React from 'react';
import styled from 'styled-components'


const Container = styled.div`
width: 90%;
max-width: 1200px;
height: 200px;
background: transparent;
display: grid;
overflow: hidden;
margin: 30px auto;
grid-template-columns: 210px 1fr 1fr;
grid-template-rows: 40% 60%;
.phone {
  grid-column: 1;
  grid-row: 1/3;
  height: 100%;
  width: 100%;
}
.title {
  grid-column: 2/4;
  grid-row: 1;
  height: 100%;
  flex-flow: column;
  width: 100%;
margin: 0;
display: flex;
justify-content: flex-end;

padding: 0;
}
span {
  color: ${props => props.theme.second};
}
h1{
  font-family: 'Bison';

  font-size: 26px;
  letter-spacing: 2px;
  transform: translate(0, 30px);
  margin: 0;
  line-height: 26px;
}
h2 {
    font-family: 'Comfortaa';
  font-size: 20px;
  margin: 0;

  transform: translate(0, 30px);
}
img {
  transform: translate(20px, 0px);
  position: relative;

}
.button {
  grid-column: 2/4;
  grid-row: 2;
  height: 100%;
  width: 100%;
  display: flex;
    align-items: flex-end;
    transform: translate(0, -20px);
}
button {


    position: relative;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 3px;
    font-size: 1.5em;

    border: 0;

  background: ${props => props.theme.second};
font-family: 'Bison';
    z-index: 5;
    cursor: pointer;
    padding: 4px 6px ;

color: white;
    border-radius: 5px;
    transition: 0.3s;
    &:hover,
    &:focus {
      outline: none;
      background: #f67280;
      color: white;
    }

}
`

function SubscribeAd(props) {
  return (
    <Container>
      <div className="phone"><img height="260" src="../static/img/ondemandphone.png"/>

      </div>
      <div className="title"><h2>Workouts On Demand</h2><h1><span>Your Favorite Workouts When you Want </span>Access All of Lindsey's Content </h1></div>
      <div className="button"><button>About Lindsey's All Access Pass</button></div>
    </Container>
  );
}

export default SubscribeAd;