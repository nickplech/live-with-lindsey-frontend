import React from 'react'

import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 0.4s;
    backface-visibility: hidden;
  }
  /* Initial State of the entered Dot */
  .count-enter {
    transform: rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: rotateX(0.5turn);
  }
`

const Dot = styled.div`
  background: ${(props) => props.theme.second};
  color: ${(props) => props.theme.third};
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  text-align: center;
    font-size: 20px;
  font-family: 'Bison';
  min-width: 3rem;
  margin-left: -0.5rem;
  font-weight: 100;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`

const CartCount = ({ count }) => (
  <AnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimationStyles>
)

export default CartCount
