import React from 'react'
import GetChats from './ChatBox'
import PhotoBoothModal from './PhotoBooth'
import styled from 'styled-components'
import ClickToCopyId from './ClickToCopyId'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import ControlDots from './ControlDots'
import { format } from 'date-fns'
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
  .chatframe {
    position: relative;
    width: 95%;
    height: 93%;
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
  padding-top: 0;
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
  width: 95%;
  justify-content: space-evenly;
  align-items: center;
  flex-flow: row;
  margin: 0 auto;
  .thediv {
    margin: 0 20px;
    text-align: center;
    
  }
  p {
    margin: 0 auto;
    letter-spacing: 2px;
    line-height: 12px;
    margin-bottom: 10px;

  }
  .one {
    display: flex;
    background: rgba(129,204,255, 1);
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    font-size: 30px;
  }
  .two {
    background: rgba(142,229,255, 1);
    display: flex;
    font-size: 30px;
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
  }
  .three {
    display: flex;
    font-size: 30px;
width: 70px;
height: 70px;
justify-content: center;
align-items: center;
margin: 10px auto;
    background: rgba(148,242,255,1);
  }
`
function ControlRoom({ adminId }) {
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
  const item = data.Item

  const thumbnail = item.image ? item.image.publicUrlTransformed : null
  const userCount = item.user
  const userCountAllAccess = item.user.filter((u) => {
    return u.subscription === 'ALLACCESS'
  })
  const userCountPerLive = item.user.filter((u) => {
    return u.subscription === 'PAYPERLIVE'
  })

  return (
    <Wrapper>
      <TheData style={{ marginLeft: ' 0px' }}>
         <ClickToCopyId id={adminId} />
        <ControlDots
        updateStatus={updateStatus}
          id={adminId}  
          status={item.status}
          theName={item.reason.name}
        />
       
        
        <RegChart>
          <div className="thediv"><p className="one">{userCount.length}</p><p>Total Registered</p></div>
          <div className="thediv"><p className="two"> {userCountAllAccess.length}</p><p>All Access</p></div>
          <div className="thediv"><p className="three">{userCountPerLive.length}</p><p>Pay PerLive</p></div>
          
        </RegChart>
      </TheData>

      <div className="photobooth">
        <PhotoBoothModal
          imgSrc={imgSrc}
          triggerTime={triggerTime}
          setImgSrc={setImgSrc}
          setTriggerTime={setTriggerTime}
          handleClick={handleClick}
          thumbnail={thumbnail}
          item={item}
          id={adminId}
        />
      </div>
      <div className="chatframe">
        <GetChats adminId={adminId} open={true} />
      </div>
    </Wrapper>
  )
}

export default ControlRoom
