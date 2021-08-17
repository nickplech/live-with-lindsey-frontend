import React, {useState} from 'react'
import { useUserSocket } from './contexts/SignedInSocket'
import { motion, AnimateSharedLayout } from 'framer-motion'
import styled from 'styled-components'

const ControlledDotsStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ul {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    display: flex;
    justify-content: center;

    width: 90%;
  }
  li {
    justify-content: center;
    text-align: center;
  }
  .item {
    display: flex;
    width: 80px;
    height: 30px;
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
  font-size: 20px;
  margin: 0 auto;
  padding: 5px; line-height: 22px;
  color: white;
  text-align: center;
  background: ${(props) => props.color};
  
  cursor: pointer;
`
export default function ControlDots({ updateStatus, id, status }) {
  const [statusStateVersion, setStatusStateVersion] = useState(status)
  const userSocket = useUserSocket()
  const changeActiveStatus = async (id, name) => {
    
    setStatusStateVersion(name)

    userSocket.emit('activityChange', {
      classId: id,
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

function Item({ id, color, name, isSelected, changeActiveStatus }) {
  console.log(isSelected)
  return (
    <div style={{ flexFlow: 'column' }}>
      <li
        className="item"
        onClick={() => changeActiveStatus(id, name)}
        style={{ backgroundColor: color, opacity: `${isSelected ? 1 : 0.3}` }}
      >
        {isSelected && (
          <motion.div
            layoutId="outline"
            className="outline"
            initial={false}
            animate={{ borderColor: color }}
            transition={spring}
          ><P>{name}</P></motion.div>
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
