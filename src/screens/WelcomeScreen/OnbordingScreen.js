//import liraries
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Onbordingdata from '../../components/data/Onbordingdata';
import OnbordingItem from './OnbordingItem';
import Paginator from './Paginator';
import Button from '../../components/Button';
import Colors from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import {
  POPPINS_BOLD,
  SCREEN_WIDTH,
  STANDARD_BUTTON_HEIGHT,
} from '../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/slices/SessionUser';
import { UpdateCategoriesData } from '../../redux/slices/InventrySlice';
import { setCategoriesData } from '../../redux/slices/CategoriesSlice';
import { userGetInventory } from '../../api/auth/auth';

// create a component
const OnbordingScreen = ({navigation}) => {
  const userInfo = useSelector(state => state.users.users);
  // console.log('userInfouserInfo', userInfo);
  // const dispatch = useDispatch();

  const UserAUthenticated = userInfo?.isAuthenticated;
  console.log('UserAUthenticated', UserAUthenticated);

  useEffect(() => {
    // dispatch(updateUser({ isLogin: true,isAuthenticated: true }));
    if (UserAUthenticated) {
      navigateScreens();
    }
  }, [UserAUthenticated]);

  const navigateScreens = () => {
    // Add your logic based on authentication status or any other conditions
    if (UserAUthenticated && userInfo.isLogin) {
        navigation.reset({
            index: 0,
            routes: [{ name: 'DrawerNavigator' }],
        });
    } else if (UserAUthenticated) {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Gstscreen', params: { destination: 'Business' } }],
        });
    } else {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Singin' }],
        });
    }
};

  const [currentIndex, SetCurrentIndex] = useState(0);
  const OnbordingdataRef = useRef(null);

  const ScrollX = useRef(new Animated.Value(0)).current;

  const ViewableItemsChanged = useRef(({viewableItems}) => {
    SetCurrentIndex(viewableItems[0].index);
  }).current;

  const ViewConfig = useRef({itemVisiblePercentThreshold: 50}).current;

  const ScrollTo = () => {
    if (currentIndex < Onbordingdata.length - 1) {
      OnbordingdataRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      console.log('Last item');
      navigateScreens(); 
    }
  };

  // useEffect(() => {
  //   const productData = () => {
  //     userGetInventory(userInfo.token.access)
  //       .then(categoryData => {
  //         // console.log('Category Datassssssssssssss:', categoryData);

  //         // console.log('nnnnnnn', categoryData.data[0].category_name);
  //         const responseData = categoryData?.data;
  //         dispatch(setCategoriesData(responseData))
  //         // dispatch(UpdateCategoriesData(responseData));
  //         // setProduct(responseData);
  //       })
  //       .catch(error => {
  //         console.log('Error fetching category data:', error);
  //       });
  //   };
  //   if (userInfo?.token?.access) {
      
  //     productData();
  //   }
  // }, []);
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {navigation.navigate('Singin')}}
        style={{alignSelf: 'flex-end', padding: scale(20)}}>
        <Text style={styles.skiptxt}>Skip</Text>
      </TouchableOpacity>
      <View style={{flex: 3}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Onbordingdata}
          renderItem={({item}) => <OnbordingItem item={item} />}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: ScrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={ViewableItemsChanged}
          viewabilityConfig={ViewConfig}
          ref={OnbordingdataRef}
        />
      </View>
      <View style={styles.buttonstyle}>
        <Paginator data={Onbordingdata} scrollX={ScrollX} />
        <Button
          label={'Next'}
          labelColor={Colors.white}
          style={{borderRadius: STANDARD_BUTTON_HEIGHT * 0.5}}
          backgroundColor={Colors.primary}
          onPress={ScrollTo}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  skiptxt: {
    fontWeight: '900',
    fontFamily: POPPINS_BOLD,
    fontSize: scale(14),
    textAlign: 'center',
  },
  buttonstyle: {
    width: SCREEN_WIDTH * 0.7,
    position: 'absolute',
    bottom: scale(70),
  },
});

//make this component available to the app
export default OnbordingScreen;
