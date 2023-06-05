import { Title } from '@thingsmanager-nx/common-ui';
import React, { useMemo } from 'react';

interface Props {
  data: any;
}
function PersonsList({ data }: Props) {
  const personsData = useMemo(() => {
    let _data = [];
    const _dataObj = {};

    data.logs.map((log: any) => {
      log.persons.map((person) => {
        if (!_dataObj[person.guid]) {
          _dataObj[person.guid] = {
            name: person.name,
            count: 0,
          };
        }
        _dataObj[person.guid].count += 1;
      });
    });

    Object.entries(_dataObj).map(([key, entry]) => {
      _data.push(entry);
    });

    console.log('_data', _data);
    console.log('_dataObj', _dataObj);

    _data = _data.sort((a, b) => {
        return b.count - a.count;
    } );
    return _data;
  }, [data]);
  return (
    <>

      <article className="shadow-lg rounded-md bg-white p-7">
        <div className="flex items-center gap-4 my-4">
          <div>
            <Title title="Personas detectadas" />
          </div>
        </div>

        <ul className="mt-4 space-y-2 max-h-72 overflow-y-scroll">
          {personsData.map((person) => (
            <li>
              <div className="block h-full rounded-lg border border-gray-700 p-4 hover:border-primary">
                <strong className="font-medium text-slate-900">
                  {person.name}
                </strong>

                <p className="mt-1 text-xs font-medium text-slate-600">
                  Detecciones: {person.count}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}

export default PersonsList;
