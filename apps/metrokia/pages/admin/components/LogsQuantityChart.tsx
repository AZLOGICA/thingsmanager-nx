import {useMemo} from 'react';
import InfoCard from './InfoCard';

interface Props {
  data: any;
}

function LogsQuantityChart({ data }: Props) {


  const totalLogs = useMemo( ()=> {
      return data.logs.length;
  }, [data])
  
  return (
    <InfoCard 
      title='Logs en total'
      value={totalLogs}
    />
  );
}

export default LogsQuantityChart;
