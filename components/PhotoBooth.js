import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import Dictaphones from './Dictaphones'
import gql from 'graphql-tag'
import Popup from 'reactjs-popup'
import ControlDots from './ControlDots'

import { useMutation, useQuery } from '@apollo/client'
import { format } from 'date-fns'
import Webcam from 'react-webcam'

import styled from 'styled-components'

const ADD_THUMBNAIL_MUTATION = gql`
  mutation ADD_THUMBNAIL_MUTATION($id: ID!, $image: Upload) {
    updateItem(id: $id, data: { image: $image }) {
      id
      image {
        publicUrlTransformed
      }
    }
  }
`
const Background = styled.div`
  background: rgba(20, 20, 20, 0.8);
  height: 100%;
  top: 0;
  left: 0;

  width: 100%;
  position: fixed;
  z-index: 10000;
`
const Wrap = styled.div`
  display: flex;
  
  margin: 20px;
  justify-content: center;
  .shell {position: relative;
    width: 100%;
    margin: 0 auto;
    background-color: lightgrey;
 user-select: none;
    background: ${props => props.thumbnail ? `url(${props.thumbnail}) center center no-repeat` : 'lightgrey'};
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    margin: 0px;
    padding: 0px;
    border-radius: 15px;
    height: 250px;
    color: white;
    box-shadow: 0px 5px 5px -3px rgba(20, 20, 20, 0.5);
    transition: 0.3s;
     
  }
    .topper {
      width: 90%;
      border-top: ${(props) =>
        props.thumbnail === null ? '2px solid white' : null};
      margin: 0 auto;
      text-align: center;
      justify-content: center;
      margin-top: 10px;
      padding-top: 10px;   
    }
  
  p {
    text-align: center;
    margin: 2px;
    line-height: 18px;
    margin-top: 5px;transform: skewX(-6deg);
    outline: none;
    color: rgba(30, 30, 30, 1);
    cursor: pointer;
    font-family: 'Bison';
    letter-spacing: 3px;
    font-size: 20px;
  }
  
`
const DateBlock = styled.div`
  display: flex;
  flex-flow: column;
 
  font-family: 'Bison';
  letter-spacing: 3px;      transform: translateY(-7px) rotate(-5deg) skew(-10deg);
  margin: 0px auto 0;
  p {
    margin: 2px 0;

    color: slategrey;
    letter-spacing: 2px;
    font-size: 20px;
  }
  .day {
    text-align: center;
    justify-content: center;
    background: ${(props) => props.theme.second};
    margin: 0 auto;  
    font-size: 22px;
    line-height: 22px;
    padding:  5px;
  }
      .title {
      font-family: 'Bison';
      letter-spacing: 2px;
      font-size: 26px;
      margin: 0px auto 8px;

    padding: 0 5px;
      line-height: 26px;
      color: white;
      text-align: center;
      background: ${(props) => props.theme.second};
    }
   
`
const Mode = styled.div`
  box-shadow: 0px 10px 5px -3px rgba(20, 20, 20, 0.2);
  z-index: 13000;
  position: relative;
  font-size: 12px;
  display: grid;
  grid-template-columns: 1400px;
  grid-template-rows: 1fr 1fr;
  justify-content: center;
  font-family: 'Bison';
  letter-spacing: 2px;
  font-size: 17px;
  width: 100%;

  margin: 0 auto;
  background: white;
  height: 100vh;

  overflow: hidden;
  .content {
    width: 100%;
    padding: 0;
    margin: 0 auto;
    align-items: center;
    grid-row: 1;
    grid-column: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
    position: relative;
  }

  .actions {
    width: 100%;
    padding: 10px 5px;
    margin: auto;
    text-align: center;
  }
  .close {
    cursor: pointer;
    position: fixed;
    display: flex;
    justify-content: center;
    justify-self: flex-start  ;
    align-items: center;
    outline: none;
    padding: 2px 5px;
    z-index: 1000;
    grid-row: 1;
    grid-column: 1;
    transform: translate(10px, 10px);
    height: 40px;
    width: 40px;
    border: none;
    line-height: 20px;

    font-size: 24px;
    border-radius: 50%;
  }

  .photo {
    width: 100%;
    float: left;
  }

  .player {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 200px;
  }

  .strip {
    display: flex;
    width: 100%;
    justify-content: center;
    
    bottom:  0px;
    padding: 2rem;
    margin: 0 auto;
    position: absolute;
  }
 `


