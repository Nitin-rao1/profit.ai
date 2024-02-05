//import liraries
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../../constants/colors';
import {
  FONT_SIZE_LG,
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_TEXT_INPUT_HEIGHT,
} from '../../constants/constants';
import Header from '../../components/Header/Header';
import Icons from '../../components/Icons/Icons';
import { scale } from 'react-native-size-matters';
import Button from '../../components/Button';
import TextInputComp from '../../components/Input/TextInputComp';
import Searchdata from '../../components/data/Searchdata';
import ActiveButton from '../../components/ActiveButton/ActiveButton';
import { Images } from '../../constants/images';
import { FindCustomer, Searchingdata } from '../../api/auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Indicators } from '../../components/apploader';
import { updateUser } from '../../redux/slices/SessionUser';

// create a component
const CreateInvoice = ({ navigation }) => {
  const [FirstName, setFirstName] = useState();
  const [Zipcode, setZipcode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState(Searchdata);
  const [searchPressed, setSearchPressed] = useState(false);
  const [isLoading, setLoading] = useState(false); 
  const userInfo = useSelector(state => state.users.users);
  // const [showCustomerInformation, setShowCustomerInformation] = useState(false);
  const dispatch = useDispatch();

  const [activeButton, setActiveButton] = useState('favorite');

  useEffect(() => {
    handleButtonPress('favorite');
  }, []);


  const handleButtonPress = (label) => {
    setLoading(true);
    setActiveButton(label);
    const data = {
      label
    };

    FindCustomer(userInfo.token.access, data)
      .then((response) => {
        console.log('res===', response);
        let updatedData = [];

        switch (label) {
          case 'favorite':
            updatedData = response.favourite_customer || [];
            break;
          case 'frequent':
            updatedData = response.frequent_customer || [];
            break;
          case 'Top Cust':
            updatedData = response.top_customer || [];
            break;
          default:
            break;
        }

        console.log('Updated Data:', updatedData);

        setFilteredData(updatedData);
        setSearchPressed(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };


  // useEffect(() => {
  //   setFilteredData(Searchdata);
  // }, []);

  useEffect(() => {
    Searchingdata(userInfo.token.access, searchInput)
      .then((result) => {
        const { status, message, customers } = result;

        if (status === 'success') {
          if (customers.length > 0) {
            console.log(customers);
            setFilteredData(customers);
            setSearchPressed(true);
          } else {
            console.log('No customers found.');
            setFilteredData([]);
            setSearchPressed(true);
          }
        } else {
          console.log('Error:', message);
          // setLoading(false);
          // Handle error status
        }
      })
      .catch((error) => {
        // Handle other errors
        console.error(error);
      });
  }, [searchInput, userInfo.token.access]);

  const handleSearch = () => {
    console.log('Search Input:', searchInput);
    const filtered = filteredData.filter(
      item =>
        item.customer_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.phone_number.includes(searchInput)
    );
    console.log('Filtered Data:', filtered);
    setFilteredData(filtered);
    setSearchPressed(true);
  };

  const renderItem = ({ item, key }) => {
    console.log('Item:', item);

    return (
      <TouchableOpacity
        key={key}
        style={styles.MainWrapper}
        onPress={() => {
          dispatch(updateUser({ customer: item }));
          navigation.navigate('CustomerInfo', {
            userinfo: item,
            CustomerInfo: true,
            isEditable : true,
          });
        }}
        >
        <View style={styles.titleWrapper}>
          <View style={styles.titleContainer}>
            <Text style={[styles.boldText, { color: colors.white }]}>
              {item.customer_name.charAt(0)}
            </Text>
          </View>
          <View style={{ paddingLeft: scale(8) }}>
            <Text style={[styles.boldText, { color: colors.black }]}>
              {item.customer_name}
            </Text>
            <Text style={[styles.numberText, { color: colors.C7C7C }]}>
              {item.phone_number}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{item.amount}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  const Headerbutton = () => {
    return (
      <View style={styles.addbtncontainer}>
        <Button
          label={'Create user'}
          labelStyle={styles.btntext}
          labelColor={colors.white}
          style={styles.addbutton}
          backgroundColor={colors.primary}
          onPress={() => {
            navigation.navigate('GstVerify', { destination: 'CustomerInfo' });
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        back
        iconColor={colors.C7C7C}
        title={'Create Invoice'}
        Textcolor={colors.black}
        rightComponent={<Headerbutton />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchbarcontainer}>
          <Text style={styles.normaltex}>Search</Text>
          <View style={styles.searchbarWrapper}>
            <TextInput
              style={styles.searchbarTextInput}
              placeholder="Enter mobile number or username"
              placeholderTextColor={colors.black}
              value={searchInput}
              onChangeText={text => setSearchInput(text)}
            />
            <Icons
              name={'search'}
              iconType={'Feather'}
              color={colors.primary}
              size={20}
              style={styles.iconstyle}
            />
          </View>
        </View>
        <Button
          label={'Searching'}
          labelColor={colors.white}
          // labelStyle={styles.searchingbtntext}
          style={styles.Searchingbtn}
          backgroundColor={colors.primary}
          onPress={() => {
            handleSearch();
            // setShowCustomerInformation(false);
          }}
        />

        {searchPressed && searchInput.length > 0 ? null : (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <ActiveButton
              label={'Favorite'}
              isActive={activeButton === 'favorite'}
              onPress={() => handleButtonPress('favorite')}
            />
            <ActiveButton
              label={'Frequent'}
              isActive={activeButton === 'frequent'}
              onPress={() => handleButtonPress('frequent')}
            />
            <ActiveButton
              label={'Top User'}
              isActive={activeButton === 'Top Cust'}
              onPress={() => handleButtonPress('Top Cust')}
            />
          </View>
        )}

        {searchPressed && (searchInput.length > 0 || filteredData.length > 0) ? (
          <>
            {filteredData.length > 0 && (
              <View style={styles.sectionTitleAndLinkWrapper}>
                <Text style={[styles.sectionTitle, { color: colors.black }]}>
                  User List
                </Text>
              </View>
            )}
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                return renderItem({ item, index, key: item.id });
              })
            ) : (
              <View>
                <Image style={styles.imageSize} source={Images.User_Notfound} />
                <Text style={[styles.normaltex, { textAlign: 'center' }]}>
                  User not Found!!
                </Text>
              </View>
            )}
          </>
        ) : null}
      </ScrollView>
      {isLoading && <Indicators />}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: STANDARD_FLEX,
    backgroundColor: colors.white,
  },
  normaltex: {
    paddingLeft: scale(2) ,
    padding: scale(3),
    fontSize: FONT_SIZE_MD,
    fontWeight: '600',
    fontFamily: POPPINS_MEDIUM,
    color: colors.black,
    lineHeight: scale(20),
    marginBottom: scale(2),
  },
  searchbarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // margin: STANDARD_SPACING * 3,
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    paddingLeft: STANDARD_SPACING * 2,
    // width: SCREEN_WIDTH * 0.9,
    backgroundColor: '#F6F5F6',
    color: colors.gray,
    borderWidth: scale(1.5),
    borderColor: colors.C7C7C,
  },
  searchbarTextInput: {
    height: STANDARD_TEXT_INPUT_HEIGHT * 0.8,
    width: SCREEN_WIDTH * 0.78,
    paddingLeft: STANDARD_SPACING * 2,
  },
  iconstyle: {
    // marginRight: scale(18),
    position: 'absolute',
    bottom: scale(-8),
    right: scale(12),
    // alignItems:'center',
    // justifyContent:'center',
  },
  searchbarcontainer: {
    width: SCREEN_WIDTH * 0.9,
    marginBottom: STANDARD_SPACING * 3,
    alignSelf: 'center',
  },
  Searchingbtn: {
    width: SCREEN_WIDTH * 0.7,
    alignSelf: 'center',
    marginBottom: scale(20),
  },
  imageSize: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  boldtext: {
    textTransform: 'capitalize',
    fontSize: FONT_SIZE_MD,
    fontWeight: '600',
    fontFamily: POPPINS_BOLD,
    color: colors.darkblack,
    // marginVertical: scale(4),
  },
  inputWrapper: {
    marginHorizontal: scale(15),
    // marginVertical:scale(50),
  },
  inputtitle: {
    fontFamily: POPPINS_REGULAR,
    fontSize: scale(14),
    fontWeight: '400',
    color: colors.darkblack,
    marginBottom: scale(5),
  },
  btntext:{
    fontFamily:POPPINS_MEDIUM,
    fontWeight:'400',
    fontSize:scale(8),
    color:colors.white,
  },
  MainWrapper: {
    marginHorizontal: scale(10),
    borderWidth: 1,
    borderColor: colors.dividerColor,
    borderRadius: scale(10),
    padding: 10,
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
    fontSize: scale(15),
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '700',
    fontSize: scale(12),
    lineHeight: scale(20),
    textTransform: 'capitalize',
    color: colors.green,
    marginLeft: scale(5), // Adjust margin as needed
  },
  addbtncontainer: {
    alignSelf: 'flex-end',
    right: scale(10),
  },
  addbutton: {
    height: scale(32),
    width: SCREEN_WIDTH * 0.26,
    borderRadius: STANDARD_BORDER_RADIUS * 1.2,
    bottom: scale(8),
  },
  sectionTitleAndLinkWrapper: {
    margin: STANDARD_SPACING * 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_MD,
    fontWeight: '400',
  },
});

//make this component available to the app
export default CreateInvoice;
