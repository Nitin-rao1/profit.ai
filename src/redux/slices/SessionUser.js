import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  users: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    updateUser: (state, action) => {
      return {
        ...state,
        users: {...state.users, ...action.payload},
      };
    },
    // updateUser: (state, action) => {
    //   return {
    //     ...state,
    //     users: {
    //       ...state.users,
    //       business_profile_data: {
    //         ...state.users.business_profile_data,
    //         ...action.payload,
    //       },
    //     },
    //   };
    // },
    logoutUser: state => {
      // Clear user data when the user logs out
      state.users = {};
    },
  },
});

export const {loginUser, logoutUser, updateUser} = usersSlice.actions;
export default usersSlice.reducer;
