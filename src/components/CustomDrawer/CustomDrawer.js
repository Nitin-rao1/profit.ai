import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './styles'; // Import the external stylesheet
import colors from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../redux/slices/SessionUser';
import Icons from '../Icons/Icons';
import { scale } from 'react-native-size-matters';
import DeleteAccountModal from '../Modal/DeleteAccountModal/DeleteAccountModal';

const CustomDrawer = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.users.users);
  console.log('userInfbbvubuvuvuo', userInfo);
  const userProfilePic = userInfo.profilePic;
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);


  const sessionExpire = () => {
    dispatch(logoutUser());
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthStack'}],
    });
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <View style={styles.logoWrapper}>
            <Image
              source={{uri: userProfilePic}}
              // source={require('../../assets/images/Drawer/user200.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.brandName, {color: colors.black}]}>
              {userInfo?.business_profile_data?.business_name}
            </Text>
            <Text style={[styles.brandSlogan, {color: colors.black}]}>
              {userInfo?.business_profile_data?.email}
            </Text>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <DrawerItemList {...props}
         itemStyle={{ borderRadius: scale(10) }}
         activeBackgroundColor={colors.primary}
         activeTintColor={colors.white}
         inactiveTintColor="#333"
          />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
         onPress={() => setDeleteModalVisible(true)}
          style={styles.logoutButton}>
          <View style={styles.logoutButtonContent}>
            <Icons
              iconType={'MaterialCommunityIcons'}
              name="delete-outline"
              size={25}
              color={'#FF0000'}
              style={{marginLeft: scale(11)}}
            />
            <Text style={styles.logoutText}>Delete Account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // sessionExpire();
          }}
          style={styles.logoutButton}>
          <View style={styles.logoutButtonContent}>
            <Ionicons
              name="exit-outline"
              size={22}
              color={'#FF0000'}
              style={styles.logoutIcon}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
      <DeleteAccountModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
      />
    </View>
  );
};

export default CustomDrawer;
