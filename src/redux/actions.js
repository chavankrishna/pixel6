// src/redux/actions.js

export const SET_SELECTED_COUNTRY = "SET_SELECTED_COUNTRY";
export const SET_SELECTED_GENDER = "SET_SELECTED_GENDER";

export const setSelectedCountry = (country) => ({
  type: SET_SELECTED_COUNTRY,
  payload: country,
});

export const setSelectedGender = (gender) => ({
  type: SET_SELECTED_GENDER,
  payload: gender,
});

export const SET_SORT_COLUMN = "SET_SORT_COLUMN";
export const TOGGLE_SORT_ORDER = "TOGGLE_SORT_ORDER";

export const setSortColumn = (column) => ({
  type: SET_SORT_COLUMN,
  payload: column,
});

export const toggleSortOrder = () => ({
  type: TOGGLE_SORT_ORDER,
});
