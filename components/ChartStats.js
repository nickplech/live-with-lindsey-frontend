import React, { PureComponent } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts'
import styled from 'styled-components'

const Wrap = styled.div`
width: 100%;
height: 100%;
border-radius: 15px;
 
padding: 0;
margin: 0 auto;

`
  
const data = [
  {
    name: 'Sun',
    currentweek: 20,
    lastweek: 35,
    amt: 30,
  },
  {
    name: 'Mon',
    currentweek: 20,
    lastweek: 18,
    amt: 22,
  },
  {
    name: 'Tue',
    currentweek: 20,
    lastweek: 90,
    amt: 20,
  },
  {
    name: 'Wed',
    currentweek: 17,
    lastweek: 38,
    amt: 20,
  },
  {
    name: 'Thu',
    currentweek: 12,
    lastweek: 0,
    amt: 21,
  },
  {
    name: 'Fri',
    currentweek: 20,
    lastweek: 30,
    amt: 25,
  },
  {
    name: 'Sat',
    currentweek: 22,
    lastweek: 0,
    amt: 20,
  },
]


export default class ChartStats extends PureComponent {

  render() {
    return (
      <Wrap style={{ width: '100%', height: '180px', gridRow: '2', gridColumn: '1/4' }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 30,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="15%" stopColor="#ffd7d4" stopOpacity={0.5}/>
      <stop offset="85%" stopColor="#ffd7d4" stopOpacity={0}/>
    </linearGradient>
    </defs>
            
            {/* <XAxis dataKey="name" /> */}
     
            <Tooltip />
            <XAxis dataKey="name">
    <ReferenceDot value="days" offset={0} position="insideBottom" />
  </XAxis>
            <Area type="monotone" dataKey="currentweek" strokeWidth="2" stroke="#f8b0b0" fillOpacity={1} fill="url(#colorUv)" >
         </Area>
          </AreaChart>
        </ResponsiveContainer>
      </Wrap>
    )
  }
}
 