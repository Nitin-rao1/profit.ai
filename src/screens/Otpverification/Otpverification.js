//import liraries
import React, {Component, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Image, Keyboard} from 'react-native';
import Colors from '../../constants/colors';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';
import {Images} from '../../constants/images';
import {
  FONT_SIZE_LG,
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  MONTSERRAT_SEMIBOLD,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_BUTTON_HEIGHT,
  STANDARD_OTP_TEXT_VIEW_BORDER_SIZE,
  STANDARD_OTP_TEXT_VIEW_SIZE,
  STANDARD_SPACING,
} from '../../constants/constants';
import Link from '../../components/links/Link';
import OTPTextView from 'react-native-otp-textinput';
import Button from '../../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../constants/colors';
import {CheckOtp, verifyMobile} from '../../api/auth/auth';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../redux/slices/SessionUser';
import {showMessage} from 'react-native-flash-message';
import {Indicators} from '../../components/apploader';

// create a component
const Otpverification = ({navigation, route}) => {
  const input = useRef(null);
  const [otpInput, setOtpInput] = useState('');
  const [showResendLink, setShowResendLink] = useState(false);
  const formatedMobileNumber = route?.params?.formattedValue;
  const userMobileNumber = route?.params?.value;
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleCellTextChange = async (text, i) => {
    if (i === 5 && text.length === 1) {
      // Dismiss the keyboard when the last digit is entered
      Keyboard.dismiss();
    }
  };

  const [timer, setTimer] = useState(59);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setShowResendLink(true);
      }
    }, 1000);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timer]);

  const onResendCode = async () => {
    const data = {phone_number: userMobileNumber};
    setLoading(true);

    await verifyMobile(data)
      .then(responseData => {
        console.log('responseData============>', responseData);
        // showMessage({
        //   message: 'OTP Resent',
        //   description: `New OTP sent successfully. Please check your messages.`,
        //   type: 'success',
        // });
        setTimer(59);
        setShowResendLink(false);
        setLoading(false);
      })
      .catch(error => {
        console.error('Resend OTP error:', error);
        showMessage({
          message: 'Resend Failed',
          description:
            'An error occurred while resending OTP. Please try again.',
          type: 'danger',
        });
        setLoading(false);
      });
  };

  const VerifyOtp = async () => {
    // Call the Otpverification function here
    setLoading(true);

    if (!otpInput || otpInput.trim() === '') {
      showMessage({
        message: 'OTP Required',
        description: 'Please enter the OTP to proceed.',
        type: 'warning',
      });
      setLoading(false);
      return;
    }

    await CheckOtp({
      userMobileNumber,
      otpInput,
    })
      .then(responseData => {
        console.log('Verification successful:======>', responseData);
        if (responseData.status == 'error') {
          showMessage({
            message: 'Verification Failed',
            description: 'Please Enter the valid OTP.',
            type: 'danger',
          });
          setLoading(false);
        } else {
          dispatch(updateUser({...responseData, isAuthenticated: true}));
          if (responseData.business_profile === false) {
            navigation.navigate('Gstscreen', {destination: 'Business'});
          } else {
            dispatch(updateUser({isLogin: true, isAuthenticated: true}));
            navigation.navigate('DrawerNavigator');
          }
        }
        setLoading(false);
      })
      .catch(error => {
        // Handle error if needed
        console.error('Verification failed:', error);
        setLoading(false);
        // You may want to show an error message to the user
      });
  };

  return (
    <View style={styles.container}>
      <Header back iconColor={Colors.C7C7C} />
      <KeyboardAwareScrollView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardShouldPersistTaps="handled">
        <View style={styles.imgView}>
          <Image
            style={styles.imageSize}
            source={Images.otpVerificationsCode}
          />
        </View>
        <View style={{marginHorizontal: STANDARD_SPACING * 3}}>
          <Text style={[styles.otpLockIconSubtitle, {color: colors.black}]}>
            Code has been sent to {formatedMobileNumber.slice(0, 7)}*****
            <Text style={{color: colors.black, fontWeight: 'bold'}}>
              {formatedMobileNumber.slice(-3)}
            </Text>
          </Text>
        </View>
        <View style={styles.OtpWrapper}>
          <OTPTextView
            ref={input}
            textInputStyle={styles.textInputContainer}
            handleTextChange={setOtpInput}
            onCodeFilled={() => Keyboard.dismiss()}
            handleCellTextChange={handleCellTextChange}
            inputCount={6}
            keyboardType="numeric"
            autoFocus
            tintColor={otpInput.length === 6 ? 'transparent' : Colors.black}
            offTintColor={'#EEEEEE'}
            clearTextOnFocus
          />
        </View>

        <View style={[styles.questionAndResendLinkWrapper]}>
          <Text style={[styles.Resendcode, {color: Colors.darkText}]}>
            Resend code in
          </Text>
          <Link
            style={{fontSize: FONT_SIZE_SM, fontWeight: '900'}}
            label={timer}
            labelColor={'#057FDC'}
          />
          <Text style={[styles.Resendcode, {color: Colors.darkText}]}> s</Text>
        </View>

        <View style={[styles.ResendLinkWrapper]}>
          <Text style={[styles.questions, {color: Colors.black}]}>
            Din’t receive OTP ?
          </Text>
          {showResendLink && (
            <Link
              style={{fontSize: FONT_SIZE_SM}}
              label="RESEND OTP"
              labelColor={'#057FDC'}
              onPress={onResendCode}
            />
          )}
        </View>

        <View style={styles.buttonstyle}>
          <Button
            label={'VERIFY & PROCEED'}
            labelColor={Colors.white}
            style={{borderRadius: STANDARD_BUTTON_HEIGHT * 0.5}}
            backgroundColor={Colors.primary}
            onPress={VerifyOtp}
            // onPress={() => {
            //   navigation.navigate('Verifications');
            // }}
          />
        </View>
      </KeyboardAwareScrollView>
      {isLoading && <Indicators />}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imagecontainer: {
    alignSelf: 'center',
    // height:scale(180),
    //    backgroundColor:'red'
  },
  imgView: {
    // flex: 0.67,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.67,
  },
  imageSize: {
    width: scale(231),
    height: scale(231),
    resizeMode: 'contain',
  },
  OtpWrapper: {
    // marginHorizontal: scale(25),
    // justifyContent:'center',
    alignItems: 'center',
    marginBottom: scale(10),
    // backgroundColor:'red'
  },
  otpLockIconSubtitle: {
    fontWeight: '700',
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: scale(14),
    alignSelf: 'center',
    marginBottom: scale(10),
  },
  textInputContainer: {
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    marginVertical: STANDARD_SPACING * 3,
    borderBottomWidth: STANDARD_OTP_TEXT_VIEW_BORDER_SIZE,
    borderWidth: STANDARD_OTP_TEXT_VIEW_BORDER_SIZE,
    width: scale(46),
    aspectRatio: 1,
    backgroundColor: '#FAFAFA',
    color: Colors.black,
    marginRight: STANDARD_SPACING / 2,
    // borderWidth:1,
    // borderColor: 'red',
  },
  questionAndResendLinkWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignSelf: 'center',
    // backgroundColor:'pink'
    marginBottom: scale(2),
  },
  ResendLinkWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignSelf: 'center',
    marginBottom: scale(10),
  },
  questions: {
    marginRight: STANDARD_SPACING,
    fontFamily: POPPINS_REGULAR,
    fontSize: scale(14),
    fontWeight: '400',
  },
  question: {
    marginRight: STANDARD_SPACING,
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_MD,
    fontWeight: '400',
  },
  Resendcode: {
    marginRight: STANDARD_SPACING,
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_SM,
    fontWeight: '900',
  },
  buttonstyle: {
    width: SCREEN_WIDTH * 0.7,
    alignSelf: 'center',
    marginVertical: STANDARD_SPACING * 5,
    // position: 'absolute',
    // bottom: scale(70),
  },
});

//make this component available to the app
export default Otpverification;
