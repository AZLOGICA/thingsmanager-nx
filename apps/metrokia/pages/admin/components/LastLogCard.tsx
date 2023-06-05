import { useMemo } from 'react';
import InfoCard from './InfoCard';
import { parseMicrosecondsDate } from 'apps/metrokia/utils/date';

interface Props {
  data: any;
}

function LastLogCard({ data }: Props) {
  const lastLog = useMemo(() => {
    let _log = null;

    if(data.logs.length > 0) {
      _log = data.logs[0];
    }
    return _log;
  }, [data]);

  return <InfoCard title="Última fecha de log" value={lastLog ? parseMicrosecondsDate(lastLog.ts_appeared) : ""} />;
}

export default LastLogCard;