import React from 'react'
import posed from 'react-pose'
import { tween } from 'popmotion'
import { interpolate, toCircle } from 'flubber'
import styled from 'styled-components'

const StyledBody = styled.div`
  /* height: 150px; */

  flex-flow: column;
  border-radius: 10px;
  align-items: center;
  display: flex;
  /* background: white; */

  svg {
    transition: 0.3s;
    cursor: pointer;
    position: relative;
  }
  .lead {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.4rem;

    text-align: center;
    font-weight: 600;

    color: slategray;

    text-align: center;
    justify-self: center;
    display: flex;
    width: 240px;
    line-height: 16px;
  }
`

const paths = {
  bell:
    'M749.129,187.282c0,-103.364 -83.918,-187.282 -187.282,-187.282l-374.565,0c-103.364,0 -187.282,83.918 -187.282,187.282l0,374.565c0,103.364 83.918,187.282 187.282,187.282l374.565,0c103.364,0 187.282,-83.918 187.282,-187.282l0,-374.565Zm-412.569,149.278l0,-173.519c0,-10.488 8.515,-19.002 19.002,-19.002l38.005,0c10.487,0 19.002,8.514 19.002,19.002l0,173.519l173.519,0c10.488,0 19.002,8.515 19.002,19.002l0,38.005c0,10.487 -8.514,19.002 -19.002,19.002l-173.519,0l0,173.519c0,10.488 -8.515,19.002 -19.002,19.002l-38.005,0c-10.487,0 -19.002,-8.514 -19.002,-19.002l0,-173.519l-173.519,0c-10.488,0 -19.002,-8.515 -19.002,-19.002l0,-38.005c0,-10.487 8.514,-19.002 19.002,-19.002l173.519,0Z',
  heart:
    'M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55 C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z',
}

const pathIds = Object.keys(paths)

const morphTransition = ({ from, to }) =>
  tween({
    from: 0,
    to: 1,
  }).pipe(interpolate(from, to))

const Icon = posed.path(
  pathIds.reduce((config, id) => {
    config[id] = {
      d: paths[id],
      transition: morphTransition,
    }

    return config
  }, {}),
)

class IconMorph extends React.Component {
  state = {
    pathIndex: 0,
  }

  gotoNext = () => {
    const { pathIndex } = this.state
    const nextIndex = pathIndex + 1

    this.setState({
      pathIndex: nextIndex > pathIds.length - 1 ? 0 : nextIndex,
    })
  }

  render() {
    return (
      <StyledBody>
        <svg
          onMouseEnter={this.gotoNext}
          onMouseLeave={this.gotoNext}
          width="45"
          height="45"
          viewBox="0 0 800 800"
          fill={`#f8b0b0`}
        >
          <Icon pose={pathIds[this.state.pathIndex]} />
        </svg>
      </StyledBody>
    )
  }
}

export default IconMorph
