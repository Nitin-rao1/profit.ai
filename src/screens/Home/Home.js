import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Colors from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import Icons from '../../components/Icons/Icons';
import Menus from '../../assets/svg/Menus.svg';
// import PieChart from 'react-native-pie-chart';
import styles from './styles';
import Tabledata from '../../components/data/Tabledata';
import {Badge} from 'react-native-paper';
import Button from '../../components/Button';
import {
  POPPINS_SEMIBOLD,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_BUTTON_HEIGHT,
} from '../../constants/constants';
import colors from '../../constants/colors';
import Link from '../../components/links/Link';
import {useDispatch, useSelector} from 'react-redux';
import {getTransactionsHistory, getUserDetails} from '../../api/auth/auth';
import {Indicators} from '../../components/apploader';
import {updateUser} from '../../redux/slices/SessionUser';
import PieChart from 'react-native-pie-chart';

import Transaction from '../../components/Cards/Transaction';
// import PieChart from '../../components/PieChart/PieChart';

const Home = ({navigation}) => {
  const userInfo = useSelector(state => state.users.users);
  console.log('userInfouserInfo=====inhomescreen>', userInfo);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const widthAndHeight = 180;
  const series = [20, 10, 15, 15];
  const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff3c00'];
  const totalInvoice = series.reduce((total, value) => total + value, 0);

  const [page, setPage] = useState(1);

  const [logBookData, setLogBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const userProfilePic = userInfo.profilePic;
  const profile_image = userInfo.profile_image;

  useEffect(() => {
    // Function to format the date as "MMM D YYYY"
    const formatCurrentDate = () => {
      const options = {month: 'short', day: 'numeric', year: 'numeric'};
      const formattedDate = new Date().toLocaleDateString(undefined, options);
      setCurrentDate(formattedDate);
    };

    // Call the function to set the initial date
    formatCurrentDate();

    // You can update the date every second, minute, etc. as needed
    const interval = setInterval(() => {
      formatCurrentDate();
    }, 1000 * 60); // Update every minute

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    getUserDetails(userInfo.token.access).then(val => {
      // console.log('ajsfjsafdsa', val);
      setLoading(false);
      dispatch(updateUser({...userInfo, ...val}));
    });
  }, []);

  const [data, setData] = useState([
    {color: 'red', value: 30},
    {color: 'yellow', value: 40},
    {color: 'blue', value: 30},
  ]);

  const updateData = () => {
    // Update data to trigger animation
    setData([
      {color: 'red', value: Math.random() * 50 + 10},
      {color: 'yellow', value: Math.random() * 50 + 10},
      {color: 'blue', value: Math.random() * 50 + 10},
    ]);
  };

  const fetchData = async () => {
    setIsLoading(true);
    await getTransactionsHistory(userInfo.token.access, page)
      .then(response => {
        console.log('response====>????', response.data);
        setLogBookData(pre => [...pre, ...response.data]);
        if (response.data.length == 0) {
          setHasMore(false);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        setIsLoading(false);
        setHasMore(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const renderItem = ({item, index}) => (
    <Transaction key={item.id} item={item} index={index} />
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" backgroundColor="#1976D280" />
        <View style={styles.headercontainer}>
          {/* Header */}
          <View style={styles.header}>
            {/* Drawer menu icon */}
            <View style={styles.headerview}>
              <Pressable
                style={[
                  styles.drawerMenuIconWrapper,
                  {backgroundColor: '#D9D9D94A'},
                ]}
                onPress={() => navigation.openDrawer()}>
                <Menus width={scale(18)} height={scale(18)} />
              </Pressable>

              {/* Welcome */}
              {/* <Text style={[styles.welcomeLabel, {color: Colors.black}]}>
                Dashboard
              </Text> */}
            </View>

            <View style={styles.usernamewrapper}>
              <View style={styles.usernamecontainer}>
                <Text style={[styles.titleName, {fontSize: scale(18)}]}>
                  Hello, 
                  <Text
                    style={[
                      styles.titleName,
                      {
                        fontSize: scale(18),
                        fontWeight: '700',
                        fontFamily: POPPINS_SEMIBOLD,
                        flexWrap: 'wrap',
                      },
                    ]}>
                    {/* {'\n'} */}
                    {' '+userInfo?.business_profile_data?.business_name}
                  </Text>
                </Text>
              </View>
            </View>

            {/* Avatar */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={[styles.avatarWrapper]}>
              <Image
                // source={{uri: userProfilePic ? userProfilePic : profile_image}}
                source={require('../../assets/images/HomeScreenimg/person.png')}
                style={styles.avatarImage}
              />
            </TouchableOpacity> */}
            {/* <View style={styles.clanderwrapper}>
              <Text style={styles.datetxt}>{currentDate}</Text>
              <View style={{justifyContent: 'center'}}>
                <Icons
                  name={'calendar-blank-outline'}
                  iconType={'MaterialCommunityIcons'}
                  size={15}
                  color={Colors.white}
                />
              </View>
            </View> */}
          </View>
        </View>

        {/* <View style={styles.chartWrapper}>
          <Text style={styles.TextWrapper}>Sales Reports</Text>
        </View> */}
        <View style={styles.sectionTitleAndLinkWrapper}>
          <Text style={[styles.sectionTitle, {color: colors.black}]}>
            Sales Reports
          </Text>
          {/* <Link
            label="See all"
            labelColor={colors.black}
            onPress={() => navigation.navigate('Categories')}
          /> */}
        </View>
        <View style={styles.chartview}>
          <View style={styles.chartContainer}>
            <View>
              {/* <PieChart data={data} /> */}

              <PieChart
                widthAndHeight={scale(160)}
                series={series}
                sliceColor={sliceColor}
                coverRadius={0.6}
                coverFill={'#1976D2'}
              />
              <Text style={styles.totalInvoice}>{totalInvoice}</Text>
              <Text style={styles.totalInvoiceText}>Total Invoice</Text>
            </View>

            <View style={styles.containeraaa}>
              <View style={styles.row}>
                {series.slice(0, 2).map((value, index) => (
                  <View key={index} style={styles.box}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          backgroundColor: sliceColor[index],
                          ...styles.legendColor,
                        }}
                      />
                      <Text style={styles.legendLabel}>{value}</Text>
                    </View>
                    <Text style={styles.legendText}>
                      {index === 0 ? 'Approved' : 'Pending'}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.row}>
                {series.slice(2, 4).map((value, index) => (
                  <View key={index} style={styles.box}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          backgroundColor: sliceColor[index],
                          ...styles.legendColor,
                        }}
                      />
                      <Text style={styles.legendLabel}>{value}</Text>
                    </View>
                    <Text style={styles.legendText}>
                      {index === 0 ? 'Overdue' : 'Rejected'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          {/* <Button label="Update Chart" onPress={updateData}  backgroundColor={colors.error}/> */}
        </View>

        <View style={styles.sectionTitleAndLinkWrapper}>
          {/* <Text style={[styles.sectionTitle, {color: colors.black}]}>
            General Sales Reports
          </Text> */}
          {/* <Link
            label="See all"
            labelColor={colors.black}
            onPress={() => navigation.navigate('Categories')}
          /> */}
        </View>
        <View style={styles.boxWrapper}>
          <View style={styles.innnerbox}>
            <View style={styles.innerboxview}>
              <Text style={styles.boxtexttitle}>Score</Text>
              <View style={styles.secondboxstyl}>
                <View style={{alignItems: 'center'}}>
                  <Icons
                    name={'arrow-top-right-thin'}
                    iconType={'MaterialCommunityIcons'}
                    color={Colors.black}
                    size={scale(16)}
                    style={styles.arowicon}
                  />
                </View>
              </View>
            </View>
            <View style={styles.firstview}>
              <Text style={styles.firstviewtxt}>1000</Text>
              <Text style={styles.firstviewtxts}>Excellent</Text>
            </View>
          </View>
          <View style={styles.innnerbox}>
            <View style={styles.SecondBoxview}>
              <Text style={styles.boxtexttitle}>Total Invoice</Text>
              <View style={styles.secondboxstyl}>
                <View style={{alignItems: 'center'}}>
                  <Icons
                    name={'arrow-top-right-thin'}
                    iconType={'MaterialCommunityIcons'}
                    color={Colors.black}
                    size={scale(16)}
                    style={styles.arowicon}
                  />
                </View>
              </View>
            </View>
            <View style={styles.boxview}>
              <Text style={styles.boxviewtxt}>94k</Text>
              <View style={styles.boxviewwapper}>
                <Text style={styles.Debittxt}>
                  Credit
                  <Text style={[styles.Debittxt, {color: '#4CAF50'}]}>
                    {'\n'}10k
                  </Text>
                </Text>
                <Text style={styles.Debittxt}>
                  Debit
                  <Text style={[styles.Debittxt, {color: '#FF3D00'}]}>
                    {'\n'}5.4k
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.sectionTitleAndLinkWrapper}>
          <Text style={[styles.sectionTitle, {color: colors.black}]}>
            Invoice History
          </Text>

          <Link
            label="See all"
            labelColor={colors.black}
            onPress={() => navigation.navigate('History')}
          />
        </View>
        <View style={styles.invoicewrapper}>
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            data={logBookData.filter((_, index) => index < 5)}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </ScrollView>
      <Pressable
        onPress={() => {
          navigation.navigate('CreateInvoice');
        }}
        style={styles.buttonstyl}>
        <Icons
          name={'plus'}
          iconType={'Feather'}
          size={scale(20)}
          color={colors.white}
          style={styles.iconbtn}
        />
        <Text style={styles.labelstyl}>Create Invoice</Text>
      </Pressable>
      {loading && <Indicators />}
    </View>
  );
};

export default Home;
