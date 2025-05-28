'use client';

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoading } from '../../globalSlice';

const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;


const initialState = {
  data: [],
  status: false,
  filteredEvents: [],
  nearByEvents: [],
  eventPaginationInfo: {
    currentPage: 1,
    perPage: 1,
    total: 0,
    totalPages: 0,
    error: null,
  },
  filterFormValues: {
    dateFrom: null,
    dateTo: null,
    category: 'all-events',
    sortBy: '',
    search: '',
    type: '',
  },
};

const eventFilterSlice = createSlice({
  name: 'eventFilterSlice',
  initialState,
  reducers: {
    setEventFilterData(state, action) {
      state.data = action.payload;
    },
    setFilteredEvents(state, action) {
      state.filteredEvents = action.payload;
    },
    setEventPaginationInfo(state, action) {
      state.eventPaginationInfo = { ...action.payload };
    },
    setFilterFormValues(state, action) {
      state.filterFormValues = { ...action.payload };
    },
    resetFilterFormValues(state) {
      state.filterFormValues = {
        dateFrom: null,
        dateTo: null,
        category: 'all-events',
        sortBy: '',
        search: '',
        type: '',
      };
    },
    setNearbyData(state, action) {
      state.nearByEvents = action.payload;
    },
    setFilterCurrentPage(state, action) {
      state.eventPaginationInfo.currentPage = action.payload;
    },
  },
});

export default eventFilterSlice.reducer;

export const {
  setEventFilterData,
  setFilteredEvents,
  setEventPaginationInfo,
  setFilterFormValues,
  resetFilterFormValues,
  setNearbyData,
  setFilterCurrentPage,
} = eventFilterSlice.actions;

// Async Thunks

export const getEventFilterData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${rootUrl}/api/web/event-categories/list`);
    if (response?.data?.data) {
      dispatch(setEventFilterData(response.data.data));
    }
  } catch (error) {
    console.error('error in event filter : ', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getFilteredEvents = (params) => async (dispatch) => {
  if (typeof params !== 'object' || params === null) {
    dispatch(setFilteredEvents([]));
    dispatch(
      setEventPaginationInfo({
        currentPage: 1,
        perPage: 1,
        total: 0,
        totalPages: 0,
        error: null,
      })
    );
    return;
  }

  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${rootUrl}/api/web/events/list`, { params });
    if (response?.data?.events) {
      dispatch(setEventPaginationInfo(response.data));
      dispatch(setFilteredEvents(response.data.events));
    }
  } catch (error) {
    console.error('error in filtered events: ', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const eventNearBy = (lat, log) => async (dispatch) => {
  try {
    const response = await axios.get(`${rootUrl}/api/web/events/list`, {
      params: { latitude: lat, longitude: log },
    });
    if (response?.data?.events) {
      dispatch(setNearbyData(response.data.events));
    }
  } catch (error) {
    console.error('error in nearby events: ', error);
  }
};
