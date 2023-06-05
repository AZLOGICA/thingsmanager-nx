import { Title } from '@thingsmanager-nx/common-ui';
import { parseMicrosecondsAsDate } from 'apps/metrokia/utils/date';
import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  ZAxis,
  Legend,
  Scatter,
} from 'recharts';


const data01 = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];
const data02 = [
  { x: 200, y: 260, z: 240 },
  { x: 240, y: 290, z: 220 },
  { x: 190, y: 290, z: 250 },
  { x: 198, y: 250, z: 210 },
  { x: 180, y: 280, z: 260 },
  { x: 210, y: 220, z: 230 },
];

interface Props {
  data: any;
  dateFilter: string;
}
function PersonsDateChart({data, dateFilter }: Props) {

  const dateName = useMemo(() => {
    var _name = {
      key1: "",
      key2: ""
    };
    if (dateFilter == 'today') {
      _name.key1 = 'Horas';
      _name.key2 = 'Minutos';
    }
    return _name;
  }, [data]);
  
    const personsData = useMemo( ()=> {
        const _data = []
        const _dataObj = {};

        data.logs.map( (log: any) => {
            log.persons.map( (person) => {
                if(!_dataObj[person.guid]){
                    _dataObj[person.guid] = {
                        name: person.name,
                        logs: [],
                    }
                }
                const date: Date = parseMicrosecondsAsDate(log.ts_appeared);
                let key = 0;
                let secondKey = 0
                if (dateFilter == 'today') {
                  key = date.getHours();
                  secondKey = date.getMinutes();
                }
                _dataObj[person.guid].logs.push({
                  x: key,
                  y: secondKey,
                  z: 1
                });
            })
        });

        Object.entries(_dataObj).map( ([key,entry]) => {
            _data.push(entry);
        })


        return _data;
    }, [data])
  return (
    <>
    <div className='my-4'>
        <Title
        title='Detecciones por persona (Nombre/Detecciones)'
        />
    </div>
    <ResponsiveContainer height={700}>
    <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit={dateName.key1} />
          <YAxis type="number" dataKey="y" name="weight"  unit={dateName.key2} />
       
          <Tooltip />
          <Legend />
          {
            personsData.map( (person: any) => (
              <Scatter name={person.name} data={person.logs} fill="#8884d8" shape="star" />
            ))
          }
      
        </ScatterChart>
    </ResponsiveContainer>
    </>
  );
}

export default PersonsDateChart;
