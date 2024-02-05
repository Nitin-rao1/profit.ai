import React, {useEffect} from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icons from '../components/Icons/Icons';
import Colors from '../constants/colors';
import {View, StyleSheet} from 'react-native';
import HomeStack from './HomeStack';
import InventoryStack from './InventoryStack';
import LogBookStack from './LogBookStack';
import HistoryStack from './HistoryStack';
import {scale} from 'react-native-size-matters';
import colors from '../constants/colors';

const BototmTab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <BototmTab.Navigator
      tabBar={tabsProps => (
        <>
          <BottomTabBar {...tabsProps} />
        </>
      )}
      screenOptions={{
        tabBarLabelPosition: BottomTabBar,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: Colors.black,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primary,
        // tabBarStyle: {
        //   display: 'flex',
        //   backgroundColor: Colors.white,
        //   top: 0,
        //   height: '8%',
        // },
      }}
      initialRouteName={'HomeStack'}>
      <BototmTab.Screen
        name={'HomeStack'}
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: scale(10),
            fontWeight: '800',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: scale(3),
          },
          tabBarIcon: ({focused}) => (
            <Icons
              name={'home'}
              iconType={'Entypo'}
              color={focused ? Colors.primary : Colors.darkText}
              size={scale(25)}
            />
          ),
        }}
      />
      <BototmTab.Screen
        name={'InventoryStack'}
        component={InventoryStack}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Inventory',
          tabBarLabelStyle: {
            fontSize: scale(10),
            fontWeight: '800',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: scale(3),
          },
          tabBarIcon: ({focused}) => (
            <Icons
              name={'list'}
              iconType={'FontAwesome'}
              color={focused ? Colors.primary : Colors.darkText}
              size={scale(20)}
            />
          ),
        }}
      />
      <BototmTab.Screen
        name={'LogBookStack'}
        component={LogBookStack}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Ledger Book',
          tabBarLabelStyle: {
            fontSize: scale(10),
            fontWeight: '800',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: scale(3),
          },
          tabBarIcon: ({focused}) => (
            <Icons
              name={'person-circle'}
              iconType={'Ionicons'}
              color={focused ? Colors.primary : Colors.darkText}
              size={scale(27)}
            />
          ),
        }}
      />
      <BototmTab.Screen
        name={'HistoryStack'}
        component={HistoryStack}
        options={{
          tabBarLabel: 'Bill Book',
          unmountOnBlur: true,
          tabBarLabelStyle: {
            fontSize: scale(10),
            fontWeight: '800',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: scale(3),
          },
          tabBarIcon: ({focused}) => (
            <Icons
              name={'swap-horizontal-circle'}
              iconType={'MaterialIcons'}
              color={focused ? Colors.primary : Colors.darkText}
              size={scale(25)}
            />
          ),
        }}
      />
    </BototmTab.Navigator>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.red,
  },
  icon: {
    // bottom:2,
    // justifyContent:'center',
    // alignItems:'center',
    // alignSelf:'center'
  },
});
