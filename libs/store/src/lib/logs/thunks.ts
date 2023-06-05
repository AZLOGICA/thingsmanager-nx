import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { AppThunk } from "../store";
import { API } from "aws-amplify";
import { getAllLogs } from "@thingsmanager-nx/graphql/metrokia-graphql";
import { loadingLogs, setLogs, setLogsData, setLogsDataByPage } from './logsSlice';


export const startLoadingLogs =
  (): AppThunk => async (dispatch, getState) => {
    dispatch(loadingLogs());
    const { cursor  } = getState().logs;
    let variables : any = {
    //  limit: 1
    }
    console.log("cursor", cursor)
    if(cursor ){
      variables.after = cursor;
    }

    console.log("variables", variables);

    const allItems: any = await API.graphql({
      query: getAllLogs,
      variables,

    },
    {
      reponseType: 'arraybuffer'
    });
    console.log("allProducts", allItems)
   
    let items: any = [];
    let totalCount = null;
    let newCursor = null;
    let hasMore = null;

    if (allItems.data?.getAllLogs?.logs) {
      newCursor = allItems.data.getAllLogs.cursor;
      if(allItems.data?.getAllLogs?.totalCount != null) totalCount = allItems.data?.getAllLogs?.totalCount
      allItems.data.getAllLogs.logs.map((item: any) => {
        items.push(item)
      })
      if (allItems.data.getAllLogs.logs.length < 20) hasMore = false;
      else hasMore = true;
    }
   
    await dispatch(setLogs({logs: items, totalCount, cursor: newCursor, hasMore}));

    return items;
  
  };

  export const startSetLogsData =
  (data: any): AppThunk =>
  async (dispatch, getState) => {
    await dispatch(setLogsData(data));
  };

  export const startSetLogsDataByPage =
  (data: any, pageIndex: number): AppThunk =>
  async (dispatch, getState) => {
    await dispatch(setLogsDataByPage({data, pageIndex}));
  };





