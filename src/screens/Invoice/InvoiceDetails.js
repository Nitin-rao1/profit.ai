import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import colors from '../../constants/colors';
import Header from '../../components/Header/Header';
import {
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_SEMIBOLD,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_SPACING,
} from '../../constants/constants';
import {scale} from 'react-native-size-matters';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';
import {getAmounts} from '../../api/auth/helperFuntion';
import moment from 'moment';
import Icons from '../../components/Icons/Icons';
import {Indicators} from '../../components/apploader';
import {
  customerInvoiceDetails,
  customerLedgerBookInvoice,
} from '../../api/auth/auth';

const InvoiceDetails = ({navigation, route}) => {
  const invoiceID = route?.params?.item?.id;
  const addedItems = route.params?.addedItems || [];
  const userInfo = useSelector(state => state.users.users);
  console.log('userInfo=?????????????????=>', invoiceID);
  // console.log('addedItems=?????????????????=>', productData);
  // console.log('newitemdata', addedItems);
  const [data, setData] = useState({});
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const currentDate = moment().format('DD MMM YYYY');

  const fetchData = async () => {
    setLoading(true);
    await customerInvoiceDetails(userInfo.token.access, invoiceID)
      .then(response => {
        console.log('response====>????', response);
        setData(response.data);
        setProductData(response.product_data);
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

  const user_data = {
    customer: data?.customer?.id,
    // subtotal: subtotal,
    // tax: tax,
    // discount: discount,
    // total: grandTotal,
    paid_amount: data?.remaining_total,
  };
  const invoiceid = data?.id;

  const creteProductList = () => {
    const productAndQuantity = productData.map(item => ({
      productId: item.productID,
      quantity: parseFloat(item.quantity),
    }));

    console.log('product_and_quantity', productAndQuantity);
    navigation.navigate('PaymentAgain', {user_data, invoiceid});
  };

  const renderHeader = () => (
    <View style={[styles.headerContainer]}>
      <View style={{alignContent: 'flex-start'}}>
        <Text style={styles.headertext}>
          {data?.customer?.customer_name}
        </Text>
        <View style={styles.phonestylwrapper}>
          <Text style={styles.headertext}>
            {data?.customer?.phone_number}
          </Text>
        </View>
        <Text style={{...styles.headertext}}>
          {data?.customer?.address}
        </Text>
      </View>
      <View style={{}}>
        <Text style={{...styles.headertext, ...{textAlign: 'right'}}}>
          Invoice No. {data?.invoice_counter}
        </Text>
        <Text style={{...styles.headertext, ...{textAlign: 'right'}}}>
          Date: {moment(data?.updated_at).format('YYYY-MM-DD')}
        </Text>

        {/* <Text style={styles.headertext}>INVOICE #{' '}123456789</Text>
      <Text style={styles.headertext}>INVOICE DATE :{' '}{currentDate}</Text> */}
      </View>
    </View>
  );

  const renderTable = () => (
    <View style={styles.tableContainer}>
      <View
        style={[
          styles.tableRow,
          {backgroundColor: colors.primary, padding: scale(5)},
        ]}>
        <View style={[styles.tableCell, {flex: 0.5, alignItems: 'center'}]}>
          <Text
            style={[
              styles.boldText,
              {color: colors.white, fontWeight: 'bold', fontSize: scale(12)},
            ]}>
            Sn.
          </Text>
        </View>
        <View
          style={[
            styles.tableCell,
            {flex: 2.5, alignItems: 'flex-start', paddingRight: scale(10)}, // Adjust the paddingRight to increase spacing to the right
          ]}>
          <Text
            style={[
              styles.boldText,
              {color: colors.white, fontWeight: 'bold', fontSize: scale(12)},
            ]}>
            Product
          </Text>
        </View>
        <View style={styles.tableCell}>
          <Text
            style={[
              styles.boldText,
              {color: colors.white, fontWeight: 'bold', fontSize: scale(12)},
            ]}>
            Qty
          </Text>
        </View>
        <View
          style={[
            styles.tableCell,
            {flex: 1, alignItems: 'flex-end', right: scale(10)},
          ]}>
          <Text
            style={[
              styles.boldText,
              {color: colors.white, fontWeight: 'bold', fontSize: scale(12)},
            ]}>
            Price
          </Text>
        </View>
      </View>

      {/* {(addedItems && addedItems.length > 0
        ? addedItems
        :  */}
      {productData.map((item, index) => {
        console.log('productData',item);
        return (
          <View
            key={index}
            style={[
              styles.tableRow,
              {backgroundColor: index % 2 === 0 ? '#eeeeee' : colors.white},
            ]}>
            <View style={[styles.tableCell, {flex: 0.5, alignItems: 'center'}]}>
              <Text style={styles.normalText}>{index + 1}</Text>
            </View>
            <View
              style={[styles.tableCell, {flex: 2.5, alignItems: 'flex-start'}]}>
              <Text style={styles.normalText}>{item.product_name}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.normalText}>
                {parseFloat(item.purchase_price)} ×{' '}
                {parseFloat(item.qty || item.quantity)}
              </Text>
            </View>
            <View
              style={[
                styles.tableCell,
                {flex: 1, alignItems: 'flex-end', right: scale(10)},
              ]}>
              <Text style={styles.normalText}>
                {item.quantity * item.purchase_price}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderCalculation = () => (
    <View style={styles.CalculationContainer}>
      <View style={styles.CalculationCell}>
        <Text
          style={[
            styles.boldText,
            {
              fontSize: FONT_SIZE_SM,
              fontWeight: '700',
              fontFamily: POPPINS_SEMIBOLD,
            },
          ]}>
          Sub Total
        </Text>
        <Text
          style={[
            styles.boldText,
            {
              fontSize: FONT_SIZE_SM,
              fontWeight: '700',
              fontFamily: POPPINS_SEMIBOLD,
            },
          ]}>
          {data?.sub_total ? data?.sub_total : 0.0}
        </Text>
      </View>
      <View style={styles.CalculationCell}>
        <Text
          style={[
            styles.boldText,
            {fontWeight: '700', fontFamily: POPPINS_SEMIBOLD},
          ]}>
          Tax %
        </Text>
        <Text
          style={[
            styles.boldText,
            {fontWeight: '700', fontFamily: POPPINS_SEMIBOLD},
          ]}>
          {data?.tax ? data?.tax : 0.0}
        </Text>
      </View>
      <View style={styles.CalculationCell}>
        <Text
          style={[
            styles.boldText,
            {fontWeight: '700', fontFamily: POPPINS_SEMIBOLD},
          ]}>
          Discount %
        </Text>
        <Text
          style={[
            styles.boldText,
            {fontWeight: '700', fontFamily: POPPINS_SEMIBOLD},
          ]}>
          {/* {totalDiscount} */}
          {data?.discount ? data?.discount : 0.0}
        </Text>
      </View>
      <View style={[styles.CalculationCell, {borderBottomWidth: null}]}>
        <Text
          style={[
            styles.boldText,
            {fontWeight: 'bold', fontSize: FONT_SIZE_MD},
          ]}>
          Total
        </Text>
        <Text
          style={[
            styles.boldText,
            {fontWeight: 'bold', fontSize: FONT_SIZE_MD},
          ]}>
          {data?.grand_total ? data?.grand_total : 0.0}
        </Text>
      </View>
      <View style={styles.CalculationCell}>
        <Text
          style={[
            styles.boldText,
            {fontWeight: '700', fontFamily: POPPINS_SEMIBOLD},
          ]}>
          Paid Amount
        </Text>
        <Text
          style={[
            styles.boldText,
            {fontWeight: '700', fontFamily: POPPINS_SEMIBOLD},
          ]}>
          {/* {totalDiscount} */}
          {data?.paid_amount ? data?.paid_amount : 0.0}
        </Text>
      </View>
      <View style={styles.CalculationCell}>
        <Text
          style={[
            styles.boldText,
            {fontWeight: '700', fontFamily: POPPINS_SEMIBOLD},
          ]}>
          Remaining Amount
        </Text>
        <Text
          style={[
            styles.boldText,
            {fontWeight: '700', fontFamily: POPPINS_SEMIBOLD},
          ]}>
          {data?.remaining_total ? data?.remaining_total : 0.0}
        </Text>
      </View>
    </View>
  );

  return (
    <>
        <View style={styles.container}>
          <Header back title={'Invoice Details'} Textcolor={colors.black} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              {renderHeader()}
              {renderTable()}
            </View>

            <View style={styles.footerContainer}>{renderCalculation()}</View>
            <View style={styles.modalButtons}>
              <Button
                label={'Cancel'}
                labelColor={colors.white}
                style={styles.modalButtonsty}
                backgroundColor={colors.dividerColor}
                onPress={() => {
                  navigation.goBack();
                }}
              />
              {data?.status == 3 ? (
                <Button
                  label={'Ok'}
                  labelColor={colors.white}
                  style={styles.modalButtonsty}
                  backgroundColor={colors.primary}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ) : (
                <Button
                  label={'Pay'}
                  labelColor={colors.white}
                  style={styles.modalButtonsty}
                  backgroundColor={colors.primary}
                  onPress={() => {
                    creteProductList();
                  }}
                />
              )}
            </View>
          </ScrollView>
          {loading && <Indicators />}
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    marginHorizontal: scale(10),
    top: scale(10),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(10),
    // marginHorizontal: scale(10),
    // padding: scale(5),
    width: SCREEN_WIDTH * 0.95,
    // borderWidth: 2,
  },
  tableContainer: {
    flexDirection: 'column',
    borderWidth: scale(0.4),
    borderColor: colors.dividerColor,
    borderRadius: STANDARD_BORDER_RADIUS * 0.8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
  CalculationContainer: {
    marginTop: scale(20),
  },
  CalculationCell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(4),
    marginHorizontal: scale(15),
    paddingVertical: scale(6),
    borderBottomWidth: 1,
    borderBottomColor: colors.dividerColor,
    // marginRight: scale(10),
  },
  boldText: {
    fontSize: FONT_SIZE_XS,
    fontWeight: '600',
    fontFamily: POPPINS_SEMIBOLD,
    color: colors.darkblack,
  },
  phonestylwrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'flex-start',
  },
  headertext: {
    fontWeight: 'bold',
    fontSize: FONT_SIZE_XS,
    fontWeight: '700',
    fontFamily: POPPINS_SEMIBOLD,
    color: colors.darkblack,
    lineHeight: scale(16),
    // letterSpacing:scale(0),
    // borderWidth: 1,
    width: SCREEN_WIDTH * 0.45,
  },
  normalText: {
    fontSize: FONT_SIZE_XS,
    fontWeight: '500',
    fontFamily: POPPINS_SEMIBOLD,
    color: colors.black,
    lineHeight: scale(16),
  },
  modalButtons: {
    marginBottom: scale(15),
    // position: 'absolute',
    marginTop: STANDARD_SPACING * 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH * 1.25,
    alignSelf: 'center',
  },
  modalButtonsty: {
    width: SCREEN_WIDTH * 0.28,
    height: scale(35),
    borderRadius: STANDARD_BORDER_RADIUS * 1.5,
  },
  footerContainer: {
    // backgroundColor:'red',
    marginTop: STANDARD_SPACING * 10,
    // position: 'absolute',
    // bottom:0
    // top:STANDARD_SPACING * 30,
  },
});

export default InvoiceDetails;
