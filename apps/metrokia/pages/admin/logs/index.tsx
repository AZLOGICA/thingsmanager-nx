import React, { useCallback , useRef } from 'react'

import { Table, Title } from '@thingsmanager-nx/common-ui';
import { useAppSelector, useAppDispatch,  startLoadingLogs, startSetLogsData, startSetLogsDataByPage, } from '@thingsmanager-nx/store'
import { logsColumns } from './logsColumns';

function LogsPage() {

    const {  isLoading, totalCount, data, dataByPage} = useAppSelector(state => state.logs)
    const fetchIdRef = useRef(0)
    const dispatch = useAppDispatch();

    const loadMoreData = async () => {
        console.log("loadMoreData")
        const rr = await dispatch(startLoadingLogs())
        return rr;
    }

    const fetchData = useCallback(async ({ pageSize, pageIndex }: { pageSize: number; pageIndex: number }) => {
        console.log("fetchData")
        if (dataByPage[pageIndex]) {
            await dispatch(startSetLogsData(dataByPage[pageIndex]))
            return
        }
        else {
            const fetchId = ++fetchIdRef.current
            if (fetchId === fetchIdRef.current) {
                const newData: any = await loadMoreData();
                await dispatch(startSetLogsDataByPage(newData, pageIndex))
                await dispatch(startSetLogsData(newData));
            }
        }
    }, [dataByPage])

    return (
        <div >
            <Title title='Logs'/>
            <Table
                columns={logsColumns}
                data={data}
                fetchData={fetchData}
                loading={isLoading}
                totalSize={totalCount ? totalCount : 0}
                pageCount={totalCount ? Math.ceil(totalCount / 20) : 0}
            />
        </div>
    )
}

export default LogsPage;