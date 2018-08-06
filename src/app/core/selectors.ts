import { State } from './reducer-map';
import { createSelector } from '@ngrx/store';
import { AppState } from './reducers';

const getState = (state: State) => state.app;
const loading = (state: AppState) => state.loading ;
const data = (state: AppState) => state.data;

export const AppSelectors = {
  loading: createSelector(getState, loading),
  data: createSelector(getState, data),
};

export const selectUsers = (country: string, gender: string) => createSelector(
  getState,
  (state: AppState) => state.data.filter(user => {

    if (country === 'All' && gender === 'All') {
      return true;
    }

    if (country !== 'All' && gender === 'All') {
      return (user.nat === country);
    }

    if (country === 'All' && gender !== 'All') {
      return (user.gender === gender);
    }

    return (user.nat === country && user.gender === gender);
  })
);
