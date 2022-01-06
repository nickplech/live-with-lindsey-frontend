import React, {useState} from 'react'
import { useUserSocket } from './contexts/SignedInSocket'
import { motion, AnimateSharedLayout } from 'framer-motion'
import styled from 'styled-components'

const ControlledDotsStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform: translateY( 50px);
  ul {
    list-style: none;
    margin: 0 auto;
    z-index: 999;
    padding: 0;
    display: flex;
    justify-content: center;
 
    width: 100%;
  }
  li {
    justify-content: center;
    text-align: center;
  }
  .item {
    display: flex;
    width: 100px;
    height: 30px;
    color: white;
    border-radius: 5%;
    margin: 0 25px;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;
  }

  .outline {
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border: 3px solid white;
    border-radius: 5%;
  }
`
const P = styled.p`
display: flex;
align-items: center;
justify-content: center;
  font-size: 14px;
  margin: 0 auto;
  padding: 0px; line-height: 16px;
  color: white;
  text-align: center;
  background: ${(props) => props.color};
  width: 180px;
  cursor: pointer;
`
export default function ControlDots({  theName, id, status }) {
  const [statusStateVersion, setStatusStateVersion] = useState(status)
  
  const userSocket = useUserSocket()
  const changeActiveStatus = async (id, theName, name) => {
    
    setStatusStateVersion(name)

    userSocket.emit('activityChange', {
      classId: id,
      theName: theName,
      status: name,
    })
  }
 
  return (
    <AnimateSharedLayout>
      <ControlledDotsStyle>
        <ul>
          {colors.map((color) => {
            const isSelected = statusStateVersion === color.name ? true : false
            return(
            <Item
              key={color.name}
              color={color.color}
              theName={theName}
              name={color.name}
              isSelected={isSelected}
              id={id}
              changeActiveStatus={changeActiveStatus}
            />)
         } )}
        </ul>
      </ControlledDotsStyle>
    </AnimateSharedLayout>
  )
}

function Item({ id, color, theName, name, isSelected, changeActiveStatus }) {
  console.log(isSelected)
  return (
    <div style={{ flexFlow: 'column' }}>
      <li
        className="item"
        onClick={() => changeActiveStatus(id, theName, name)}
        style={{ backgroundColor: color, opacity: `${isSelected ? 1 : 0.63}` }}
      >
        {isSelected && (
          <>
          <motion.div
            layoutId="outline"
            className="outline"
            initial={false}
            animate={{ borderColor: color }}
            transition={spring}
          ></motion.div><P style={{color: 'white'}}>{name}</P>
          </>
        )}
      </li> 
 
   </div>
  )
}

const colors = [
  { color: 'grey', name: 'GOING LIVE' },
  { color: '#ff0055', name: 'LIVE' },
  { color: '#22cc88', name: 'COMPLETE' },
]

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
}
