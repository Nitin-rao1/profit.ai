import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import Header from '../../components/Header/Header';
import colors from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_LG,
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_BUTTON_HEIGHT,
  STANDARD_SPACING,
} from '../../constants/constants';
import Accordion from '../../components/Accordion/Accordion';
import Upidata from '../../components/data/Upidata';
import Button from '../../components/Button';
import Icons from '../../components/Icons/Icons';
import TextInputComp from '../../components/Input/TextInputComp';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {InvoiceOrder} from '../../api/auth/auth';
import {Indicators} from '../../components/apploader';
import LottieView from 'lottie-react-native';

const Payment = ({navigation, route}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [note, setNote] = useState('');
  const [showRemainingInput, setShowRemainingInput] = useState(false);
  const [totalValue, setTotalValue] = useState('');
  const [payValue, setPayValue] = useState('');
  const [remainingValue, setRemainingValue] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [paymentOption, setPaymentOption] = useState('');
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(state => state.users.users);
  const userdata = route.params.user_data;
  console.log('userdatawwww', userdata.customer);
  const productAndQuantity = route.params.productAndQuantity;
  console.log('productAndQuantity', productAndQuantity);
  const totalAmount = userdata.total;

  const sections = [
    {title: 'Cash', value: 'paid'},
    {title: 'UPI', value: 'paid'},
    {title: 'Debit Card', value: 'paid'},
    {title: 'Credit Card', value: 'paid'},
    {title: 'Pay Letter', value: 'pay_letter'},
    {title: 'Pay Remaining', value: 'remain_payment'},
    // Add more sections as needed
  ];

  const handlePayValueChange = text => {
    const payAmount = parseFloat(text) || 0;
    const remainingAmount = totalAmount - payAmount;

    // Convert the numeric value to a string before setting it in the state
    setPayValue(text.toString());
    setRemainingValue(remainingAmount.toFixed(2));
  };

  const handleAccordionPress = item => {
    const selectedMethod = item.title;
    setSelectedPaymentMethod(selectedMethod);

    const selectedValue = item.value;

    setShowRemainingInput(selectedMethod === 'Pay Remaining');
    setPaymentType(selectedValue);
    if (selectedMethod === 'Pay Remaining') {
      setPaymentOption('Cash');
      setTotalValue(totalAmount);
    } else {
      setPaymentOption(selectedMethod);
      setTotalValue('');
      setPayValue('');
      setRemainingValue('');
    }
  };
  console.log('Payment Type:', paymentType);
  console.log('Payment Option:', paymentOption);
  console.log('Remaining Value:', remainingValue);
  console.log('Pay Value:', payValue);

  const paymentmethod = async () => {
    if (!selectedPaymentMethod) {
      showMessage({
        message: 'Payment Option Required',
        description: 'Please select a payment option before proceeding.',
        type: 'warning',
      });
      return; // Do not proceed further if payment option is not selected
    }

    if (
      selectedPaymentMethod === 'Pay Remaining' &&
      (payValue === '' || parseFloat(payValue) === 0)
    ) {
      showMessage({
        description: "Pay Value for 'Pay Remaining' cannot be empty or Zero",
        message: 'Please enter a valid Pay Value.',
        type: 'warning',
      });
      return; // Do not proceed further if Pay Value is not valid for 'Pay Remaining'
    }
    if (
      selectedPaymentMethod === 'Pay Remaining' &&
      (remainingValue === '' || parseFloat(remainingValue) <= 0)
    ) {
      showMessage({
        description: "To proceed with the paid option, please make sure the Remaining Value is greater than 0.",
        message: 'Invalid Remaining Value',
        type: 'warning',
    });    
      return; // Do not proceed further if Remaining Value is not valid for 'Pay Remaining'
    }
  
  
    let slip = {
      customer: userdata.customer,
      sub_total: userdata.subtotal,
      grand_total: totalAmount,
      paid_amount: payValue ? payValue : paymentType === 'pay_letter'  ? 0 : totalAmount,
      remaining_total: remainingValue ? remainingValue : paymentType === 'pay_letter'  ? totalAmount :0,
      payment_type: paymentType,
      payment_option: paymentOption,
      tax: userdata.tax,
      discount: userdata.discount,
      description: note,
      product_and_quantity: productAndQuantity,
    };

    console.log('slip--------', slip);
    // return;
    setLoading(true);
    await InvoiceOrder(userInfo.token.access, slip)
      .then(response => {
        console.log('responseData===>', response);
        showMessage({
          message: 'Payment Successful',
          description: 'Your payment has been processed successfully.',
          type: 'success',
        });
        const Invoicedata = response.invoice;
        console.log('Invoicedata===///', Invoicedata);
        navigation.navigate('Paymentstatus', {Invoicedata});
        setLoading(false);
      })
      .catch(error => {
        console.log('--------------', error);
        setLoading(false);
      });
  };

  return (
    <View style={styles.mainwrapper}>
      <Header back title={'Payment Method'} Textcolor={colors.black} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.descriptionview}>
            <Text style={styles.descriptiontext}>
              Please choose the option that suits you best.{'\n'} We offer
              convenient payment options to make your {'\n'} experience with us
              seamless. You can pay securely {'\n'} through:
            </Text>
          </View>
          <View style={styles.titleview}>
            <Text style={[styles.Mediumtext, {color: colors.white}]}>
              Total Amount
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              {/* <Text style={[styles.largetext, {color: colors.white}]}>Rs </Text> */}
              <Icons
                iconType={'FontAwesome'}
                name={'rupee'}
                size={scale(18)}
                color={colors.white}
                style={styles.rupeeiconsty}
              />
              <Text style={[styles.largetext, {color: colors.white}]}>
                {' '}
                {totalAmount}/-
              </Text>
            </View>
          </View>
          <View style={styles.sectionTitleAndLinkWrapper}>
            <Text style={[styles.sectionTitle, {color: colors.black}]}>
              Please select payment Option
            </Text>
            {/* <Link
            label="See all"
            labelColor={colors.black}
            onPress={() => navigation.navigate('Categories')}
          /> */}
          </View>
          {sections.map((item, index) => (
            <View
              key={index}
              style={[
                index === 0 &&
                  styles.paymentMethodComponentWrapperWithMarginTop,
                styles.paymentMethodComponentWrapper,
              ]}>
              <Accordion
                key={index}
                title={item.title}
                isSelected={selectedPaymentMethod === item.title}
                onPress={() => handleAccordionPress(item)}
              />
            </View>
          ))}
        </View>

        {showRemainingInput && (
          <View style={styles.RemainginputWrapper}>
            <View>
              <Text style={styles.titletxt}>Total</Text>
              <TextInput
                placeholder="Total"
                placeholderTextColor={colors.C7C7C}
                value={totalValue}
                editable={false}
                style={[
                  styles.Remainginputstyl,
                  {backgroundColor: colors.gray},
                ]}
              />
            </View>
            <View style={styles.titlesymbolewrapper}>
              <Text style={[styles.titlesymbole, {fontSize: scale(16)}]}>
                -
              </Text>
            </View>
            <View>
              <Text style={styles.titletxt}>Pay</Text>
              <TextInput
                placeholder="Pay"
                placeholderTextColor={colors.C7C7C}
                keyboardType="phone-pad"
                autoCapitalize="none"
                value={payValue}
                onChangeText={handlePayValueChange}
                style={styles.Remainginputstyl}
              />
            </View>
            <View style={styles.titlesymbolewrapper}>
              <Text style={[styles.titlesymbole, {fontSize: scale(16)}]}>
                =
              </Text>
            </View>
            <View>
              <Text style={styles.titletxt}>Remaining</Text>
              <TextInput
                placeholder="Remaining"
                placeholderTextColor={colors.C7C7C}
                value={remainingValue}
                editable={false}
                style={[
                  styles.Remainginputstyl,
                  {backgroundColor: colors.gray},
                ]}
              />
            </View>
          </View>
        )}

        <View style={styles.notewrapper}>
          <View
            style={{
              alignSelf: 'flex-start',
              paddingLeft: STANDARD_SPACING * 4,
            }}>
            <Text style={styles.boldtext}>Description:</Text>
          </View>
          <TextInput
            placeholder="Add a Description..."
            placeholderTextColor={colors.C7C7C}
            multiline={true}
            numberOfLines={5}
            keyboardType={
              Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'
            }
            autoCapitalize="words"
            style={styles.noteTextInput}
            value={note}
            onChangeText={text => setNote(text)}
          />
        </View>
        <View style={styles.btnview}>
          <Button
            label={'Proceed to Payment'}
            lablefont={scale(16)}
            labelColor={colors.white}
            style={styles.buttonStyle}
            backgroundColor={colors.primary}
            onPress={() => {
              paymentmethod();
            }}
          />
        </View>
      </ScrollView>
      {loading && <Indicators />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainwrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    alignItems: 'center',
  },
  descriptionview: {
    width: SCREEN_HEIGHT * 0.8,
    // backgroundColor:'red',
  },
  descriptiontext: {
    fontFamily: POPPINS_REGULAR,
    textTransform: 'capitalize',
    fontSize: scale(12),
    lineHeight: scale(16),
    textAlign: 'center',
    fontWeight: '400',
    color: colors.darkblack,
  },
  titleview: {
    marginVertical: STANDARD_SPACING * 3,
    borderRadius: STANDARD_BORDER_RADIUS * 0.8,
    alignSelf: 'center',
    padding: scale(12),
    paddingHorizontal: STANDARD_SPACING * 5,
    backgroundColor: colors.primary,
  },
  rupeeiconsty: {
    top: scale(2),
  },
  boldtext: {
    fontSize: scale(14),
    lineHeight: scale(20),
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '500',
    color: colors.darkblack,
  },
  largetext: {
    textAlign: 'center',
    fontSize: scale(18),
    lineHeight: scale(24),
    fontFamily: POPPINS_BOLD,
    fontWeight: '700',
    color: colors.darkblack,
  },
  Mediumtext: {
    textAlign: 'center',
    fontSize: scale(14),
    lineHeight: scale(20),
    fontFamily: POPPINS_BOLD,
    fontWeight: '700',
    color: colors.darkblack,
  },
  normaltext: {
    fontSize: scale(12),
    lineHeight: scale(16),
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '400',
    color: colors.darkblack,
  },
  RemainginputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: scale(10),
  },
  Remainginputstyl: {
    fontSize: scale(14),
    padding: STANDARD_SPACING * 2,
    fontFamily: POPPINS_REGULAR,
    width: SCREEN_WIDTH * 0.28,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: STANDARD_BORDER_RADIUS * 0.8,
    paddingLeft: STANDARD_SPACING * 2,
    borderWidth: scale(1),
    borderColor: colors.black,
    // borderColor: '#B6B6B6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    color: colors.black,
  },
  inputtextstyl: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  titletxt: {
    textTransform: 'capitalize',
    // textAlign: 'center',
    lineHeight: scale(24),
    letterSpacing: scale(0.6),
    fontSize: FONT_SIZE_XS,
    fontWeight: '700',
    fontFamily: POPPINS_BOLD,
    color: colors.darkblack,
  },
  titlesymbolewrapper: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  titlesymbole: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    letterSpacing: scale(1),
    fontSize: FONT_SIZE_XS,
    fontWeight: 'bold',
    fontFamily: POPPINS_BOLD,
    color: colors.darkblack,
  },
  notewrapper: {
    marginVertical: scale(20),
    alignItems: 'center',
  },
  noteTextInput: {
    width: SCREEN_WIDTH * 0.9,
    marginTop: scale(10),
    borderRadius: STANDARD_BORDER_RADIUS * 0.8,
    padding: STANDARD_SPACING * 3,
    borderWidth: 1,
    borderColor: colors.black,
    // borderColor: '#B6B6B6',
    alignItems: 'center',
    textAlignVertical: 'top',
    height: 'auto',
    fontSize: scale(14),
    fontFamily: POPPINS_REGULAR,
    fontWeight: '400',
    color: colors.black,
  },
  btnview: {
    marginVertical: STANDARD_SPACING * 8,
    top: scale(20),
  },
  buttonStyle: {
    position: 'absolute',
    bottom: scale(0),
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.9,
    borderRadius: STANDARD_BORDER_RADIUS * 2,
  },
  sectionTitleAndLinkWrapper: {
    margin: STANDARD_SPACING * 2,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_SM,
    fontWeight: '500',
  },
});

export default Payment;
