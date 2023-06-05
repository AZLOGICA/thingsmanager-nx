import { TableTitleGender, TableTitleImageBuffer, TableTitlePersons, TableTitleTimestamp } from '@thingsmanager-nx/common-ui';

export const logsColumns = [
  {
    Header: 'Logs',
    columns: [
/*
      {
        Header: 'Fecha de evento',
        accessor: 'ts_appeared',
      },*/
      {
        Header: 'Fecha de evento',
        accessor: 'ts_appeared',
        Cell: TableTitleTimestamp,
      },
      {
        Header: 'Personas identificadas',
        accessor: 'persons',
        Cell: TableTitlePersons,
      },
      
      {
        Header: 'Imagen',
        accessor: 'image',
        Cell: TableTitleImageBuffer,
      },
     /* {
        Header: 'Imagen',
        accessor: 'fir',
        Cell: TableTitleImageBuffer,
      },
*/
      
    ],
  },
];
