import { TableTitleGender, TableTitleTimestamp } from '@thingsmanager-nx/common-ui';

export const personsColumns = [
  {
    Header: 'Usuarios',
    columns: [
      /*
      {
        Header: 'Id',
        accessor: 'guid',
      },
      */
      {
        Header: 'Nombre',
        accessor: 'name',
      },
      {
        Header: 'Género',
        accessor: 'gender',
        Cell: TableTitleGender,
      },

      {
        Header: 'Fecha de creación',
        accessor: 'created_ts',
        Cell: TableTitleTimestamp,
      },
      
    ],
  },
];
