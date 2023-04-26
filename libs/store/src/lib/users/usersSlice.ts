import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    users: [] as any[],
    totalCount: null,
    actualPage: 0,
    cursor: null,
    hasMore: true,
    dataByPage: [] as any,
    data: [],
    item: null as any | null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadingUsers: ( state ) => {
        state.isLoading = true;
    },
    errorLoadingUsers: (state) => {
        state.isLoading = false;
    },
    setUsers: (state, { payload }) => {
        console.log("setUsers",payload)
        state.isLoading = false;
        state.users = [...state.users,  ...payload.users]
        if(payload.totalCount) state.totalCount = payload.totalCount;
        state.cursor = payload.cursor;
         if(payload.hasMore != null) state.hasMore = payload.hasMore;
    },
    setUsersData: (state, {payload}) => {
        state.data = payload;
    },
    setUsersDataByPage: (state, {payload}) => {
        state.dataByPage[payload.pageIndex] = payload.data;
    },

    setUser: (state, {payload}) => {
        state.isLoading = false;
        state.item = payload;
    },
    updateUser: (state, {payload}) => {
        state.dataByPage = [];
        state.actualPage = 0;
        state.cursor = null;
        state.data = []
        state.totalCount = null;
    },
  },
});

export const {
    loadingUsers, 
    errorLoadingUsers,
    setUsers,
    setUsersData,
    setUsersDataByPage,
    setUser,
    updateUser
} = usersSlice.actions;
