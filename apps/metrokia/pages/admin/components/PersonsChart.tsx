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
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,

    amt: 2100,
  },
];

interface Props {
  data: any;
}
function PersonsChart({data}: Props) {

    const personsData = useMemo( ()=> {
        const _data = []
        const _dataObj = {};

        data.logs.map( (log: any) => {
            log.persons.map( (person) => {
                if(!_dataObj[person.guid]){
                    _dataObj[person.guid] = {
                        name: person.name,
                        count: 0,
                    }
                }
                _dataObj[person.guid].count += 1;
            })
        });

        Object.entries(_dataObj).map( ([key,entry]) => {
            _data.push(entry);
        })

        console.log("_data", _data);
        console.log("_dataObj", _dataObj);
            

        return _data;
    }, [data])
  return (
    <>
    <div className='my-4'>
        <Title
        title='Detecciones por persona (Nombre/Detecciones)'
        />
    </div>
    <ResponsiveContainer height={300}>
      <AreaChart
        data={personsData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}

      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="count"  name='Detecciones' stroke="#075985" fill="#60a5fa" />
      </AreaChart>
    </ResponsiveContainer>
    </>
  );
}

export default PersonsChart;
