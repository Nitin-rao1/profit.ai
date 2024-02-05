const SET_ALLIMAGES = 'SET_ALLIMAGES';
const LOGOUT_ALLIMAGES = 'LOGOUT_ALLIMAGES';
const UPDATE_ALLIMAGES = 'UPDATE_ALLIMAGES';

export const DUMMY_ALLIMAGES = [];

export const setAllImages = (data) => ({
  type: SET_ALLIMAGES,
  data,
});

export const logoutAllImages = () => ({
  type: LOGOUT_ALLIMAGES,
});
//my work start
export const UpdateAllImages = (data) => ({
  type: UPDATE_ALLIMAGES,
  data,
});

//my work end
const initialState = {
  images: DUMMY_ALLIMAGES,
};

export const allImages = (state = initialState, action) => {
 
  switch (action.type) {
    case SET_ALLIMAGES:
      return {
        ...state,
        images: action.data,
        // Categories: action.data,
      };
    case UPDATE_ALLIMAGES:
      return {
        ...state,
        images: Object.assign(state.images, action.data),
      };
    case LOGOUT_ALLIMAGES: {
      return initialState
    }
    default:
      return state;
  }
};
