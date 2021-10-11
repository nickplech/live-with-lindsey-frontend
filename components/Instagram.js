import React, {useState, useEffect} from 'react'
 import styled from 'styled-components'

 const InstagramContainer = styled.div`
 display: flex;
 margin: 0 auto;
 justify-content: center;
 align-items: center;
  a {
      margin: 10px;
      height: 150px;
      width: 150px;
      background: lightgray;
  }
  img {
    height: 150px;
      width: 150px;
  }
 `
 function useInsta() {
    const [posts, setPosts] = useState([])

    useEffect(()=> {
        fetch(url).then(res => res.json()).then(data => {
            setPosts(data)
        })
    }, [])
    return posts
}
 
export default function Instagram() {
    const gramz = useInsta()
    return(
        <InstagramContainer>
            {gramz.map(gram => (
                <a href={gram.url}><img key={gram.id} src={gram.thumbnail} alt={gram.caption} /></a>
            ))}
        </InstagramContainer>
    )
}