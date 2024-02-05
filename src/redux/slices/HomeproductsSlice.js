import {createSlice} from '@reduxjs/toolkit';

const HomeproductsSlice = createSlice({
  name: 'Homeproduct',
  initialState: [],
  reducers: {
    addMyProducts(state, action) {
      //   console.log('stateaddMyProducts...................', state);
      state.push(action.payload);
    },
    increaseProductCount: (state, action) => {
    //   console.log('increaseProductCount...................', state);
      let myindex = -1;
      state.map((item, index) => {
        if (item.id === action.payload) {
          myindex = index;
        }
        console.log('increaseProductCount Products...................',myindex );
      });
      if (myindex === -1) {
      } else {
        state[myindex].quantity = state[myindex].quantity + 1;
        console.log('...................',state[myindex] );
      }
      // const product = state.find((item) => item.id === action.payload);
      // console.log('increaseProductCount Products...................', product);
      // if (product) {
      //   product.count += 1;
      // }
    },
    decreaseProductCount: (state, action) => {
        let myindex = -1;
        state.map((item, index) => {
          if (item.id === action.payload) {
            myindex = index;
          }
        });
        if (myindex === -1) {
        } else {
          state[myindex].quantity = state[myindex].quantity - 1;
        }
    },
  },
});

export const {addMyProducts, increaseProductCount, decreaseProductCount} =
  HomeproductsSlice.actions;
export default HomeproductsSlice.reducer;
