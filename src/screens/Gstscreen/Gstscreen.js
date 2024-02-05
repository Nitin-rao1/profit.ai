import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import colors from '../../constants/colors';
import Header from '../../components/Header/Header';
import {Images} from '../../constants/images';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_MD,
  FONT_SIZE_XXS,
  POPPINS_BOLD,
  POPPINS_REGULAR,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_SPACING,
} from '../../constants/constants';
import Gstoption from '../../components/Gstoption/Gstoption';
import TextInputComp from '../../components/Input/TextInputComp';
import Button from '../../components/Button';
import {showMessage} from 'react-native-flash-message';

const Gstscreen = ({navigation, route}) => {
  const [gstNumber, setGstNumber] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [gstError, setGstError] = useState('');
  const {destination} = route?.params;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleOptionSelect = option => {
    setSelectedOption(option);
    setGstNumber(''); // Clear the input when changing the option
    setGstError('');
  };

  const validateGst = () => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9]{1}$/;
    if (!gstNumber.trim()) {
      setGstError('Please enter GSTIN number');
      return false;
    }
    if (gstNumber.length < 15) {
      setGstError('GSTIN should have at least 15 characters');
      return false;
    }
    if (!gstRegex.test(gstNumber)) {
      setGstError('Please enter a valid GSTIN number');
      return false;
    }
    setGstError('');
    // You can add more validation logic for GSTIN here if needed
    return true;
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      showMessage({
        message: 'Select GST Option',
        description: 'Please choose whether you have GST or not.',
        type: 'warning',
      });
      return; // Stop the submission if no option is selected
    }

    if (selectedOption === 'No') {
      // Navigate without GST
      if (destination === 'Business') {
        navigation.navigate('Business');
      } else if (destination === 'CustomerInfo') {
        navigation.navigate('CustomerInfo', {isEditable: false});
      }
    } else {
      // Validate GST and navigate with GST
      if (validateGst()) {
        if (destination === 'Business') {
          navigation.navigate('Business', {gstNumber});
        } else if (destination === 'CustomerInfo') {
          navigation.navigate('CustomerInfo', {gstNumber, isEditable: false});
        }
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <Header back iconColor={colors.C7C7C} />
          <View style={styles.imgView}>
            <Image style={styles.imageSize} source={Images.Gst_Screen} />
            <Text style={styles.tittletxt}>Do You Have GST?</Text>
          </View>
          <Gstoption onOptionSelect={handleOptionSelect} />
          {selectedOption === 'Yes' && (
            <View style={styles.Inputcontainer}>
              <Text style={styles.inputtitle}>Enter your GSTIN</Text>
              <TextInputComp
                value={gstNumber}
                placeholder={'Enter GSTIN number'}
                autoCapitalize={'characters'}
                keyboardType={'default'}
                maxLength={15}
                onChangeText={value => {
                  const trimmedValue = value.replace(/\s/g, '').slice(0, 15);
                  setGstNumber(trimmedValue);
                  setGstError(''); // Clear error when typing
                }}
              />
              {gstError ? (
                <Text style={styles.errorText}>{gstError}</Text>
              ) : null}
            </View>
          )}

          <Button
            label={'SUBMIT'}
            labelColor={colors.white}
            lablefont={scale(14)}
            lablefontFamily={POPPINS_BOLD}
            lableweight={'bold'}
            style={styles.submitbtn}
            backgroundColor={colors.primary}
            // onPress={() => {
            //   if (destination === 'Business') {
            //     navigation.navigate('Business');
            //   } else if (destination === 'CustomerInfo') {
            //     navigation.navigate('CustomerInfo');
            //   }
            // }}
            onPress={handleSubmit}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: STANDARD_SPACING * 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  imgView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  imageSize: {
    width: scale(231),
    height: scale(231),
    marginLeft: STANDARD_SPACING * 8,
    resizeMode: 'contain',
  },
  tittletxt: {
    fontSize: FONT_SIZE_MD,
    fontWeight: '700',
    fontFamily: POPPINS_BOLD,
    color: colors.black,
  },
  inputtitle: {
    fontFamily: POPPINS_REGULAR,
    fontSize: scale(14),
    fontWeight: '600',
    color: colors.darkblack,
    bottom: scale(5),
  },
  Inputcontainer: {
    margin: scale(14),
    padding: scale(10),
  },
  submitbtn: {
    borderRadius: STANDARD_BORDER_RADIUS * 6,
    justifyContent: 'center',
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.7,
    position: 'absolute',
    bottom: scale(30),
    marginTop: STANDARD_SPACING * 5,
  },
  errorText: {
    color: colors.error,
    fontSize: FONT_SIZE_XXS,
    bottom: scale(14),
  },
});

export default Gstscreen;
