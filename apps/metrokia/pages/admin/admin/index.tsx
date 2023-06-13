import React, { useCallback, useRef } from 'react';

import {
  Button,
  Table,
  TableTitleImageBuffer,
  TableTitlePersons,
  TableTitleTimestamp,
  Title,
} from '@thingsmanager-nx/common-ui';
import {
  useAppSelector,
  useAppDispatch,
  startLoadingUsers,
  startSetUsersData,
  startSetUsersDataByPage,
} from '@thingsmanager-nx/store';
import TableTitleGoTo from 'libs/common-ui/src/lib/table/components/TableTitleGoTo';
const usersColumns = [
  {
    Header: 'Usuarios',
    columns: [
      {
        Header: 'Email',
        accessor: 'id',
      },

      {
        Header: 'Nombre',
        accessor: 'name',
      },
      {
        Header: "Acción",
        editRoute: '/admin/admin/edit/',
        accessor: "moreInfo",
        Cell: TableTitleGoTo,
        disableSortBy: true,
        disableFilters: true,
      },
    ],
  },
];
function AdminPage() {
  const { isLoading, totalCount, data, dataByPage } = useAppSelector(
    (state) => state.users
  );
  const fetchIdRef = useRef(0);
  const dispatch = useAppDispatch();

  const loadMoreData = async () => {
    console.log('loadMoreData');
    const rr = await dispatch(startLoadingUsers());
    return rr;
  };

  const fetchData = useCallback(
    async ({
      pageSize,
      pageIndex,
    }: {
      pageSize: number;
      pageIndex: number;
    }) => {
      console.log('fetchData');
      if (dataByPage[pageIndex]) {
        await dispatch(startSetUsersData(dataByPage[pageIndex]));
        return;
      } else {
        const fetchId = ++fetchIdRef.current;
        if (fetchId === fetchIdRef.current) {
          const newData: any = await loadMoreData();
          await dispatch(startSetUsersDataByPage(newData, pageIndex));
          await dispatch(startSetUsersData(newData));
        }
      }
    },
    [dataByPage]
  );

  return (
    <div>
      <div className="flex pb-6 ">
        <div className="w-5/6 items-center">
          <Title title="Usuarios" />
        </div>
        <div className="w-1/6">
          <Button
            title="Añadir Usuario"
            link={'/admin/admin/new'}
            animation="scale"
          />
        </div>
      </div>

      <Table
        columns={usersColumns}
        data={data}
        fetchData={fetchData}
        loading={isLoading}
        totalSize={totalCount ? totalCount : 0}
        pageCount={totalCount ? Math.ceil(totalCount / 20) : 0}
      />
    </div>
  );
}

export default AdminPage;
