const UPDATE_INVENTRY = 'UPDATE_INVENTRY';
const LOG_OUT_INVENTRY = 'LOG_OUT_INVENTRY';
const SET_INVENTRY_DATA = 'SET_INVENTRY_DATA';

export const DUMMY_INVENTRY_DATA = [];

export const setCategoriesData = (data) => ({
  type: SET_INVENTRY_DATA,
  data,
});

export const logoutToCategories = () => ({
  type: LOG_OUT_INVENTRY,
});
//my work start
export const UpdateCategoriesData = (data) => ({
  type: UPDATE_INVENTRY,
  data,
});

//my work end
const initialState = {
  inventryList: DUMMY_INVENTRY_DATA,
};

export const inventryList = (state = initialState, action) => {
 
  switch (action.type) {
    case SET_INVENTRY_DATA:
      return {
        ...state,
        inventryList: action.data
      };
    case UPDATE_INVENTRY:
      return {
        ...state,
        inventryList: [...state.inventryList, ...action.data],
      };
    case LOG_OUT_INVENTRY: {
      return initialState
    }
    default:
      return state;
  }
};
