import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import TabRoutes from './TabRoutes';
import HomeStack from './HomeStack';
import InventoryStack from './InventoryStack';
import History from '../screens/History/History';
import HistoryStack from './HistoryStack';
import LogBookStack from './LogBookStack';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {POPPINS_REGULAR} from '../constants/constants';
import {scale} from 'react-native-size-matters';
import Profile from '../screens/Profile/Profile';
import Icons from '../components/Icons/Icons';
import Myprofile from '../assets/svg/Myprofile.svg';
import Checklists from '../assets/svg/Checklists.svg';
import Gst from '../assets/svg/Gst.svg';
import Sale from '../assets/svg/Sale.svg';
import Reports from '../screens/Reports/Reports';
import Gstform from '../screens/GstForm/Gstform';
import Bank from '../screens/Bank/Bank';
import OnlineStore from '../screens/OnlineStore/OnlineStore';
import colors from '../constants/colors';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          // backgroundColor: 'red',
          // borderRadius: 20,
        },
        drawerItemStyle: {
          borderRadius: scale(10),
          // backgroundColor: '#FFFFFF',
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,

          // elevation: 5,
          marginVertical: 5,
        },
        headerShown: false,
        drawerActiveBackgroundColor: colors.primary,
        // drawerActiveTintColor: '#000000',
        drawerActiveTintColor: colors.white,
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -20,
          fontFamily: POPPINS_REGULAR,
          fontSize: scale(15),
        },
      }}
      initialRouteName="TabRoutes">
      <Drawer.Screen
        name="TabRoutes"
        component={TabRoutes}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({color}) => (
            <Icons
              iconType={'Feather'}
              name="home"
              size={scale(22)}
              color={color}
              style={{marginLeft: scale(15)}}
            />
          ),
          onPress: () => navigation.navigate('Reports'),
        }}
      />
      <Drawer.Screen
        name="Reports"
        component={Reports}
        options={{
          drawerLabel: 'Reports',
          drawerIcon: ({color}) => (
            <Icons
              iconType={'Feather'}
              name="file-text"
              size={scale(22)}
              color={color}
              style={{marginLeft: scale(15)}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Gstform"
        component={Gstform}
        options={{
          drawerLabel: 'GST Filing form',
          drawerIcon: ({color}) => (
            <Gst width={scale(22)} height={scale(22)} marginLeft={scale(15)} />
          ),
        }}
      />


      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({color}) => (
            <Icons
              iconType={'FontAwesome'}
              // name="settings-outline"
              name="user-o"
              size={scale(22)}
              color={color}
              style={{marginLeft: scale(15)}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="OnlineStore"
        component={OnlineStore}
        options={{
          drawerIcon: ({color}) => (
            <Icons
              iconType={'MaterialIcons'}
              name="storefront"
              size={22}
              color={color}
              style={{marginLeft: scale(15)}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Bank"
        component={Bank}
        options={{
          drawerIcon: ({color}) => (
            <Icons
              iconType={'MaterialCommunityIcons'}
              name={'bank-outline'}
              size={22}
              color={color}
              style={{marginLeft: scale(15)}}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
