import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import colors from '../../constants/colors';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_LG,
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_XL,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_SPACING,
} from '../../constants/constants';
import Icons from '../../components/Icons/Icons';
import {useSelector} from 'react-redux';
import Share from 'react-native-share';
import moment from 'moment';
import {API_URL} from '../../../env';

const Paymentstatus = ({navigation, route}) => {
  const userInfo = useSelector(state => state.users.users);
  const {Invoicedata} = route.params || {};
  console.log('Invoicedata///////////', Invoicedata);
  const [expanded, setExpanded] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  // console.log('userInfoqqqqqqqqqqqqq', userInfo);
  // console.log('Invoicedataqqqqqqqqqqqqq', Invoicedata);

  const isPaid = Invoicedata?.payment_type === 'paid';
  const isPayLetter = Invoicedata?.payment_type === 'pay_letter';

  const statusIconName = isPaid ? 'checkcircleo' : 'exclamationcircleo';
  const statusColor = isPaid ? colors.green : colors.red;
  const statusText = isPaid ? 'Complete' : 'Remaining Amount';

  const amount =
    Invoicedata?.payment_type == 'paid'
      ? Invoicedata?.grand_total
      : Invoicedata?.payment_type == 'pay_letter'
      ? Invoicedata?.remaining_total
      : Invoicedata?.remaining_total;

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  const currentDateTime = moment().format('MMM D, YYYY h:mm A');

  const share = async () => {
    const options = {
      url: `${Invoicedata.Invoice}`,
    };

    await Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('Home');
        return true;
      },
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const Headerbutton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          share();
        }}
        style={styles.buttonwrapper}>
        <Text style={styles.btnlable}>Share</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.MainWrapper}>
      <Header
        back
        iconColor={colors.C7C7C}
        title={'Received'}
        Textcolor={colors.black}
        goBack
        onClickBack={() => {
          navigation.navigate('Home');
        }}
        rightComponent={<Headerbutton />}
      />
      <View style={styles.container}>
        <View style={styles.Pricewrapper}>
          <Text style={styles.boldtxt}>Amount</Text>
          <Text style={[styles.boldtxt, {fontSize: FONT_SIZE_XL}]}>
            ₹ {amount}
          </Text>
        </View>
        {/* <TouchableOpacity style={styles.splitbtn}>
          <Text style={styles.splitbtnlable}>Split with Friends</Text>
        </TouchableOpacity> */}
        <View style={styles.statuscontainer}>
          <Icons
            // name={'checkcircleo'}
            // iconType={'AntDesign'}
            // color={colors.green}
            name={statusIconName}
            iconType={'AntDesign'}
            color={statusColor}
            size={scale(25)}
            style={styles.iconstyl}
          />
          {/* <Text style={styles.statustxt}>Complete</Text> */}
          <Text style={styles.statustxt}>{statusText}</Text>
        </View>
        <View style={styles.dividerColor} />
        <Text style={styles.datetxt}>{currentDateTime}</Text>
        <TouchableOpacity
          onPress={handleToggle}
          style={styles.Paymentbtnwrapper}>
          <View style={styles.titlecontainer}>
            <Text style={styles.paymentMethodText}>Payment Method</Text>
            <Icons
              name={expanded ? 'chevron-up' : 'chevron-down'}
              iconType={'Entypo'}
              size={25}
              color={'#9980AC'}
            />
          </View>
          {expanded && (
            <View style={styles.expandedWrapper}>
              <View style={styles.dividerColors} />
              <View style={styles.row}>
                <Text style={styles.normltext}>Invoice ID :</Text>
                <Text style={styles.normltext}>
                  {'    '}
                  {Invoicedata?.invoice_counter}
                </Text>
              </View>
              <View style={styles.row}>
                <View>
                  <Text style={styles.normltext}>From:</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.normltext}>
                    {userInfo?.business_profile_data?.business_name}
                  </Text>
                  <Text style={styles.normltext}>
                    {userInfo?.business_profile_data?.email}
                  </Text>
                  <Text style={styles.normltext}>9876456734</Text>
                  <Text style={styles.normltext}>
                    {userInfo?.business_profile_data?.address1}{' '}
                    {userInfo?.business_profile_data?.address2}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text style={styles.normltext}>To:{'     '}</Text>
                </View>
                <View style={styles.details}>
                  {userInfo?.customer?.customer_name && (
                    <Text style={styles.normltext}>
                      {userInfo?.customer?.customer_name}
                    </Text>
                  )}
                  {userInfo?.customer?.email && (
                    <Text style={styles.normltext}>
                      {userInfo?.customer?.email}
                    </Text>
                  )}
                  {userInfo?.customer?.phone_number && (
                    <Text style={styles.normltext}>
                      {userInfo?.customer?.phone_number}
                    </Text>
                  )}
                  {userInfo?.customer?.address && (
                    <Text style={styles.normltext}>
                      {userInfo?.customer?.address}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainWrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonwrapper: {
    backgroundColor: colors.white,
    borderWidth: scale(1.3),
    borderColor: colors.primary,
    paddingHorizontal: scale(15),
    right: scale(25),
    borderRadius: STANDARD_BORDER_RADIUS * 3,
    top: scale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  btnlable: {
    fontSize: scale(12),
    color: colors.primary,
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '600',
  },
  container: {
    margin: STANDARD_SPACING * 5,
    width: SCREEN_WIDTH * 0.9,
    borderRadius: STANDARD_BORDER_RADIUS * 1.5,
    borderWidth: scale(1),
    borderColor: colors.dividerColor,
    alignSelf: 'center',
    alignItems: 'center',
    padding: scale(10),
  },
  Pricewrapper: {
    margin: STANDARD_SPACING * 0.2,
    alignItems: 'center',
  },
  boldtxt: {
    fontSize: FONT_SIZE_LG,
    fontFamily: POPPINS_BOLD,
    color: colors.black,
    fontWeight: 'bold',
    lineHeight: scale(28),
  },
  splitbtn: {
    borderWidth: scale(1.3),
    borderColor: colors.primary,
    paddingHorizontal: STANDARD_SPACING * 5,
    padding: STANDARD_SPACING * 0.5,
    borderRadius: STANDARD_BORDER_RADIUS * 1,
    margin: STANDARD_SPACING * 1.8,
  },
  splitbtnlable: {
    fontSize: scale(14),
    color: colors.black,
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '800',
  },
  statuscontainer: {
    margin: STANDARD_SPACING * 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconstyl: {
    marginRight: STANDARD_SPACING * 1.5,
  },
  datetxt: {
    fontSize: FONT_SIZE_SM,
    color: colors.black,
    fontFamily: POPPINS_REGULAR,
    fontWeight: 'bold',
    lineHeight: scale(20),
    margin: STANDARD_SPACING * 1,
  },
  statustxt: {
    fontSize: FONT_SIZE_LG,
    color: colors.black,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '600',
  },
  dividerColor: {
    width: SCREEN_WIDTH * 0.6,
    borderWidth: scale(0.5),
    borderColor: colors.C7C7C,
    margin: STANDARD_SPACING * 0.5,
  },
  Paymentbtnwrapper: {
    backgroundColor: colors.white,
    borderRadius: STANDARD_BORDER_RADIUS * 1,
    width: SCREEN_HEIGHT * 0.4,
    top: STANDARD_SPACING * 2.5,
    padding: scale(10),
    shadowColor: '#000',
    marginBottom: STANDARD_SPACING * 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  titlecontainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: STANDARD_SPACING * 0.5,
  },
  paymentMethodText: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_XS,
    fontWeight: '500',
    color: colors.black,
  },
  normltext: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_XS,
    fontWeight: '500',
    color: colors.black,
  },
  dividerColors: {
    alignSelf: 'center',
    width: SCREEN_HEIGHT * 0.4,
    borderBottomWidth: scale(0.8),
    borderBottomColor: colors.C7C7C,
  },
  expandedWrapper: {
    marginTop: STANDARD_SPACING,
    padding: STANDARD_SPACING * 1,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    marginTop: STANDARD_SPACING * 2,
    marginBottom: STANDARD_SPACING,
  },
  details: {
    marginLeft: scale(10),
    flex: 1,
  },
});

export default Paymentstatus;
