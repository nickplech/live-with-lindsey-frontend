import React from 'react';
import styled from 'styled-components'


const L = styled.div`
height: 8px;
width: 8px;
background: ${props => props.theme.third};
	&:nth-of-type(1) {
		top: 0rem;
		left: 0rem;
	}
	&:nth-of-type(2) {
		top: 2rem;
		left: 0rem;
	}
	&:nth-of-type(3) {
		top: 4rem;
		left: 0rem;
	}
	&:nth-of-type(4) {
		top:6rem;
		left: 0rem;
	}
	&:nth-of-type(5) {
		top: 8rem;
		left: 0rem;
	}
  	&:nth-of-type(6) {
		top: 10rem;
		left: 0rem;
	}
  	&:nth-of-type(7) {
		top: 10rem;
		left: 2rem;
	}
  	&:nth-of-type(8) {
		top: 10rem;
		left: 4rem;
	}
    `
const I = styled.div`
	&:nth-of-type(1) {
		top: 0rem;
		left: 6rem;
	}
	&:nth-of-type(2) {
		top: 2rem;
		left: 6rem;
	}
	&:nth-of-type(3) {
		top: 4rem;
		left: 6rem;
	}
	&:nth-of-type(4) {
		top: 6rem;
		left: 6rem;
	}
	&:nth-of-type(5) {
		top: 8rem;
		left: 6rem;
	}
  	&:nth-of-type(6) {
		top: 10rem;
		left: 6rem;
	}
`

const V = styled.div`
height: 8px;
width: 8px;
background: ${props => props.theme.third};
  	&:nth-of-type(14) {
		top: 0rem;
		left:8rem;
	}
	&:nth-of-type(15) {
		top: 2rem;
		left: 8.5rem;
	}
	&:nth-of-type(16) {
		top: 4rem;
		left: 9rem;
	}
	&:nth-of-type(17) {
		top: 6rem;
		left: 9.5rem;
	}
	&:nth-of-type(18) {
		top: 8rem;
		left: 10rem;
	}
  	&:nth-of-type(19) {
		top: 10rem;
		left: 10.5rem;
	}	&:nth-of-type(20) {
		top: 8rem;
		left: 11rem;
	}
	&:nth-of-type(21) {
		top: 6rem;
		left: 11.5rem;
	}
	&:nth-of-type(22) {
		top: 4rem;
		left: 12rem;
	}
	&:nth-of-type(23) {
		top: 2rem;
		left: 12.5rem;
	}
	&:nth-of-type(24) {
		top: 0rem;
		left: 13rem;
    }
  `

const E = styled.div`
    	&:nth-of-type(25) {
		top: 0rem;
		left:15rem;
	}
	&:nth-of-type(26) {
		top: 2rem;
		left: 15rem;
	}
	&:nth-of-type(27) {
		top: 4rem;
		left: 15rem;
	}
	&:nth-of-type(28) {
		top: 6rem;
		left: 15rem;
	}
	&:nth-of-type(29) {
		top: 8rem;
		left: 15rem;
	}
  	&:nth-of-type(30) {
		top: 10rem;
		left: 15rem;
	}	&:nth-of-type(31) {
		top: 0rem;
		left: 17rem;
	}
	&:nth-of-type(32) {
		top: 0rem;
		left: 19rem;
	}
	&:nth-of-type(33) {
		top: 5rem;
		left: 17rem;
	}
	&:nth-of-type(34) {
		top: 5rem;
		left: 19rem;
	}
	&:nth-of-type(35) {
		top: 10rem;
		left: 17rem;
	}
  	&:nth-of-type(36) {
		top: 10rem;
		left: 19rem;
	}
 `

function AltLogo(props) {
  return (
    <div>
<L/>
<L/>
<L/>
<L/>
<L/>
<L/>
<L/>
<L/>
<L/>
<L/>
<L/>

<I/>
<I/>
<I/>
<I/><I/>
<I/><I/>
<I/><I/>
<I/><I/>
<I/><I/>
<I/><I/>
<I/><I/>
<I/>
<V/>
<V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/><V/>
<E/>
    </div>
  );
}

export default AltLogo;