
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductsReducer from '../slices/ProductsSlice';
import { wishLists } from '../slices/WishlistSlice';
import CartReducer from '../slices/CartSlice';
import { deliveryAddress } from '../slices/AddressSlice';
import HomeProductReducer from '../slices/HomeproductsSlice';
import usersSlices from '../slices/SessionUser';
import { categories } from '../slices/CategoriesSlice';
import { allImages } from '../slices/AllImagesSlice';
import { productCart } from '../slices/ProductsCartSlice';
import { subCategories } from '../slices/SubCategoriesSlice';
import { inventryList } from '../slices/InventrySlice';

const rootReducer = combineReducers({
  products: ProductsReducer,
  Homeproduct: HomeProductReducer,
  cart: CartReducer,
  address: deliveryAddress,
  users: usersSlices,
  categories: categories,
  images: allImages,
  wishList: wishLists,
  productCart: productCart,
  subCategories: subCategories,
  inventryList:inventryList,
  // Add other reducers here
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: { ignore: ['users','wishList','productCart', 'subCategories'] }, // Add your reducer name here
    }),
  // Add other middleware or enhancers if needed
});

export const persistor = persistStore(store);

export default store;
