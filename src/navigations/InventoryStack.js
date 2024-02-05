import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";import Inventory from "../screens/Inventory/Inventory";
import UpdateInventory from "../screens/UpdateInventory/UpdateInventory";
import NewInventory from "../screens/NewInventory/NewInventory";
;

const Stack = createNativeStackNavigator();

export default function InventoryStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name={'Inventory'} component={Inventory} />
        <Stack.Screen name={'UpdateInventory'} component={UpdateInventory} />  
        <Stack.Screen name={'NewInventory'} component={NewInventory} /> 
        {/* <Stack.Screen name={navigationStrings.PRODUCT_DETAILS} component={ProductDetails} /> */}
      </Stack.Navigator>
    );
  }