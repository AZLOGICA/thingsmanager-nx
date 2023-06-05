import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    logs: [] as any[],
    totalCount: null,
    actualPage: 0,
    cursor: null,
    hasMore: true,
    dataByPage: [] as any,
    data: [],
    item: null as any | null
}

export const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    loadingLogs: ( state ) => {
        state.isLoading = true;
    },
    errorLoadingLogs: (state) => {
        state.isLoading = false;
    },
    setLogs: (state, { payload }) => {
        console.log("setUsers",payload)
        state.isLoading = false;
        state.logs = [...state.logs,  ...payload.logs]
        if(payload.totalCount) state.totalCount = payload.totalCount;
        state.cursor = payload.cursor;
         if(payload.hasMore != null) state.hasMore = payload.hasMore;
    },
    setLogsData: (state, {payload}) => {
        state.data = payload;
    },
    setLogsDataByPage: (state, {payload}) => {
        state.dataByPage[payload.pageIndex] = payload.data;
    },

    setLog: (state, {payload}) => {
        state.isLoading = false;
        state.item = payload;
    },
    updateLog: (state, {payload}) => {
        state.dataByPage = [];
        state.actualPage = 0;
        state.cursor = null;
        state.data = []
        state.totalCount = null;
    },
  },
});

export const {
    loadingLogs, 
    errorLoadingLogs,
    setLogs,
    setLogsData,
    setLogsDataByPage,
    setLog,
    updateLog
} = logsSlice.actions;
