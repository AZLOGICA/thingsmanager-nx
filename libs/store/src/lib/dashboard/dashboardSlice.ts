import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  today: null as any,
  week: null as any,
  // month: [] as any,

  isLoadingToday: false,
  isLoadingWeek: false,
  //  isLoadingMonth: false,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    loadingToday: (state) => {
      state.isLoadingToday = true;
    },
    loadingWeek: (state) => {
      state.isLoadingToday = true;
    },

    setToday: (state, { payload }) => {
      state.today = payload;
      state.isLoadingToday = false;
    },

    setWeek: (state, { payload }) => {
      state.week = payload;
      state.isLoadingWeek = false;
    },
  },
});

export const { loadingToday, loadingWeek, setToday, setWeek } =
  dashboardSlice.actions;
