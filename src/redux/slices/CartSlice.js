// import { createSlice } from '@reduxjs/toolkit';

// const CartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     data: [],
//   },
//   reducers: {
//     addItemToCart(state, action) {
//       let tempData = state.data;
//       let isItemExist = false;
//       tempData.map(item => {
//         if (item.id === action.payload.id) {
//           isItemExist = true;
//           item.qty = item.qty + 1;
//         }
//       });
//       if (!isItemExist) {
//         tempData.push(action.payload);
//       }
//       state.data = tempData;
//     },
//     reduceItemFromCart(state, action) {
//       let tempData = state.data;
//       tempData.map(item => {
//         if (item.id === action.payload.id) {
//           item.qty = item.qty - 1;
//         }
//       });
//       state.data = tempData;
//     },
//     removeItemFromCart(state, action) {
//       let tempData = state.data;
//       tempData = tempData.filter(item => item.id !== action.payload);
//       state.data = tempData;
//     },
//   },
// });

// export const { addItemToCart, reduceItemFromCart, removeItemFromCart } = CartSlice.actions;
// export default CartSlice.reducer;

// const { createSlice } = require('@reduxjs/toolkit');

// const CartSlice = createSlice({
//   name: 'products',
//   initialState: {}, // Change the initial state to an empty object
//   reducers: {
//     addItemToCart(state, action) {
//       const productsByCategory = action.payload.reduce((acc, product) => {
//         const { category } = product;
//         if (!acc[category]) {
//           acc[category] = [];
//         }
//         acc[category].push(product);
//         return acc;
//       }, {});
//       return productsByCategory; // Update the state with products organized by category
//     },
//   },
// });

// export const { addItemToCart } = CartSlice.actions;
// export default CartSlice.reducer;

// const {createSlice} = require('@reduxjs/toolkit');

// const CartSlice = createSlice({
//   name: 'cart',
//   initialState: [],
//   reducers: {
//     addItemToCart(state, action) {
//       const item = action.payload;
//       const category = item.category;

//       // Check if the item already exists in the cart
//       const existingItemIndex = state.findIndex(
//         cartItem => cartItem.id === item.id && cartItem.category === category,
//       );

//       if (existingItemIndex !== -1) {
//         // If the item already exists in the cart, update its quantity
//         state[existingItemIndex].quantity += 1;
//       } else {
//         // If the item doesn't exist in the cart, add it to the correct category
//         state.push({...item, quantity: 1});
//       }
//     },
//     reduceItemFromCart(state, action) {
//       const existingItem = state.find(item => item.id === action.payload.id);

//       if (existingItem) {
//         // If the item exists in the cart, reduce its quantity
//         existingItem.quantity -= 1;
//       }
//     },
//     removeItemFromCart(state, action) {
//       console.log('remove cccc',action);
//       const itemIdToRemove = action.payload;
//       state = state.filter(item => item.id !== itemIdToRemove);
//       // The above line creates a new state array after removing the item from the cart.
//       // We don't directly mutate the original state to ensure Redux's immutability principles are followed.
//       return state;
//     },
//   },
// });

// export const {addItemToCart, reduceItemFromCart, removeItemFromCart} =
//   CartSlice.actions;
// export default CartSlice.reducer;


// const {createSlice} = require('@reduxjs/toolkit');

// const CartSlice = createSlice({
//   name: 'cart',
//   initialState: {},
//   reducers: {
//     addItemToCart(state, action) {
//       const newProducts = action.payload;
//       // newProducts.forEach(product => {
//       //   const category = product.category;
//       //   if (!state[category]) {
//       //     state[category] = [];
//       //   }
//       //   state[category].push(product);
//       // });
//     },
//   },
// });
// export const {addItemToCart, reduceItemFromCart, removeItemFromCart} =
//   CartSlice.actions;
// export default CartSlice.reducer;


// CartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [], // Initialize cart data as an empty array
  },
  reducers: {
    addItemToCart(state, action) {
      // console.log('itemToAddstatechrck============>',state);
      const itemToAdd = action.payload;
      console.log('itemToAdd',itemToAdd);
      const existingItemIndex = state.data.findIndex(
        item => item.id === itemToAdd.id
      );
      console.log('itemToAddstatechrck============>',existingItemIndex);
      if (existingItemIndex !== -1) {
        // console.log('checkreduceItemFromCart========>',state.data[existingItemIndex].quantity);
        // If the item already exists in the cart, update its quantity
        state.data[existingItemIndex].quantity += 1;
      } else {
        // If the item doesn't exist in the cart, add it
        state.data.push({ ...itemToAdd, quantity: 1 });
      }
    },
    // increaseQty(state, action) {
    //   console.log('state================>', state);
    //   const product = action.payload;
    //   if (product) {
    //     // Find the product in the state by its id
    //     const productIndex = state.data.findIndex(item => item.id === product.id);
        
    //     console.log('increaseQuantity action', productIndex);
    //     // if (productIndex !== -1) {
    //     //   // Increase the quantity of the found product by 1
    //     //   state[productIndex].quantity += 1;
    //     // }
    //   }
    // },

    reduceItemFromCart(state, action) {
      
      const itemIdToRemove = action.payload;
      // console.log('navenn',itemIdToRemove);
      const existingItemIndex = state.data.findIndex(
        item => item.id === itemIdToRemove.id
      );

      // console.log('navenn',existingItemIndex);
      // console.log('checkreduceItemFromCart========>',state.data[existingItemIndex].quantity);
      if (existingItemIndex !== -1) {
        // If the item exists in the cart and its quantity is greater than 1, reduce its quantity
        if (state.data[existingItemIndex].quantity > 1) {
          // console.log('checkreduceItemFromCart========>',state.data[existingItemIndex].quantity);
          state.data[existingItemIndex].quantity -= 1;
        } else {
          // If the quantity is 1, remove the item from the cart
          state.data.splice(existingItemIndex, 1);
        }
      }
    },
    removeItemFromCart(state, action) {
      const itemIdToRemove = action.payload;
      state.data = state.data.filter(item => item.id !== itemIdToRemove);
    },
  },
});

export const { addItemToCart, reduceItemFromCart, removeItemFromCart ,increaseQty} = CartSlice.actions;
export default CartSlice.reducer;
