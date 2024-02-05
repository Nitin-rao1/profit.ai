// const {createSlice} = require('@reduxjs/toolkit');

// const WishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState: {
//     data: [],
//   },
//   reducers: {
//     addItemToWishList(state, action) {
//       let tempData = state.data;
//       tempData.push(action.payload);
//       state.data = tempData;
//     },
//     removeItemFromCarta(state, action) {
//       let tempData = state.data;
//       tempData.splice(action.payload, 1);

//       state.data = tempData;
//     },
//   },
// });
// export const {addItemToWishList,removeItemFromCarta} = WishlistSlice.actions;
// export default WishlistSlice.reducer;


const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
const LOGOUT_TOGGLE_FAVORITE = 'LOGOUT_TOGGLE_FAVORITE';
const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';



export const addToFavorite = (item) => {
  return {
    type: ADD_TO_FAVORITE,
    payload: {item},
  };
};

export const toggleFavorite = (itemId) => ({
  type: TOGGLE_FAVORITE,
  itemId,
});
export const logoutToggleFavorite = () => ({
  type: LOGOUT_TOGGLE_FAVORITE,
});
export const initialState = {
  wishList: [],
  wishListID:[]
};

export const wishLists = (state = initialState, action) => {
  switch (action.type) {
  
    case TOGGLE_FAVORITE: {
      const { itemId } = action;
      const updatedWishList = [...state.wishList]; // Copy the existing wishlist array

      const index = updatedWishList.indexOf(itemId);
      if (index !== -1) {
        updatedWishList.splice(index, 1); // If the string ID exists, remove it from the wishlist
      } else {
        updatedWishList.push(itemId); // If the string ID doesn't exist, add it to the wishlist
      }

      return {
        ...state,
        wishList: updatedWishList,
      };
    }
    case ADD_TO_FAVORITE:
      const {item} = action.payload;
      const updatedProductList = [...state.wishList];
      const updatedProductListID = [...state.wishListID];
      // console.log("item,item",item.id);
      // console.log("updatedProductList,updatedProductList",updatedProductList);
      const existingItemIndex = updatedProductList.findIndex(
        cartItem => cartItem.id === item.id,
      );
      // console.log("wwwwwwwwwwww");

      if (existingItemIndex !== -1) {
        console.log("existingItemIndex");
       const removeData =  updatedProductList.filter(
          cartItem => cartItem.id !== item.id,
        )
        const removeDataID =  updatedProductListID.filter(
          cartItem => cartItem !== item.id,
        )
        return {
          ...state,
          wishList: removeData,
          wishListID:removeDataID,
        };
       
      } else {
        console.log("not");

        // Item doesn't exist in the cart, add it
        updatedProductList.push(item);
        updatedProductListID.push(item.id)
        return {
          ...state,
          wishList: updatedProductList,
          wishListID:updatedProductListID,
        };
      }

      // Combine items with the same id and update the state
      // const combinedProductList = updatedProductList.reduce(
      //   (accumulator, currentItem) => {
      //     const existingItem = accumulator.find(
      //       item => item.item.id === currentItem.item.id,
      //     );
      //     if (existingItem) {
      //       existingItem.quantity += currentItem.quantity;
      //     } else {
      //       accumulator.push(currentItem);
      //     }
      //     return accumulator;
      //   },
      //   [],
      // );

     
    case LOGOUT_TOGGLE_FAVORITE : {
      return initialState
    }
    default:
      return state;
  }
};


// const LOGOUT_TOGGLE_FAVORITE = 'LOGOUT_TOGGLE_FAVORITE';
// const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';

// export const addToFavorite = item => {
//   return {
//     type: ADD_TO_FAVORITE,
//     payload: {item},
//   };
// };

// export const logoutToggleFavorite = () => ({
//   type: LOGOUT_TOGGLE_FAVORITE,
// });
// export const initialState = {
//   wishList: [],
//   wishListID:[],
// };

// export const wishLists = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TO_FAVORITE:
//       const {item} = action.payload;

//       if (state.wishListID.includes(item.id)) {
//         return {
//           ...state,
//           wishList: state.wishList.filter(
//             cartItem => cartItem.id !== item.id,
//           ),
//           wishListID: state.wishList.filter((data) => data !== item.id )
//         };
//       } else {
//         // Item doesn't exist in the cart, add it
//         console.log("eeeeee");
//         return {
//           ...state,
//           wishList: state.wishList.concat(item),
//           wishListID: state.wishList.concat(item.id)
//         };
//       }

//     case LOGOUT_TOGGLE_FAVORITE: {
//       return initialState;
//     }
//     default:
//       return state;
//   }
// };