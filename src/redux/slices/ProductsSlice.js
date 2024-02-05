const {createSlice} = require('@reduxjs/toolkit');

const ProductsSlice = createSlice({
  name: 'products',
  initialState: {},
  reducers: {
    addProducts(state, action) {
      const productsByCategory = action.payload.reduce((acc, product) => {
        // console.log('//////////////////////////////////////////////////////////////',product);
        const { category } = product;
        if (!acc[category]) {
          acc[category] = [];
          acc[category].push(product);
        }else{
          acc[category].push(product);
        }
        
        return acc;
      }, {});
      return productsByCategory;
      
      // // console.log('//////////////////////////////////////////////////////////////',action);
      // const newProducts = action.payload;
      // newProducts.forEach(product => {
      //   // console.log('//////////////////////////////////////////////////////////////',state);
      //   const category = product.category;
      //   if (!state[category]) {
      //     state[category] = [];
      //   }

      //   state[category].push(product);
      // });
    },
    increaseQuantity(state, action) {
      console.log('aaaaaaaaaaaaaaaaaaaaaiincreaseQuantity',state);
      const productCategory = action.payload.category;
      const productId = action.payload.id

      const category = state[productCategory];
      if (category){
        const productIndex = category.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
          category[productIndex].quantity += 1
        }
        
      }
    },
    decreaseQuantity(state, action) {
      const productCategory = action.payload.category;
      const productId = action.payload.id

      const category = state[productCategory];
      if (category){
        const productIndex = category.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
          category[productIndex].quantity -= 1
        }
        
      }
    },
  },
});
export const {addProducts, increaseQuantity, decreaseQuantity} = ProductsSlice.actions;
export default ProductsSlice.reducer;





















//       // console.log('statet///////////////////////////////===>',category);
     
//       // Find the product by its unique identifier (e.g., product ID)
//       const productS  = action.payload;
     
//       // const productCategory = action.payload.category;

//       // Find the category where the product belongs
//       // const category = state[productCategory];
//       // console.log('statet///////////////////////////////===>',category);
//       if (category) {
//         const productIndex = category.findIndex(product => product.id === productS.id);
//         // console.log('statet///////////////////////////////===>',productIndex);
//         if (productIndex !== -1) {
//           // Increase the quantity of the product
//           category[productIndex].quantity += 1;
//         }
// // console.log('///////////=====>',state);
      