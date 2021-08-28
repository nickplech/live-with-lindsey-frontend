import React, {useState} from 'react';
import styled from 'styled-components'
import {format, startOfWeek, addDays} from 'date-fns'
const SelectorRow = styled.div`
position: relative;
display: flex;
flex-flow: row nowrap;
margin: 0 auto;
width: 100%;
height: 50px;
justify-content: center;
align-items: center;
`
const Day = styled.div`
display: flex;
cursor: pointer;
justify-content: center;
align-items: center;
opacity: ${props => props.isSelect ? '1' : '.6'};
width: 100%;
margin: 0 auto;
height: 100%;
font-family: 'Bison';
background: ${props => props.theme.primary};
color: grey;
font-size: 2rem;
&:hover {
flex-grow: 1;
  opacity: 1;
}
&:focus {
  opacity: 1;
}
`


function DaySelector({isSelected, addTheDays}) {
const date = new Date()
const weekStart = startOfWeek(date, {weekStartsOn: 0})
const theSelected = format(new Date(isSelected), 'eee')

const dayButtons = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return (
    <SelectorRow >
      {dayButtons.map((day,i) => {
        const dayOfWeek = addDays(weekStart, i )
        return <Day onClick={() => addTheDays(dayOfWeek)} isSelect={theSelected === day }  key={i}><p>{day}</p></Day>
      })}
    </SelectorRow>
  );
}

export default DaySelector;