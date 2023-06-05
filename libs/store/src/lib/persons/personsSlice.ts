import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    persons: [] as any[],
    totalCount: null,
    actualPage: 0,
    cursor: null,
    hasMore: true,
    dataByPage: [] as any,
    data: [],
    item: null as any | null
}

export const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    loadingPersons: ( state ) => {
        state.isLoading = true;
    },
    errorLoadingPersons: (state) => {
        state.isLoading = false;
    },
    setPersons: (state, { payload }) => {
        console.log("setUsers",payload)
        state.isLoading = false;
        state.persons = [...state.persons,  ...payload.persons]
        if(payload.totalCount) state.totalCount = payload.totalCount;
        state.cursor = payload.cursor;
         if(payload.hasMore != null) state.hasMore = payload.hasMore;
    },
    setPersonsData: (state, {payload}) => {
        state.data = payload;
    },
    setPersonsDataByPage: (state, {payload}) => {
        state.dataByPage[payload.pageIndex] = payload.data;
    },

    setPerson: (state, {payload}) => {
        state.isLoading = false;
        state.item = payload;
    },
    updatePerson: (state, {payload}) => {
        state.dataByPage = [];
        state.actualPage = 0;
        state.cursor = null;
        state.data = []
        state.totalCount = null;
    },
  },
});

export const {
    loadingPersons, 
    errorLoadingPersons,
    setPersons,
    setPersonsData,
    setPersonsDataByPage,
    setPerson,
    updatePerson
} = personsSlice.actions;
