import React, {useState} from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

export default function MarkToWatch() {
    const [activeMarkToWatch, setActiveMarkToWatch] = useState(false)
function toggleMarkToWatch(){
    setActiveMarkToWatch(prev => !prev)
    toast(`Video added to "Watch-list"!`)
}
    return (
        <Img onClick={toggleMarkToWatch} activeMarkToWatc={activeMarkToWatch} src={`../static/img/alarm-clock${activeMarkToWatch ? '-selected' : ''}.png`} alt="flag video for watch-later list" />
         
     
    )
}

const Img = styled.img`
position: relative;
display: flex;
height: 22px;
cursor: pointer;
width: 22px;
bottom: 7px;
 right: 44px;
 z-index: 99999;
    margin: 5px;
    position: absolute;
    transition: 0.2s;
    user-select: none;
fill: ${props => props.activeMarkToWatc ? props.theme.third : props.theme.second};
`
