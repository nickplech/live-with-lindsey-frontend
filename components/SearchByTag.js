import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_TAGS_QUERY } from './UpdateTagSettings'
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 400px;
  background: white;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`
const Container = styled(animated.div)`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 150px);
  grid-gap: 10px;
  padding: 20px;
  justify-content: center;
  margin: 0 auto;
  background: white;

  cursor: pointer;

  will-change: width, height;
`
const Item = styled(animated.div)`
  width: 100%;
  height: 100%;
  background: white;
  color: white;
  text-align: center;

  will-change: transform, opacity;
  font-family: 'Bison';
  letter-spacing: 2px;

  /* &:hover {
    background: ${(props) => props.theme.second};
  } */
`

export default function LoadTags() {
  const { data, loading, error } = useQuery(ALL_TAGS_QUERY)
  if (loading) return loading
  const tags = data.allTags
  return <SearchByTag tags={tags} />
}

function SearchByTag({ tags }) {
  const [selectedTags, setSelectedTags] = useState([])
  const [open, set] = useState(false)
  const springApi = useSpringRef()
  const transApi = useSpringRef()

  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '100%', background: '#3b543b' },
    to: {
      size: open ? '80%' : '100%',
      background: open ? 'white' : 'rgb(30,30,30)',
    },
  })
  const transition = useTransition(open ? tags : [], {
    ref: transApi,
    trail: 400 / tags.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  })

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ])
  console.log(selectedTags)
  return (
    <Wrapper>
      <Container
        style={{ ...rest, width: size, height: size }}
        onClick={() => set((open) => !open)}
      >
        {transition((style, item) => (
          <Item
            onClick={() =>
              setSelectedTags((selectedTags) => [...selectedTags, item])
            }
            style={{ ...style, background: '#6b996b' }}
          >
            {item.name}
          </Item>
        ))}
      </Container>
    </Wrapper>
  )
}