const Counter = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 20%;
  width: 100%;
  height: 100px;
  margin: 0 auto;
  font-size: 100px;
  z-index: 999;
  color: white;
  user-select: none;
`
const TakeIt = styled.button`
  justify-content: center;
  width: 200px;  position: fixed;
  margin: 10px auto;
  align-items: center;
  background: #f8b0b0;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 24px;
  font-family: 'Bison';
  letter-spacing: 2px;
  padding: 5px 10px;
  z-index: 10000;
 
  cursor: pointer;
  transition: 0.3s;
  &:hover {
 
  }
  &:active {
 
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
 const SubImage = styled.div`
     width:  100%;
     max-width: 300px;
     position: relative;
     bottom: 40px;
 margin: 0 20px;  display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.8rem 0.8rem 2.5rem 0.8rem;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    background: url(${props => props.theSrc});
    background-size: cover;
    height: 180px;
 
    border: 10px   solid lightgrey;
    border-bottom: 20px solid lightgrey;
   
    .ghostButton {
    border-radius: 50%;
  display: flex;
  justify-self: center;
  align-self: center;
  border: none;
 
  position: absolute;
  opacity: 1;
  background: lightblue;
  transform: translate(0,  0px);
  color: white;
  &:hover {
    background: ${(props) => props.theme.second};
    cursor: pointer;
    opacity: 0.3;
  }
  }
  .deleteit {
    position: absolute;
 
 background: red;
    margin: 0 auto;
    padding: 2px 7px;
    border-radius: 5px;
    line-height: 20px;
    cursor: pointer;
     bottom: 0; 
transform: translate(0, -17px);
    color: white;
  }
  button {
    color: white;
    font-family: 'Bison';
    z-index: 93000;
    position: relative;
    cursor: pointer;
    height: 40px;
    width: 100px;
    border: none;
    margin: 0 auto;
    text-align: center;
    opacity: 0.8;
    transition: 0.3s;
    letter-spacing: 2px;
    &:nth-of-type(1) {
      background: green;
    }
    &:nth-of-type(2) {
      background: red;
    }
    &:hover {
      opacity: 1;
    }
  }
 `
 const ClickCam = styled.img`
 display: flex;
 justify-self: flex-start;
 position: absolute;
 background: white;
 border-radius: 50%;
 transform: translate(-180px,20px);
  padding: 5px;
 height: 45px;
 cursor: pointer;
 width: 45px;
 `
export default function Shell({  id,
  thumbnail,
  item,
  handleClick,
  updateStatus,
  imgSrc,
  triggerTime,
  setTriggerTime,
  setImgSrc}) {
    return(
      <Wrap thumbnail={thumbnail ? thumbnail : null}>
     <div className="shell">
      
        
                
           
            <div className="topper">
                 <DateBlock><div className="title">{item.reason.name}</div>
           
                <div className="day">
                  {format(new Date(item.date), 'EE M/dd @ h:mm aa')}
                </div>
              </DateBlock>
              <ControlDots
        updateStatus={updateStatus}
          id={id}  
          status={item.status}
          theName={item.reason.name}
        />  
            </div>
          </div>
      <PhotoBoothModal           imgSrc={imgSrc}
          triggerTime={triggerTime}
          setImgSrc={setImgSrc}
          setTriggerTime={setTriggerTime}
          handleClick={handleClick}
          thumbnail={thumbnail}
          item={item}
          id={id} />
      </Wrap>
    )
  }

 function PhotoBoothModal({
  id,

  handleClick,
  imgSrc,
  triggerTime,
  setTriggerTime,
  setImgSrc,
}) {
  let webcamRef = useRef(null)
  let intervalRef = useRef()
  const [selectedImage, setSelectedImage] = useState(null)
const [selectedIndex, setSelectedIndex] = useState(null)
  const [audio] = useState(false)
  const [time, setTime] = useState(6)
 
  const videoConstraints = {
    height: 1080,
    width: 1920,
  }
  const [updateItem, { loading, error }] = useMutation(ADD_THUMBNAIL_MUTATION, {
    variables: {
      id: id,
      image: selectedImage,
    },
  })
  const clearOut = (close) => {
    clearInterval(intervalRef.current)

    setTime(6)
    close()
  }

  async function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer()
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType })
      })
  }
  const sendToTheBigLeagues = (image, i) => {
    urltoFile(image, id + '.jpeg', 'data:image/jpeg').then(function (file) {
      setSelectedImage(file)
    }).then(
    setSelectedIndex(i))

  }
  const deleteIt = (e, i) => {
    const removeByIndex = imgSrc.filter((pic, index) => {
      return index !== i
    })
    setImgSrc(removeByIndex)
  }
  const decreaseTime = () => {
    setTime((prev) => prev - 1)
  }
  useEffect(() => {
    if (!triggerTime) return null
    if (time <= 0) {
      capture()
      setTriggerTime(false)
      setTime(6)
    }
    intervalRef.current = setInterval(decreaseTime, 1000)

    return () => clearInterval(intervalRef.current)
  }, [time, triggerTime])
  const handlePhotoSave = async () => {
    await updateItem()
    console.log('now clear it!')
    setSelectedImage(null)
    setImgSrc([])
  }

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImgSrc((prev) => [...prev, imageSrc])
  }
