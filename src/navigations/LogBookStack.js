import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogBook from "../screens/LogBook/LogBook";
import CustomerDetails from "../screens/CustomerDetails/CustomerDetails";
import Payment from "../screens/PaymentMethod/Payment";
;

const Stack = createNativeStackNavigator();

export default function LogBookStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name={'LogBook'} component={LogBook} />
        <Stack.Screen name={'CustomerDetails'} component={CustomerDetails} />
        {/* <Stack.Screen name={'Invoice'} component={Invoice} /> */}
        {/* <Stack.Screen name={'Payment'} component={Payment} /> */}
        {/* <Stack.Screen name={navigationStrings.PRODUCT_DETAILS} component={ProductDetails} /> */}
      </Stack.Navigator>
    );
  }