import React, {useState, useEffect} from 'react'
import GetChats from './ChatBox'
import Shell from './PhotoBooth'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import PieChartComponent  from './PieChart'
import Error from './ErrorMessage'

import  ClickToCopyId from './ClickToCopyId'
import { useToast } from './contexts/LocalState'
 
const STREAM_QUERY = gql`
  query STREAM_QUERY($id: ID!) {
    Item(where: { id: $id }) {
      id
      date
      tags {
        id
        name
      }
      status
      user {
        id
        businessName
        firstName
        lastName
        subscription
      }
      image {
        publicUrlTransformed
      }
      equipment {
        id
        name
      }
      reason {
        id
        name
        classLength
        classDescription
      }
    }
  }
`

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 300px 1fr;
  grid-template-columns: 1fr 1fr;
  height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  .photobooth {
    grid-column: 2;
    grid-row: 1;
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
  }
  .thetabs {
    margin: 0 10px;
  }
  .tab {
    height: 30px;
    color: slategrey;
    letter-spacing: 2px;
    margin: 0 5px;
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 5px  ;
    background: lightgrey;
    &:active,:focus {
      background: ${props => props.theme.second};

    }
  }
  .isSelected {
    background: ${props => props.theme.second};
 
  }
  .chatframe {
    position: relative;
    width: 95%;
    height: 95%;
    transform: translateY(20px);
    grid-row: 1/3;
    margin: 0 auto;
    border-radius: 15px;
    grid-column: 1;
    overflow-y: scroll;
    overscroll-behavior: contain;
    &::-webkit-scrollbar {
      display: none; // Safari and Chrome
    }
  }
  input {
    background: rgba(220, 220, 220, 0.9);
  }
`
const TheData = styled.div`
  grid-column: 2;
  grid-row: 2;
  padding: 20px;
 
  display: flex;
 
  flex-flow: column;
  align-items: center;
  h4 {
    background: ${(props) => props.theme.primary};
    text-align: center;
    font-family: 'Bison';
    letter-spacing: 2px;
    font-size: 16px;
    color: slategrey;
  }
`
const RegChart = styled.div`
  display: flex;
  width: 100%;
  height: 250px;
  justify-content: center;
  align-items: center;
  flex-flow: row;
  margin: 0 auto;
 
 
`
const listButtons = ['chat', 'currently viewing', 'subscribed']
function ControlRoom({ adminId }) {
  const [isActive, setIsActive] = useState('chat')
  const {
    imgSrc,
    triggerTime,
    setImgSrc,
    updateStatus,
    setTriggerTime,
    handleClick
  } = useToast()

  const { data, loading, error } = useQuery(STREAM_QUERY, {
    variables: { id: adminId },
  })

  
  if (loading) return <p>loading</p>
  if (error) return <Error error={error} />
  if (!data) return null
  const item =   data.Item
  const thumbnail = item.image ? item.image.publicUrlTransformed : null
  const userCount = item.user.length
  const userCountAllAccess = item.user.filter((u) => {
    return u.subscription === 'ALLACCESS'
  })
  const userCountPerLive = item.user.filter((u) => {
    return u.subscription === 'PAYPERLIVE'
  })

  return (
    <Wrapper> 
    
      <TheData style={{ marginLeft: ' 0px' }}>
         <div className="thetabs">{listButtons.map(butt => {
        return <span onClick={() => setIsActive(butt)} key={butt} className={`${butt === isActive ? 'isSelected' : null} tab`}>{butt}</span> 
      })}</div>
      
       
        
        <RegChart>
          <PieChartComponent  item={item} total={userCount} allAccess={userCountAllAccess} perLive={userCountPerLive}  />
  
        </RegChart>
      </TheData>

      <div className="photobooth"> <ClickToCopyId id={adminId} />
        <Shell
          imgSrc={imgSrc}
          triggerTime={triggerTime}
          setImgSrc={setImgSrc}
          setTriggerTime={setTriggerTime}
          handleClick={handleClick}
          thumbnail={thumbnail}
          item={item}
          id={adminId}
          updateStatus={updateStatus}
        />
          

      </div>
      <div className="chatframe">
              <GetChats adminId={adminId} open={true} />
  
     </div>
    </Wrapper>
  )
}

export default ControlRoom
