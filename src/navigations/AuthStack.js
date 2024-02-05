import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnbordingScreen from '../screens/WelcomeScreen/OnbordingScreen';
import Otpverification from '../screens/Otpverification/Otpverification';
import Singin from '../screens/Singin/Singin';
import Verifications from '../screens/Verification/Verifications';
import Business from '../screens/BusinessInformation/Business';
import Gstscreen from "../screens/Gstscreen/Gstscreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={'OnbordingScreen'} >
         <Stack.Screen
        name={'OnbordingScreen'}
        component={OnbordingScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'Singin'}
        component={Singin}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'Otpverification'}
        component={Otpverification}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'Verifications'}
        component={Verifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Gstscreen'}
        component={Gstscreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Business'}
        component={Business}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name={navigationStrings.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{headerShown: false}}
      /> */}
      </Stack.Navigator>
    );
  }



