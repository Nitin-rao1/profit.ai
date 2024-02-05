import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import History from "../screens/History/History";



const Stack = createNativeStackNavigator();

export default function HomeStack() {

    return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home' >
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'History'} component={History} />
      </Stack.Navigator>
    );
  }