import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import {
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  SCREEN_WIDTH,
  STANDARD_SOCIAL_ICON_SIZE,
  STANDARD_SPACING,
} from '../../constants/constants';
import Icons from '../Icons/Icons';
import Header from '../Header/Header';
import SubHeader from '../SubHeader/SubHeader';
import FilterModal from '../Modal/FilterModal/FilterModal';
import SortingModal from '../Modal/SorttingModal/SortingModal';
import {
  CustomerLedgerBook,
  FavouriteCustomer,
  ledgerBookFilter,
  userSortFilter,
} from '../../api/auth/auth';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {BarIndicators, Indicators} from '../apploader';
import FilterReset from '../../assets/svg/Filter-Reset.svg';
import {filterData, sortingsData} from '../data/LedgerBookdata';
import {addToFavorite} from '../../redux/slices/WishlistSlice';

const LedgerList = ({navigation, item, index, favourite, status, price}) => {
  // console.log('itemaaaaaaaaa', item);
  const store = useStore();
  const favData = store.getState().wishList.wishListID;
  const userInfo = store.getState().users.users;

  const isFavouriteMatch = favData.some(value => value == item.id);
  console.log('ddddddddddddddd', favData);
  const dispatch = useDispatch();
  const [isFav, setFav] = useState(isFavouriteMatch);

  const handleFav = val => {
    setFav(!isFav);

    console.log('FavouriteCustomer API Response?????:', val.id);
    // return
    dispatch(addToFavorite(item));
    FavouriteCustomer(userInfo.token.access, {
      id: val.id,
      favourite: !isFav,
    })
      .then(response => {
        console.log('FavouriteCustomer API Response:', response);
        // const newData = [...data];
        // newData[index].heartClicked = !isFavourite;
        // setData(newData);
      })
      .catch(error => {
        console.error('Error calling FavouriteCustomer API:', error);
      });
  };

  console.log('isFav', isFav);
  const statusColor =
    status == 1
      ? colors.error
      : status == 2
      ? colors.darkyellow
      : colors.success;

  return (
    <>
      <TouchableOpacity
        key={`${index}-ledger`}
        style={styles.MainWrapper}
        onPress={() => navigation.navigate('CustomerDetails', {item: item})}>
        <View style={styles.titleWrapper}>
          <View style={styles.titleContainer}>
            <Text style={[styles.boldText, {color: colors.white}]}>
              {item.customer_name?.charAt(0)}
            </Text>
          </View>
          <View style={{paddingLeft: scale(5)}}>
            <Text style={[styles.boldText, {color: colors.black}]}>
              {item?.customer_name.length > 10
                ? `${item?.customer_name.substring(0, 15)}...`
                : item?.customer_name}
              {/* {index + 1} */}
            </Text>
            <Text style={[styles.numberText, {color: colors.C7C7C}]}>
              {item.phone_number}
            </Text>
          </View>
        </View>
        {/* {console.log('itemfav',item)} */}
        <View style={styles.priceheartwrapper}>
          <View style={styles.priceWrapper}>
            <Icons
              iconType={'AntDesign'}
              name={isFavouriteMatch ? 'heart' : 'hearto'}
              size={scale(20)}
              color={isFavouriteMatch ? colors.error : colors.black}
              onPress={() => {
                handleFav(item);
              }}
              style={styles.iconhertsty}
            />
          </View>
          <View style={styles.priceContainer}>
            {/* <Icons
            iconType={'FontAwesome'}
            name={'rupee'}
            size={scale(12)}
            color={colors.black}
          /> */}
            {/* {item.sort_type == 'debt' ? (item?.all_remaining ?? 0) : (item?.last_invoice_grand_total ?? 0)} */}
            <Text style={[styles.priceText, {color: statusColor}]}>
              ₹ {price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  FlatListcontainer: {
    flex: 1,
    paddingTop: scale(10),
    // marginVertical: scale(20),
  },
  MainWrapper: {
    marginHorizontal: scale(10),
    borderWidth: 1,
    borderColor: colors.dividerColor,
    borderRadius: scale(10),
    padding: scale(10),
    paddingVertical: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10), // Adjust margin as needed
  },
  titleWrapper: {
    // backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: '#1976D29C',
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '600',
    fontSize: scale(12),
    lineHeight: scale(20),
    textTransform: 'capitalize',
  },
  numberText: {
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '400',
    fontSize: scale(12),
    lineHeight: scale(20),
    textTransform: 'capitalize',
  },
  priceheartwrapper: {
    flexDirection: 'column',
    gap: scale(12),
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'red',
    // margin: scale(5),
    // height: scale(55),
    // marginVertical:scale(10),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft:scale(15)
  },
  priceText: {
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '700',
    fontSize: scale(12),
    lineHeight: scale(20),
    textTransform: 'capitalize',
    // color: colors.green,
    marginLeft: scale(5),
  },
  iconhertsty: {
    // marginLeft: scale(5),
    // marginTop: scale(6),
    // position:'absolute',
  },
  contentWrapper: {
    // padding: scale(2),
    // width: SCREEN_WIDTH * 0.96,
    // marginHorizontal: scale(16),
    // marginVertical: scale(5),
    alignSelf: 'center',
    justifyContent: 'space-between',
    // borderWidth:2,
    width: '95%',
  },
  sectionTitleAndLinkWrapper: {
    // margin: STANDARD_SPACING * 1,
    // marginHorizontal: STANDARD_SPACING * 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeLabel: {
    fontSize: scale(18),
    fontWeight: '500',
    fontFamily: POPPINS_REGULAR,
    color: colors.black,
  },
});

export default LedgerList;
