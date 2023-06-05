import React, { useCallback , useRef } from 'react'

import { Table, Title } from '@thingsmanager-nx/common-ui';
import { useAppSelector, useAppDispatch, startLoadingPersons, startSetPersonsData, startSetPersonsDataByPage, } from '@thingsmanager-nx/store'
import { personsColumns } from './personsColumns';
function UsersPage() {

    const {  isLoading, totalCount, data, dataByPage} = useAppSelector(state => state.persons)
    const fetchIdRef = useRef(0)
    const dispatch = useAppDispatch();

    const loadMoreData = async () => {
        console.log("loadMoreData")
        const rr = await dispatch(startLoadingPersons())
        return rr;
    }

    const fetchData = useCallback(async ({ pageSize, pageIndex }: { pageSize: number; pageIndex: number }) => {
        console.log("fetchData")
        if (dataByPage[pageIndex]) {
            await dispatch(startSetPersonsData(dataByPage[pageIndex]))
            return
        }
        else {
            const fetchId = ++fetchIdRef.current
            if (fetchId === fetchIdRef.current) {
                const newData: any = await loadMoreData();
                await dispatch(startSetPersonsDataByPage(newData, pageIndex))
                await dispatch(startSetPersonsData(newData));
            }
        }
    }, [dataByPage])

    return (
        <div >
            <Title title='Usuarios'/>
            <Table
                columns={personsColumns}
                data={data}
                fetchData={fetchData}
                loading={isLoading}
                totalSize={totalCount ? totalCount : 0}
                pageCount={totalCount ? Math.ceil(totalCount / 50) : 0}
            />
        </div>
    )
}

export default UsersPage;