import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {
  FONT_SIZE_MD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_SPACING,
} from '../../constants/constants';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';
import Button from '../../components/Button';
import TextInputComp from '../../components/Input/TextInputComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as yup from 'yup';
import {
  showError,
  showSuccess,
} from '../../components/FlashMessage/FlashMessage';
import {CustomerCreate, Findaddress} from '../../api/auth/auth';
import {useDispatch, useSelector} from 'react-redux';
import {Indicators} from '../../components/apploader';
import {updateUser} from '../../redux/slices/SessionUser';
import colors from '../../constants/colors';
import {showMessage} from 'react-native-flash-message';

const validationSchema = yup.object().shape({
  FirstName: yup.string().trim().required('Full name is required'),
  Number: yup
    .string()
    .required('Mobile number is required')
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  Zipcode: yup.string().required('Zipcode is required'),
  // address: yup.string().required('Address is required'),
  email: yup
    .string()
    .email('Invalid email')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
      'Invalid email format',
    ),
  // GSTINNumber: yup.string().required('GSTIN Number is required'),
});

const CustomerInfo = ({navigation, route}) => {
  const [isEditing, setIsEditing] = useState(true);
  const userInfo = useSelector(state => state.users.users);
  const {userinfo} = route.params || {};
  const {CustomerInfo} = route.params || {};
  console.log('CustomerInfo', CustomerInfo);
  const {gstNumber} = route?.params || {};
  const {isEditable} = route?.params || {};
  console.log('isEditable', isEditable);
  console.log('userinfo', userInfo);
  console.log('gstnumber', gstNumber);
  console.log('userInfo', userinfo);
  const [State, setState] = useState('');
  const [City, setCity] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);
  const dispatch = useDispatch();

  // console.log('User Details:', userInfo);

  const handleSubmit = async values => {
    console.log('Form values:', values);

    if (CustomerInfo === true) {
      navigation.navigate('AddItems');
      return;
    }

    if (
      values.FirstName === '' ||
      values.Number === '' ||
      values.Zipcode === ''
    ) {
      showError('Please fill in all fields.');
    } else {
      console.log('Form submitted successfully!');

      const data = {
        customer_name: values.FirstName,
        email: values.email,
        address: `${values.address} ${City} ${State} India`,
        zipcode: values.Zipcode,
        phone_number: values.Number,
        gst_number: values.GSTINNumber,
      };

      console.log('data', data);
      setLoading(true);
      await CustomerCreate(userInfo.token.access, data)
        .then(responseData => {
          console.log('responseData============cccc>', responseData.data);
          dispatch(updateUser({customer: responseData?.data}));
          navigation.navigate('AddItems');
          setLoading(false);
        })
        .catch(error => {
          console.log('--------------', error);
          setLoading(false);
          // Error handling is already done inside the verifyMobile function
          // You can add additional error handling here if necessary
        });
    }
  };

  const UserfindAddress = async (Zipcode, setFieldValue) => {
    setLoading(true);
    await Findaddress({Zipcode})
      .then(responseData => {
        console.log('responseData', responseData);
        // Remove the 'return' statement here
        const {District, State, address2} = responseData.data;
        setState(State);
        setCity(District);
        setAutoFilled(true);
        setLoading(false);
        // setFieldValue('city', District);
        // setFieldValue('state', State);
        setFieldValue('address', address2);
      })
      .catch(error => {
        setLoading(false);
        console.log('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        back
        iconColor={colors.C7C7C}
        title={'Customer Information'}
        Textcolor={colors.black}
      />
      <KeyboardAwareScrollView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardShouldPersistTaps="handled">
        {/* <View style={styles.contentWrapper}>
          <Text style={styles.contentText}>
            In order to ensure correct billing and prompt
            <Text> communication for upcoming transactions,</Text>
            <Text> kindly update the invoice system to incorporate the</Text>
            <Text> new client in the records.</Text>
          </Text>
        </View> */}
        <Formik
          initialValues={{
            FirstName: userinfo?.customer_name || '',
            Number: userinfo?.phone_number || '',
            Zipcode: userinfo?.zipcode || '',
            address: userinfo?.address || '',
            email: userinfo?.email || '',
            GSTINNumber: userinfo?.gst_number || gstNumber || '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleSubmit(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.inputWrapper}>
              <View style={{marginVertical: scale(20)}}>
                <Text style={styles.inputtitle}>Full Name*</Text>
                <TextInputComp
                  value={values.FirstName}
                  placeholder={'Enter full name'}
                  onChangeText={value => {
                    handleChange('FirstName')(value.trimStart());
                  }}
                  onBlur={handleBlur('FirstName')}
                  keyboardType={'default'}
                  autoCapitalize="words"
                  error={touched.FirstName && errors.FirstName}
                  inputStyle={styles.inputstyl}
                />
                <Text style={styles.errorText}>
                  {touched.FirstName && errors.FirstName}
                </Text>

                <Text style={styles.inputtitle}>Mobile Number*</Text>
                <TextInputComp
                  value={values.Number}
                  placeholder={'Enter mobile number'}
                  keyboardType={'numeric'}
                  maxLength={10}
                  onChangeText={handleChange('Number')}
                  onBlur={handleBlur('Number')}
                  // error={touched.Number && errors.Number}
                  inputStyle={styles.inputstyl}
                />
                <Text style={styles.errorText}>
                  {touched.Number && errors.Number}
                </Text>

                <View style={styles.inputview}>
                  <View style={styles.zipcodeview}>
                    <Text style={styles.inputtitle}>Zipcode*</Text>
                    <TextInputComp
                      value={values.Zipcode}
                      placeholder={'Enter zipcode'}
                      keyboardType={'numeric'}
                      maxLength={6}
                      onChangeText={value => {
                        handleChange('Zipcode')(value.trim());
                      }}
                      onBlur={handleBlur('Zipcode')}
                      inputStyle={styles.inputstyl}
                      textStyle={styles.inputStyle}
                    />
                  </View>
                  <View style={styles.findbtnview}>
                    <Button
                      label={'Find'}
                      labelColor={colors.white}
                      style={styles.findbtn}
                      labelStyle={{fontSize: scale(12)}}
                      backgroundColor={colors.primary}
                      onPress={() => {
                        const zipCode = values.Zipcode;
                        setIsEditing(false);
                        if (zipCode === '') {
                          showMessage({
                            message: 'ZIP code Required',
                            description:
                              'Please enter the 6 digit ZIP code to proceed.',
                            type: 'warning',
                          });
                        } else {
                          UserfindAddress(zipCode, setFieldValue);
                        }
                      }}
                    />
                  </View>
                </View>
                <Text style={styles.errorText}>
                  {touched.Zipcode && errors.Zipcode}
                </Text>

                {autoFilled && (
                  <View style={styles.inputview}>
                    <View style={styles.equalInput}>
                      <Text style={styles.inputtitle}>State</Text>
                      <TextInputComp
                        value={State}
                        placeholder={'Enter state'}
                        onChangeText={handleChange('state')}
                        keyboardType={'default'}
                        editable={isEditing && !autoFilled}
                        inputStyle={{
                          backgroundColor: autoFilled ? colors.gray : null,
                          paddingHorizontal: scale(4),
                        }}
                        textStyle={{fontSize: scale(12)}}
                      />
                    </View>
                    <View style={styles.equalInput}>
                      <Text style={styles.inputtitle}>City</Text>
                      <TextInputComp
                        value={City}
                        placeholder={'Enter city'}
                        onChangeText={handleChange('city')}
                        keyboardType={'default'}
                        editable={isEditing && !autoFilled}
                        inputStyle={{
                          backgroundColor: autoFilled ? colors.gray : null,
                          paddingHorizontal: scale(4),
                        }}
                        textStyle={{fontSize: scale(12)}}
                      />
                    </View>
                  </View>
                )}

                <Text style={styles.inputtitle}>Address</Text>
                <TextInputComp
                  value={values.address}
                  placeholder={'Enter address'}
                  keyboardType={'default'}
                  autoCapitalize="words"
                  onChangeText={value => {
                    handleChange('address')(value.trimStart());
                  }}
                  onBlur={handleBlur('address')}
                  // error={touched.address && errors.address}
                  // inputStyle={styles.inputstyl}
                />

                {/* <Text style={styles.errorText}>
                  {touched.address && errors.address}
                </Text> */}

                <Text style={styles.inputtitle}>Email</Text>
                <TextInputComp
                  value={values.email}
                  placeholder={'Enter email'}
                  onChangeText={value => {
                    handleChange('email')(value.trim());
                  }}
                  onBlur={handleBlur('email')}
                  // error={touched.email && errors.email}
                  // inputStyle={styles.inputstyl}
                />
                {/* <Text style={styles.errorText}>
                  {touched.email && errors.email}
                </Text> */}

                {isEditable && (
                  <>
                    <Text style={styles.inputtitle}>GSTIN Number</Text>
                    <TextInputComp
                      value={values.GSTINNumber}
                      placeholder={'Enter GSTIN number'}
                      keyboardType={'default'}
                      autoCapitalize={'characters'}
                      onChangeText={value => {
                        handleChange('GSTINNumber')(value.trim());
                      }}
                      onBlur={handleBlur('GSTINNumber')}
                      // error={touched.GSTINNumber && errors.GSTINNumber}
                      // inputStyle={styles.inputstyl}
                    />
                  </>
                )}
                {/* <Text style={styles.errorText}>
                  {touched.GSTINNumber && errors.GSTINNumber}
                </Text> */}
              </View>
              <Button
                label={'Click to submit'}
                labelColor={colors.white}
                style={styles.submitBtnStyle}
                backgroundColor={colors.primary}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      {isLoading && <Indicators />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    // backgroundColor: 'red',
    marginHorizontal: scale(8),
    marginVertical: scale(10),
  },
  contentText: {
    fontFamily: POPPINS_REGULAR,
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: scale(16),
    color: colors.darkblack,
    fontSize: scale(12),
    fontWeight: '400',
  },
  inputWrapper: {
    marginHorizontal: scale(15),
  },
  inputtitle: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: scale(14),
    fontWeight: '400',
    color: colors.darkblack,
    marginBottom: scale(5),
  },
  inputview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  zipcodeview: {
    width: SCREEN_WIDTH * 0.65,
  },
  inputStyle: {
    textAlign: 'left',
    alignItems: 'center',
  },
  findbtnview: {
    position: 'absolute',
    alignSelf: 'center',
    marginLeft: STANDARD_SPACING * 48,
  },
  findbtn: {
    width: scale(80),
    borderRadius: STANDARD_BORDER_RADIUS * 1.2,
    height: scale(45),
    alignItems: 'center',
    justifyContent: 'center',
    top: scale(14),
  },
  equalInput: {
    width: SCREEN_WIDTH * 0.42,
  },
  inputstyl: {
    marginBottom: null,
  },
  submitBtnStyle: {
    // marginTop: scale(30),
    marginBottom: scale(30),
    width: SCREEN_WIDTH * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: scale(10),
    lineHeight: scale(16),
    fontFamily: POPPINS_REGULAR,
    // marginBottom: scale(5),
  },
});

export default CustomerInfo;
