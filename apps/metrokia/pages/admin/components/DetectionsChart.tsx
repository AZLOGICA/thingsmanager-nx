import { Title } from '@thingsmanager-nx/common-ui';
import { parseMicrosecondsAsDate } from 'apps/metrokia/utils/date';
import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  data: any;
  dateFilter: string;
}
function DetectionsChart({ data, dateFilter }: Props) {
  const dateName = useMemo(() => {
    var _name = '';
    if (dateFilter == 'today') {
      _name = 'Horas';
    }
    return _name;
  }, [data]);

  const lastPersonsData = useMemo(() => {
    const _data = [];
    const _dataObj = {};

    data.logs.map((log: any, i) => {
      const date: Date = parseMicrosecondsAsDate(log.ts_appeared);

      let key = '';
      if (dateFilter == 'today') {
        key = date.getHours().toString();
      }
   
      if (!_dataObj[key]) {
        _dataObj[key] = {
          name: key,
          count: 0,
        };
      }
      _dataObj[key].count++;
    });

    Object.entries(_dataObj).map(([key, entry]) => {
      _data.push(entry);
    });

    return _data;
  }, [data]);

  return (
    <>
      <div className="my-4">
        <Title title={'Frecuencia de detecciones por ' + dateName} />
      </div>
      <ResponsiveContainer height={330}>
        <AreaChart
          data={lastPersonsData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value={dateName} offset={0} position="insideBottom" />
          </XAxis>
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            name="NÚMERO DE DETECCIONES"
            stroke="#075985" fill="#60a5fa"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

export default DetectionsChart;
