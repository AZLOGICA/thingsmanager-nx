import { Title } from '@thingsmanager-nx/common-ui';
import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

interface Props {
  data: any;
}

function LogsAndPersonsChart({ data }: Props) {

  const totalData = useMemo( ()=> {

    const _data = [
        {
            name: "Logs",
            value: data.logs.length
        },
        {   
            name: "Personas",
            value: data.persons.length 
        }
    ]
    return _data;
  },[data])

  return (
    <div>
      <div className="my-4">
        <Title title="Cantidad de eventos / Cantidad de personas detectadas" />
      </div>
      <ResponsiveContainer height={300}>
        <PieChart 
        
       
        >
          <Pie
            data={totalData}
            dataKey="value"
            nameKey="name"
            fill="#8884d8"
            label
          >
               <Cell key={`cell-${0}`} fill={'#075985'} />
               <Cell key={`cell-${1}`} fill={'#60a5fa'} />
            </Pie>
      
          <Tooltip/>
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LogsAndPersonsChart;
