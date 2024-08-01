// src/redux/reducers.js

import {
    SET_SELECTED_COUNTRY,
    SET_SELECTED_GENDER,
    SET_SORT_COLUMN,
    TOGGLE_SORT_ORDER,
  } from "./actions";
  
  const initialState = {
    selectedCountry: "country",
    selectedGender: "Gender",
    sortColumn: "id", // default sorting column
    sortOrder: "asc", // default sorting order
  };
  
  const filterReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SELECTED_COUNTRY:
        return {
          ...state,
          selectedCountry: action.payload,
        };
      case SET_SELECTED_GENDER:
        return {
          ...state,
          selectedGender: action.payload,
        };
      case SET_SORT_COLUMN:
        return {
          ...state,
          sortColumn: action.payload,
          sortOrder:
            state.sortColumn === action.payload ? (state.sortOrder === "asc" ? "desc" : "asc") : "asc",
        };
      case TOGGLE_SORT_ORDER:
        return {
          ...state,
          sortOrder: state.sortOrder === "asc" ? "desc" : "asc",
        };
      default:
        return state;
    }
  };
  
  export default filterReducer;
  