import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';
import {
  POPPINS_BOLD,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
} from '../../constants/constants';
import {Badge} from 'react-native-paper';
import Icons from '../../components/Icons/Icons';
import {Indicators} from '../../components/apploader';
import {
  CustomerLedgerBook,
  customerLedgerBookInvoice,
} from '../../api/auth/auth';
import {useSelector} from 'react-redux';
import moment from 'moment';

const CustomerDetails = ({navigation, route}) => {
  const userInfo = useSelector(state => state.users.users);
  const customerId = route.params.item.id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    await customerLedgerBookInvoice(userInfo.token.access, customerId, page)
      .then(response => {
        console.log('response====>????', response);
        setData(pre => [...pre, ...response.data]);
        if (response.next == null) {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const renderItem = ({item}) => {
    console.log('item',item);
    const transactionsDate = moment(item.updated_at).format('YYYY-MM-DD');
    const transactionsStatus =
      item.status == 1
        ? colors.error
        : item.status == 2
        ? colors.darkyellow
        : colors.green;
        const transactionsAmount = 
        item.status == 1
        ? item.remaining_total
        : item.status == 2
        ? item.sub_total
        : item.paid_amount;
    return (
      <TouchableOpacity
        style={styles.TableWrapper}
        onPress={() => navigation.navigate('InvoiceDetails', {item:item})}>
        {console.log(item)}
        <View style={styles.Table_Tittle}>
          {/* <View style={{flexDirection:'row'}}> */}
          {/* <Text style={styles.Table_Bold_Text}>{item.requestId}</Text> */}
          {/* </View> */}
          <Text style={styles.Table_Bold_Text}>
            {item.customer.customer_name} ({item.customer.phone_number})
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icons
              iconType={'FontAwesome'}
              name={'rupee'}
              size={scale(12)}
              color={colors.black}
              style={{right: scale(2)}}
            />
            <Text style={styles.Table_Bold_Text}>{transactionsAmount}</Text>
          </View>
        </View>
        <View style={styles.TableDivider} />
        <View style={styles.Table_Container}>
          <View style={styles.Table_styles}>
            <Text style={styles.Table_Normal_Text}>Transaction ID</Text>
            <Text style={styles.Table_Bold_Text}># {item.invoice_counter}</Text>
          </View>
          <View style={styles.Table_styles}>
            <Text style={styles.Table_Normal_Text}>Issued Date</Text>
            <Text style={styles.Table_Bold_Text}>{transactionsDate}</Text>
          </View>
          <View style={styles.Table_styles}>
            <Text style={styles.Table_Normal_Text}>Status</Text>
            <View style={styles.TableStatus}>
              <View
                style={{
                  ...styles.bagestyle,
                  ...{backgroundColor: transactionsStatus},
                }}
              />
              {/* <Badge  size={scale(6)} /> */}
              {/* <Text style={styles.Table_Bold_Text}> {item.status}</Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header back title={'Customer Order Details'} Textcolor={colors.black} />
      <View style={styles.FlatListcontainer}>
        {/* <Text style={styles.headingtxt}>Customer Details</Text> */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {loading && <Indicators />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  FlatListcontainer: {
    flex: 1,
    marginHorizontal: scale(10),
    top: scale(10),
  },
  headingtxt: {
    fontFamily: POPPINS_BOLD,
    textTransform: 'capitalize',
    lineHeight: scale(20),
    color: colors.black,
    fontSize: scale(18),
    fontWeight: '600',
  },
  // TableWrapper: {
  //   marginVertical: scale(5),
  //   borderWidth: scale(0.8),
  //   borderColor: colors.dividerColor,
  //   borderRadius: STANDARD_BORDER_RADIUS,
  //   paddingHorizontal: scale(10),
  //   // padding: scale(15),
  //   // marginBottom:50
  //   // backgroundColor:'red'
  // },
  // Table_Tittle: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   backgroundColor:'red',
  //   marginVertical: scale(5),
  //   padding: scale(2),
  // },
  TableWrapper: {
    marginVertical: scale(5),
    borderWidth: scale(0.8),
    borderColor: colors.dividerColor,
    borderRadius: STANDARD_BORDER_RADIUS,
    paddingHorizontal: scale(10),
    padding: scale(6),
  },
  Table_Tittle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: scale(5),
    padding: scale(6),
  },
  Table_Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: scale(5),
    padding: scale(6),
  },
  // Table_Container: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   // backgroundColor:'green',
  //   marginVertical: scale(5),
  //   // width:scale(310),
  //   // padding: scale(5),
  // },
  Table_styles: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor:'pink',
    height: scale(40),
  },
  TableDivider: {
    borderBottomWidth: scale(1),
    borderBottomColor: '#7C7C7C',
    width: 'auto',
  },
  Table_Bold_Text: {
    fontSize: scale(12),
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '700',
    color: colors.darkblack,
  },
  Table_Normal_Text: {
    fontSize: scale(12),
    fontFamily: POPPINS_REGULAR,
    fontWeight: '400',
    color: colors.black,
  },
  containeraaa: {
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', // Use 'center' to center the rows
    // paddingTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'red',
    width: SCREEN_WIDTH * 0.4,
    // width:'100%',
  },
  box: {
    width: 60,
    height: 60,
    // backgroundColor: 'aqua',
    margin: 2,
  },
  TableStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // right: scale(5),
    alignSelf: 'center',
  },
  bagestyle: {
    backgroundColor: colors.green,
    height:scale(12),
    width:scale(12),
    borderRadius:scale(8),
    alignSelf: 'center',
  },
});

export default CustomerDetails;
