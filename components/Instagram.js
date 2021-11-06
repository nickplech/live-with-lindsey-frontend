import React, {useState, useEffect} from 'react'
 import styled from 'styled-components'
 
 import { useKeenSlider } from "keen-slider/react"
 import "keen-slider/keen-slider.min.css"
 
 const Wrap = styled.div`
 width: 100%;
  margin: 0;
 
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
  height: 230px;
 
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
 
 const InstagramContainer = styled.div`
 display: flex;
 margin: 0 auto;
 z-index: 100;
 height: 700px;
 overflow: hidden;
 position: relative;
 justify-content: center;
 align-items: center;
 width: 120%;
 transform: translateX(-10%) rotate(4deg);
  a {
     
      height: 100%;
      width: 100%;
      background: lightgray;
  }
  .img {
    height: 100%;
      width: 100%;
  }
 `
 function useInsta() {
    const [posts, setPosts] = useState([])

    useEffect(()=> {
        fetch('https://www.instagram.com/lindseyharrod/').then(res => res.json()).then(data => {
            setPosts(data)
        })
    }, [])
    return posts
}

const gramz = [{id: 'asdfasdf', url: 'https://instagram.com/lindseyharrod', thumbnail: 'https://instagram.com/lindseyharrod/post1', caption: 'sdafasfasdf'}, {id: 'gdsafd', url: 'https://instagram.com/lindseyharrod', thumbnail: 'https://instagram.com/lindseyharrod/post1', caption: 'sdafasfasdf'},{id: 'ggggg', url: 'https://instagram.com/lindseyharrod', thumbnail: 'https://instagram.com/lindseyharrod/post1', caption: 'sdafasfasdf'},{id: 'ewewewedewwqqqaasssaa', url: 'https://instagram.com/lindseyharrod', thumbnail: 'https://instagram.com/lindseyharrod/post1', caption: 'sdafasfasdf'},{id: 'bvvvbflarpojennings', url: 'https://instagram.com/lindseyharrod', thumbnail: 'https://instagram.com/lindseyharrod/post1', caption: 'sdafasfasdf'},{id: 'asddf', url: 'https://instagram.com/lindseyharrod', thumbnail: 'https://instagram.com/lindseyharrod/post1', caption: 'sdafasfasdf'}, {id: 'gdsafd', url: 'https://instagram.com/lindseyharrod', thumbnail: 'https://instagram.com/lindseyharrod/post1', caption: 'sdafasfasdf'},{id: 'gg', url: 'https://instagram.com/lindseyharrod', thumbnail: 'https://instagram.com/lindseyharrod/post1', caption: 'sdafasfasdf'},{id: 'eweweewwqqqaasssaa', url: 'https://instagram.com/lindseyharrod', thumbnail: 'https://instagram.com/lindseyharrod/post1', caption: 'sdafasfasdf'},{id: 'bvvvbflarpojings', url: 'https://instagram.com/lindseyharrod', thumbnail: 'https://instagram.com/lindseyharrod/post1', caption: 'sdafasfasdf'}]

export default function Instagram(props){
  const [sliderRef] = useKeenSlider({
    slidesPerView: 5,
    mode: "free",
    spacing: 15,
    loop: true,
  })
//   const gramz = useInsta()
  return (
  <InstagramContainer>
          <Wrap ref={sliderRef} className="keen-slider">
            {gramz.map(gram => (

      <a key={gram.id} href={gram.url} className="keen-slider__slide number-slide1"><img className="img" key={gram.id} src={gram.thumbnail} alt={gram.caption} /></a>
     
        ))}   </Wrap>
        {/* <img height="300" width="auto" style={{right: '15%', zIndex: 30, position: 'absolute', transform: 'translateY(-160px) rotate(-4deg)'}} src="../static/img/lindsey-harrod-instagram.svg" alt="lindsey harrod instagram" /> */}
        </InstagramContainer>
  )
}
