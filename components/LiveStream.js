import React, { useState, useEffect } from 'react'
import VideoPlayerLive from './VideoPlayerLive'
import styled from 'styled-components'
import GetChats from './ChatBox'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import { useQuery } from '@apollo/client'
import ChatTrigger from './ChatTrigger'
import Loader from './Loader'
const LIVE_AUTH_QUERY = gql`
  query LIVE_AUTH_QUERY($id: ID!) {
    liveAuth(id: $id) {
      id
      name
      user {
        id
      }
    }
  }
`
const Griddy = styled.div`
  display: grid;
  height: calc(100vh - 60px);
  width: 100%;
grid-template-columns: 1fr  ;
grid-template-rows: 1fr;
  /* flex-flow: column; */
position: relative;
  .chatframe {
    position: fixed;
    width: 100%;
    height: 100%;
    grid-row: 2;
  grid-column: 2;
 
    display: flex;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none; // Safari and Chrome
    }
  }
`
const Background = styled.div`
  background: #ed4264;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 0;

  opacity: 0.4;
  background: -webkit-linear-gradient(to bottom, #ffedbc, #ed4264);
  background: linear-gradient(to bottom, #ffedbc, #ed4264);
`
const Name = styled.div`
  width: 100%;
  z-index: 80000;
  grid-row: 1;
  grid-column: 2;
  display: flex;
  background: rgb(30, 30, 30);
  color: rgba(240, 240, 240, 0.8);

  justify-content: flex-start;
  align-items: center;
  font-family: 'Bison';
  font-size: 24px;
  line-height: 30px;
  position: relative;
  z-index: 100;
  padding: 0px 0 0px 10px;
`
function LiveStream({ id }) {
  const [itemId, setId] = useState(null)
  const [open, setOpen] = useState(true)
       
  const { data, loading, error } = useQuery(LIVE_AUTH_QUERY, {
    variables: { id: id },
  })
  // if (!data) return null
  useEffect(() => {

    if (id !== undefined) {
      setId(id)
    }
  }, [itemId])

  if (loading) return <Loader />
  if (error) return <Error error={error} />

  const name = data.liveAuth.name
  const handleToggleChat = (e) => {
    setOpen(!open)
  }
  const options = {
    fill: true,
    fluid: true,
    autoplay: true,
    responsive: true,
    controls: true,
    textTrackSettings: false,
    liveui: true,
    errorDisplay: false,
    preload: 'auto',
    notSupportedMessage: 'Sorry, not supported!',
    suppressNotSupportedError: true,
    sources: [
      {
        src: `http://143.110.146.49:8080/hls/${id}.m3u8`,
        type: 'application/x-mpegURL',
      },
    ],
    html5: {
      vhs: {
        enableLowInitialPlaylist: true,
        smoothQualityChange: true,
        overrideNative: true,
      },
    },
  }
 
  return (
 
      <Griddy>
        <VideoPlayerLive style={{ zIndex: 500 }} {...options} id={id}  />
        {/* <Name name={name}>
          {name + ' '} |{' '}
          <ChatTrigger open={open}  />
        </Name>

        <div className="chatframe">
          <GetChats
       
            name={name}
 
            itemId={id}
            open={open}
          />
        </div> */}

    </Griddy>      
    
  )
}
export default LiveStream
