import React, {useState, useEffect} from 'react'
 import styled from 'styled-components'
 import { useQuery } from '@apollo/client'
 import { useKeenSlider } from "keen-slider/react"
 import "keen-slider/keen-slider.min.css"
 import gql from 'graphql-tag'
import Error from './ErrorMessage'

const ALL_INSTAGRAMS_QUERY = gql`
query ALL_INSTAGRAMS_QUERY {
  getInstas {
  message
  }
}
`
 const InstagramContainer = styled.div`
 display: flex;
 margin: 0 auto;
 z-index: 100;
 height: 600px;
 overflow: hidden;
 position: relative;
 justify-content: center;
 align-items: center;

 /* &:before {
    height: 600px;
    content: '';
    width: 100%;
    overflow: hidden;
    position: absolute;
    background: rgb(255, 215, 212);
    background: linear-gradient(
      0deg,
      rgba(255, 215, 212, 1) 20%,
      rgba(255, 255, 255, 1) 100%
    );
  } */
  a {
     
      height: 100%;
      width: 100%;
      background: lightgray;
  }
  .img {
    height: 100%;
      width: 100%;
      object-fit: cover;
  }
 `
 const Wrap = styled.div`
 width: 100%;
  margin: 0;
  width: 80%;
 transform: translate(-200px, -80px) rotate( 4deg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 

[class^="number-slide"],
[class*=" number-slide"] {
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: #fff;
  font-weight: 500;
  height: 220px;
 
}

.number-slide1 {
    background: rgb(255, 64, 156);
  background: linear-gradient(
    128deg,
    rgba(255, 64, 156, 1) 0%,
    rgba(255, 154, 63, 1) 30%,
    rgba(255, 63, 63, 1) 100%
  );
}

.number-slide2 {
  background: rgb(255, 75, 64);
  background: linear-gradient(
    128deg,
    rgba(255, 154, 63, 1) 0%,
    rgba(255, 75, 64, 1) 100%
  );
}

.number-slide3 {
  background: rgb(182, 255, 64);
  background: linear-gradient(
    128deg,
    rgba(182, 255, 64, 1) 0%,
    rgba(63, 255, 71, 1) 100%
  );
  background: linear-gradient(
    128deg,
    rgba(189, 255, 83, 1) 0%,
    rgba(43, 250, 82, 1) 100%
  );
}

.number-slide4 {
  background: rgb(64, 255, 242);
  background: linear-gradient(
    128deg,
    rgba(64, 255, 242, 1) 0%,
    rgba(63, 188, 255, 1) 100%
  );
}

.number-slide5 {
  background: rgb(255, 64, 156);
  background: linear-gradient(
    128deg,
    rgba(255, 64, 156, 1) 0%,
    rgba(255, 63, 63, 1) 100%
  );
}
.number-slide6 {
  background: rgb(64, 76, 255);
  background: linear-gradient(
    128deg,
    rgba(64, 76, 255, 1) 0%,
    rgba(174, 63, 255, 1) 100%
  );
}

 `
 

 
const blankGramz = [{id: 'asdfasdf', url: 'http://localhost:3001/admin/api/instagram', thumbnail: '../static/img/instagram/insta1.jpg', caption: 'sdafasfasdf'}, {id: 'gdsafd', url: 'http://localhost:3001/admin/api/instagram', thumbnail: 'http://localhost:3001/admin/api/instagram/post1', caption: 'sdafasfasdf'},{id: 'ggggg', url: 'http://localhost:3001/admin/api/instagram', thumbnail: 'http://localhost:3001/admin/api/instagram/post1', caption: 'sdafasfasdf'},{id: 'ewewewedewwqqqaasssaa', url: 'http://localhost:3001/admin/api/instagram', thumbnail: 'http://localhost:3001/admin/api/instagram/post1', caption: 'sdafasfasdf'},{id: 'bvvvbflarpojennings', url: 'http://localhost:3001/admin/api/instagram', thumbnail: 'http://localhost:3001/admin/api/instagram/post1', caption: 'sdafasfasdf'},{id: 'asddf', url: 'http://localhost:3001/admin/api/instagram', thumbnail: 'http://localhost:3001/admin/api/instagram/post1', caption: 'sdafasfasdf'}, {id: 'gdsafd', url: 'http://localhost:3001/admin/api/instagram', thumbnail: 'http://localhost:3001/admin/api/instagram/post1', caption: 'sdafasfasdf'},{id: 'gg', url: 'http://localhost:3001/admin/api/instagram', thumbnail: 'http://localhost:3001/admin/api/instagram/post1', caption: 'sdafasfasdf'},{id: 'eweweewwqqqaasssaa', url: 'http://localhost:3001/admin/api/instagram', thumbnail: 'http://localhost:3001/admin/api/instagram/post1', caption: 'sdafasfasdf'},{id: 'bvvvbflarpojings', url: 'http://localhost:3001/admin/api/instagram', thumbnail: 'http://localhost:3001/admin/api/instagram/post1', caption: 'sdafasfasdf'}]

export default function Instagram(props){
    const [posts, setPosts] = useState([])
    const [pause, setPause] = React.useState(false)
    const timer = React.useRef()
  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 5,
    mode: "free",
    spacing: 15,
    loop: true,
  
    duration: 1000,
    dragStart: () => {
      setPause(true)
    },
    dragEnd: () => {
      setPause(false)
    },
  })
     
 
  useEffect(() => {
    sliderRef.current.addEventListener("mouseover", () => {
      setPause(true)
    })
    sliderRef.current.addEventListener("mouseout", () => {
      setPause(false)
    })
  }, [sliderRef])

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next()
      }
    }, 2500)
    return () => {
      clearInterval(timer.current)
    }
  }, [pause, slider])
//  const {data, loading, error} = useQuery(ALL_INSTAGRAMS_QUERY)
//     if(loading)return <p>loading</p>
//     if(error) return <Error error={error}/>
 
  return (
  <InstagramContainer>
      
          <Wrap ref={sliderRef} className="keen-slider">
            {  blankGramz.map((gram, i) => (

      <a key={i} href="https://instagram.com/lindseyharrod" className={`keen-slider__slide number-slide${i}`}><img className="img"  src={`../static/img/instagram/insta${i}.jpg`} alt={gram.caption} /></a>
     
        ))}   </Wrap>
        <img height="540" width="auto" style={{right: '3%', zIndex: 30, position: 'absolute', transform: 'translateY(95px) rotate(4deg)'}} src="../static/img/insta-lindz.png" alt="lindsey harrod instagram" />
        </InstagramContainer>
  )
}
