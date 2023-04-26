import React, { useCallback , useRef } from 'react'

import { Table, Title } from '@thingsmanager-nx/common-ui';
import { useAppSelector, useAppDispatch, startLoadingUsers, startSetUsersData, startSetUsersDataByPage} from '@thingsmanager-nx/store'
import { usersColumns } from './usersColumns';
export const UsersPage = () => {

    const {  isLoading, totalCount, data, dataByPage} = useAppSelector(state => state.users)
    const fetchIdRef = useRef(0)
    const dispatch = useAppDispatch();

    const loadMoreData = async () => {
        console.log("loadMoreData")
        const rr = await dispatch(startLoadingUsers())
        return rr;
    }

    const fetchData = useCallback(async ({ pageSize, pageIndex }: { pageSize: number; pageIndex: number }) => {
        console.log("fetchData")
        if (dataByPage[pageIndex]) {
            await dispatch(startSetUsersData(dataByPage[pageIndex]))
            return
        }
        else {
            const fetchId = ++fetchIdRef.current
            if (fetchId === fetchIdRef.current) {
                const newData: any = await loadMoreData();
                await dispatch(startSetUsersDataByPage(newData, pageIndex))
                await dispatch(startSetUsersData(newData));
            }
        }
    }, [dataByPage])

    return (
        <div >
            <Title title='Usuarios'/>
            <Table
                columns={usersColumns}
                data={data}
                fetchData={fetchData}
                loading={isLoading}
                totalSize={totalCount ? totalCount : 0}
                pageCount={totalCount ? Math.ceil(totalCount / 10) : 0}
            />
        </div>
    )
}