const updateImage = () => {
  setSelectedImage(null)
  setSelectedIndex(null)
}
  return (
   
      
      <Popup
        trigger={
      
              <ClickCam src="../static/img/camera.svg" />
            
          }
           
        modal
        nested
      >
        {(close) => (
          <Background>
            <Background />
            <Mode>
              <div className="content">
                <Webcam
                  audio={true}
                  mirrored
                  videoConstraints={videoConstraints}
                  ref={webcamRef}
                  width={'100%'}
                  screenshotFormat="image/jpeg"
                />
                {time === 6 ? null : <Counter>
                  <p>{time && time}</p>
                </Counter>}

                {selectedImage === null && time === 6 ? (
                  <TakeIt disable={triggerTime} onClick={handleClick}>
                    Take Photo
                  </TakeIt>
                ) : null}

                <div
                  className="strip"
                  style={{ zIndex: 9000, position: 'fixed' }}
                >
                  {imgSrc.length > 0 &&
                    imgSrc.map((image, i) => {
                      return (
                        <SubImage theSrc={image} key={i}>
                           

                          <div className="ghostButton"
                            onClick={() => sendToTheBigLeagues(image, i)}
                          >
                            <img height="50" src="../static/img/uparrow.svg" />
                          </div>

                          {selectedIndex === i ? (
                             
                              
                     <>
                                 <button onClick={() => handlePhotoSave()}>
                                   upload
                                 </button>
                                 <button onClick={() => updateImage(null)}>
                                   Close
                                 </button>
                                
                             </>
                      
                        
                          ) : (
                            <div onClick={(e) => deleteIt(e, i)} style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <p  
                              className="deleteit"
                            >DELETE</p></div>
                               
                          )}
                        </SubImage>
                      )
                    })}
                </div>
              </div>{' '}
              <button className="close" onClick={() => clearOut(close)}>
                &times;
              </button>
            </Mode>
            <Dictaphones
              // updateStatus={updateStatus}
              // active={active}
              // status={item.status}
              handleClick={handleClick}
            />
          </Background>
        )}
      </Popup>
   
  )
}
