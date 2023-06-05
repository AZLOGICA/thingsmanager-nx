import { Title } from '@thingsmanager-nx/common-ui';
import { parseMicrosecondsDate } from 'apps/metrokia/utils/date';
import { useMemo } from 'react';

interface Props {
  data: any;
}
function LastPersonsDetected({ data }: Props) {
  const lastPersonsData = useMemo(() => {
    const _data = [];
    const _dataObj = {};
    data.logs.map((log: any, i) => {
      log.persons.map((person) => {
        if (!_dataObj[person.guid]) {
          _dataObj[person.guid] = {
            name: person.name,
            index: i,
            date: parseMicrosecondsDate(log.ts_appeared),
          };
        }
      });
    });

    Object.entries(_dataObj).map(([key, entry]) => {
      _data.push(entry);
    });

    return _data;
  }, [data]);

  return (
    <article className="shadow-lg rounded-md bg-white p-7">
      <div className="flex items-center gap-4 my-4">
        <div>
          <Title
            title='Últimas personas detectadas'
          />    
        </div>
      </div>

      <ul className="mt-4 space-y-2 max-h-96 overflow-y-scroll">
        {lastPersonsData.map((person) => (
          <li>
            <div className="block h-full rounded-lg border border-gray-700 p-4 hover:border-primary">
              <strong className="font-medium text-slate-900">{person.name}</strong>

              <p className="mt-1 text-xs font-medium text-slate-600">
                Última vez detectada: {person.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default LastPersonsDetected;
