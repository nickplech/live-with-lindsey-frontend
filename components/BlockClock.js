import React, {useState, useEffect} from 'react';
import styled from 'styled-components'

const Wrap = styled.div`

	background-color: #222;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	margin: 0;


.container {
	display: flex;
	align-items: center;
	justify-content: center;
	transform: scale(0.5);
}

.flex {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 50px;
}

.number {
	position: relative;
	height: 290px;
	width: 170px;
	margin: 20px;
}

.piece {
	background-color: #fff;
	border: 2px solid transparent;
	border-right-color: #aaa;
 	border-bottom-color: #aaa;
	position: absolute;
	height: 50px;
	width: 50px;
	transform: scale(0);
}

.piece.show {
	transform: scale(1);
	transition: transform 0.2s linear;
}

.piece:nth-of-type(1) {
	top: 0;
	left: 0;
}

.piece:nth-of-type(2) {
	top: 0;
	left: 60px;
}

.piece:nth-of-type(3) {
	top: 0;
	left: 120px;
}

.piece:nth-of-type(4) {
	top: 60px;
	left: 0;
}

.piece:nth-of-type(5) {
	top: 60px;
	left: 120px;
}

.piece:nth-of-type(6) {
	top: 120px;
	left: 0;
}

.piece:nth-of-type(7) {
	top: 120px;
	left: 60px;
}

.piece:nth-of-type(8) {
	top: 120px;
	left: 120px;
}

.piece:nth-of-type(9) {
	top: 180px;
	left: 0px;
}

.piece:nth-of-type(10) {
	top: 180px;
	left: 120px;
}

.piece:nth-of-type(11) {
	top: 240px;
	left: 0px;
}

.piece:nth-of-type(12) {
	top: 240px;
	left: 60px;
}

.piece:nth-of-type(13) {
	top: 240px;
	left: 120px;
}

@media screen and (max-width: 800px) {
	.container {
		transform: scale(0.4);
	}
}

@media screen and (max-width: 550px) {
	.container {
		transform: scale(0.2);
	}
}


`

const pieces = [1,2,3,4,5,6,7,8,9,10,11,12,13]
function BlockClock(props) {
  const [blocks, setBlocks] = useState( [
	[1,2,3,4,5,6,8,9,10,11,12,13],
	[3,5,8,10,13],
	[1,2,3,5,6,7,8,9,11,12,13],
	[1,2,3,5,6,7,8,10,11,12,13],
	[1,3,4,5,6,7,8,10,13],
	[1,2,3,4,6,7,8,10,11,12,13],
	[1,2,3,4,6,7,8,9,10,11,12,13],
	[1,2,3,5,8,10,13],
	[1,2,3,4,5,6,7,8,9,10,11,12,13],
	[1,2,3,4,5,6,7,8,10,11,12,13]
])
useEffect(() => {
  const getTheTime = setInterval(getTime, 1000)
  return clearInterval(getTheTime)
},[getTime])
function getTime() {
	const time = new Date();
	let hours = time.getHours();
	let minutes = time.getMinutes();
	let seconds = time.getSeconds();

	hours = (hours < 10 ? `0${hours}` : hours).toString().split('');
	minutes = (minutes < 10 ? `0${minutes}` : minutes).toString().split('');
	seconds = (seconds < 10 ? `0${seconds}` : seconds).toString().split('');

	// set hour
	displayNumber(hoursEls[0], +hours[0])
	displayNumber(hoursEls[1], +hours[1])

	// set minutes
	displayNumber(minutesEls[0], +minutes[0])
	displayNumber(minutesEls[1], +minutes[1])

	// set seconds
	displayNumber(secondsEls[0], +seconds[0])
	displayNumber(secondsEls[1], +seconds[1])
}
  return (
    <Wrap>
      <div classNameName="container">
	<div id="hours" className="flex">
		<div className="number">
      {pieces.forEach((piece, i) => {
        if(block[+number].includes(i + 1)) {
          piece.classList.add('show')
        } else {
          piece.classList.remove('show')
        }
        return <div className="piece"></div>
      })}
		</div>
		<div className="number">
			{pieces.forEach((piece, i) => {
        if(block[+number].includes(i + 1)) {
          piece.classList.add('show')
        } else {
          piece.classList.remove('show')
        }
        return <div className="piece"></div>
      })}
		</div>
	</div>

	<div id="minutes" className="flex">
		<div className="number">
{pieces.forEach((piece, i) => {
        if(block[+number].includes(i + 1)) {
          piece.classList.add('show')
        } else {
          piece.classList.remove('show')
        }
        return <div className="piece"></div>
      })}
		</div>
		<div className="number">
{pieces.forEach((piece, i) => {
        if(block[+number].includes(i + 1)) {
          piece.classList.add('show')
        } else {
          piece.classList.remove('show')
        }
        return <div className="piece"></div>
      })}
		</div>
	</div>

	<div id="seconds" className="flex">
		<div className="number">
{pieces.forEach((piece, i) => {
        if(block[+number].includes(i + 1)) {
          piece.classList.add('show')
        } else {
          piece.classList.remove('show')
        }
        return <div className="piece"></div>
      })}
		</div>
		<div className="number">
{pieces.forEach((piece, i) => {
        if(block[+number].includes(i + 1)) {
          piece.classList.add('show')
        } else {
          piece.classList.remove('show')
        }
        return <div className="piece"></div>
      })}
		</div>
	</div>
</div>
    </Wrap>
  );
}

export default BlockClock;