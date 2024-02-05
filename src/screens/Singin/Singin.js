import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Image, Linking, Keyboard} from 'react-native';
import Colors from '../../constants/colors';
import Header from '../../components/Header/Header';
import {Images} from '../../constants/images';
import Link from '../../components/links/Link';
import PhoneInput from 'react-native-phone-number-input';
import Button from '../../components/Button';
import {
  FONT_SIZE_SM,
  POPPINS_SEMIBOLD,
  STANDARD_BUTTON_HEIGHT,
  STANDARD_SPACING,
} from '../../constants/constants';
import colors from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import {verifyMobile} from '../../api/auth/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {showMessage} from 'react-native-flash-message';
import {Indicators} from '../../components/apploader';

// create a component
const Singin = ({navigation}) => {
  const phoneRef = useRef(null);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleGetOTP = async () => {
    if (!value || value.trim() === '') {
      showMessage({
        message: 'Mobile Number Required',
        description: 'Please fill in your mobile number for verification.',
        type: 'warning',
      });
      return;
    }

    if (value.replace(/[^0-9]/g, '').length !== 10) {
      showMessage({
        message: 'Invalid Mobile Number',
        description: 'Please enter a valid 10-digit mobile number.',
        type: 'danger',
      });
      return;
    }

    setLoading(true);

    const data = {
      phone_number: value,
    };

    await verifyMobile(data)
      .then(responseData => {
        console.log('responseData============>', responseData);
        setLoading(false);
        // Do something with the responseData if needed
        // For example, you can navigate to the OTP verification screen
        navigation.navigate('Otpverification', {
          formattedValue: formattedValue,
          value: value,
          data: responseData,
        });
      })
      .catch(error => {
        console.log('--------------', error);
        setLoading(false);
        // Error handling is already done inside the verifyMobile function
        // You can add additional error handling here if necessary
      });
  };

  // const handleInputChange = (text) => {
  //   const trimmedText = text.replace(/[^0-9]/g, '').slice(0, 10);
  //   setValue(trimmedText);

  //   if (trimmedText.length === 10 && text.length > 10) {
  //     showMessage({
  //       message: 'Maximum 10 digits allowed',
  //       description: 'Please enter a maximum of 10 digits.',
  //       type: 'danger',
  //     });
  //   }
  // };

  return (
    <View style={styles.mainWrapper}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        showsVerticalScrollIndicator={false}>
        <Header back iconColor={Colors.C7C7C} />
        <View style={styles.imgView}>
          <Image style={styles.imageSize} source={Images.otpVerifications} />
        </View>
        <Text style={styles.Signtxt}>Log-in</Text>
        <View style={styles.maintitleview}>
          <Text style={styles.txtstyle}>
            To Access Your Account, We Employ OTP Authentication
          </Text>
            <Text style={styles.txtstyle}> Sent To Your Mobile Number.</Text>
        </View>
        <View style={styles.phoneInputTitle}>
          <Text style={styles.phoneInputTitletxt}>Enter Mobile Number</Text>
        </View>
        <View style={styles.phoneInputView}>
          <PhoneInput
            textContainerStyle={styles.textContainerStyle}
            containerStyle={styles.containerStyle}
            codeTextStyle={styles.codeTextStyle}
            textInputStyle={styles.textInputStyle}
            countryPickerButtonStyle={styles.countryPickerButtonStyle}
            ref={phoneRef}
            keyboardType="numeric"
            value={value}
            defaultValue={value}
            // defaultCode="CA"
            defaultCode="IN"
            layout="first"
            textInputProps={{
              maxLength: 10,
            }}
            onChangeText={text => {
              const trimmedText = text.replace(/[^0-9]/g, '').slice(0, 10);
              // console.log('trimmedTexttrimmedText',trimmedText);
              setValue(trimmedText);
              if (trimmedText.length === 10) {
                Keyboard.dismiss();
              }
            }}
            onChangeFormattedText={text => {
              setFormattedValue(text);
            }}
            // withDarkTheme
            // withShadow
            // autoFocus={true}
          />
        </View>
        <View style={styles.buttonstyle}>
          <Button
            label={'Get OTP'}
            labelColor={Colors.white}
            labelStyle={{fontSize: FONT_SIZE_SM, fontWeight: '800'}}
            style={{borderRadius: STANDARD_BUTTON_HEIGHT * 0.5}}
            backgroundColor={Colors.primary}
            onPress={handleGetOTP}
            // onPress={() => navigation.navigate('Otpverification')}
          />
        </View>
        <View style={styles.termsContainer}>
          <Text style={styles.sendTxt}>
            By Logging In ,You Agree To Our
            <Text
              style={{fontWeight: '700', color: colors.primary}}
              onPress={() =>
                Linking.openURL('https://asaferwalk.com/terms-conditions/')
              }>
              {' '}
              Terms & Service
            </Text>{' '}
            And{' '}
            <Text
              style={{fontWeight: '700', color: colors.primary}}
              onPress={() =>
                Linking.openURL('https://asaferwalk.com/privacy-policy/')
              }>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
      {isLoading && <Indicators />}
    </View>
  );
};

export default Singin;
