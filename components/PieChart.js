 
import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie,  Cell, ResponsiveContainer  } from "recharts";
 

 
export default function PieChartComponent({item, total, allAccess, perLive}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [theDataState, setTheDataState] = useState([])
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  useEffect(() => {
 
   setTheDataState([{name: 'all access', value: allAccess.length}, {name: 'pay-per-live', value:  perLive.length}])
 
},[item])

    
const COLORS = ['#f8b0b0', '#ffd7d4'];
  return (
    <>
  
    <PieChart  width={300} height={240}>
    <Pie
          data={theDataState}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="##f8b0b0"
          paddingAngle={5}
          dataKey="value"
        >
          {theDataState.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
   
    </PieChart>

    <h3 style={{margin: 0}}>Total Subscribed to Live: {total}</h3>
 
  
    </>
  );
}
 
