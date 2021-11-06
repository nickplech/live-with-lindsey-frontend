
 
  import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

  
const data = [
  {
    name: 'Sun',
    currentweek: 60,
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
    currentweek: 27,
    lastweek: 38,
    amt: 20,
  },
  {
    name: 'Thu',
    currentweek: 0,
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
    currentweek: 30,
    lastweek: 0,
    amt: 20,
  },
];


export default class ChartStats extends PureComponent {

  render() {
    return (
      <div style={{ width: '100%', height: 150 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#f8b0b0" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#f8b0b0" stopOpacity={0}/>
    </linearGradient>
    </defs>
            
            {/* <XAxis dataKey="name" /> */}
     
            <Tooltip />
            <Area type="monotone" dataKey="currentweek" stroke="#f8b0b0" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
 