import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Sun',
      currentweek: 60,
      lastweek: 35,
      amt: 30,
    },
    {
      name: 'Mon',
      currentweek: 30,
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
      currentweek: 10,
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
  
  export default class ChartStats extends React.PureComponent {
 
  
    render() {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
       
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 20,
              bottom: 0,
            }}
          >
       
            <XAxis dataKey="name" />
          
            <Tooltip />
       
            <Bar dataKey="lastweek" fill="#ffd7d4"  />
            <Bar dataKey="currentweek" fill="#f8b0b0" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  }
  