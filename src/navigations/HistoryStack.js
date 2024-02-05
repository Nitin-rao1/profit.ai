import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";import Inventory from "../screens/Inventory/Inventory";
import LogBook from "../screens/LogBook/LogBook";
import History from "../screens/History/History";
;

const Stack = createNativeStackNavigator();

export default function HistoryStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name={'History'} component={History} />
        {/* <Stack.Screen name={navigationStrings.PRODUCT_DETAILS} component={ProductDetails} /> */}
      </Stack.Navigator>
    );
  }