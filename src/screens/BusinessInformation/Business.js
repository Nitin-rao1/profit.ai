import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Colors from '../../constants/colors';
import {
  FONT_SIZE_LG,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_BUTTON_HEIGHT,
  STANDARD_SPACING,
} from '../../constants/constants';
import {scale} from 'react-native-size-matters';
import {Images} from '../../constants/images';
import Header from '../../components/Header/Header';
import TextInputComp from '../../components/Input/TextInputComp';
import Button from '../../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropdownAccordion from '../../components/Accordion/DropdownAccordion';
import Icons from '../../components/Icons/Icons';
import colors from '../../constants/colors';
import {
  BussinessProfile,
  Findaddress,
  GetBusinessType,
  GetIndustryType,
} from '../../api/auth/auth';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {Indicators} from '../../components/apploader';
import {updateUser} from '../../redux/slices/SessionUser';

const Business = ({navigation, route}) => {
  const userInfo = useSelector(state => state.users.users);

  const [industry, SetIndustry] = useState(false);
  const [businesstype, SetBusinessType] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [businessTypeOptions, setBusinessTypeOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);
  const dispatch = useDispatch();
  const {gstNumber} = route?.params || {};
  console.log('gstnumber', gstNumber);

  console.log('ajscjsdbfjbsd', userInfo);

  useEffect(() => {
    const fetchIndustryType = async () => {
      await GetIndustryType(userInfo.token.access)
        .then(responseData => {
          console.log('responseData==fetchIndustryType==>', responseData.data);
          setIndustryOptions(responseData.data);
          fetchBusinessType();
        })
        .catch(error => {
          console.log('--------------', error);
          // Error handling is already done inside the verifyMobile function
          // You can add additional error handling here if necessary
          fetchBusinessType();
        });
    };

    fetchIndustryType();
    //
  }, []);

  const fetchBusinessType = async () => {
    await GetBusinessType(userInfo.token.access)
      .then(responseData => {
        console.log('responseData==fetchBusinessType==>', responseData.data);
        setBusinessTypeOptions(responseData.data);
      })
      .catch(error => {
        console.log('--------------', error);
        // Error handling is already done inside the verifyMobile function
        // You can add additional error handling here if necessary
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .matches(/^\S+@\S+$/, 'Invalid email format')
      .required('Email is required')
      .min(4, 'Email must be at least 4 characters'),
    name: Yup.string()
      .required('Business Name is required')
      .min(4, 'Business Name must be at least 4 characters'),
    zipcode: Yup.string()
      .matches(/^[0-9]+$/, 'Invalid zipcode')
      .required('Zipcode is required')
      .min(4, 'Zipcode must be at least 4 characters'),
    state: Yup.string()
      .required('State is required')
      .min(4, 'State must be at least 4 characters'),

    city: Yup.string()
      .required('City is required')
      .min(4, 'City must be at least 4 characters'),

    address1: Yup.string()
      .required('Address 1 is required')
      .min(4, 'Address 1 must be at least 4 characters'),

    address2: Yup.string()
      .required('Address 2 is required')
      .min(4, 'Address 2 must be at least 4 characters'),

    industryType: Yup.string().required('Industry is required'),
    // .min(2, 'Industry must be at least 4 characters'),

    industryName: industry
      ? Yup.string()
          .required('Industry Type is required')
          .min(4, 'Industry Type must be at least 4 characters')
      : null,
    businessType: Yup.string().required('Business Type is required'),
    // .min(2, 'Business Type must be at least 4 characters'),
    businessName: businesstype
      ? Yup.string()
          .required('Business Type is required')
          .min(4, 'Business Type must be at least 4 characters')
      : null,
  });

  const handleSubmit = async values => {
    // Handle form submission logic here
    console.log('Form values:', values);
    const data = {
      // "business_number": 4530943,
      business_name: values.name,
      gst_number: gstNumber || '',
      email: values.email,
      zipcode: values.zipcode,
      state: values.state,
      city: values.city,
      address1: values.address1,
      address2: values.address2,
      business_type:
        values.businessType === 'Others' ? 'others' : values.businessType,
      new_field1: values.businessType === 'Others' ? values.businessName : '',
      industry:
        values.industryType === 'Others' ? 'others' : values.industryType,
      new_field2: values.industryType === 'Others' ? values.industryName : '',
    };

    console.log('data', data);

    setLoading(true);

    // return;
    await BussinessProfile(userInfo.token.access, data)
      .then(responseData => {
        console.log('responseData============>', responseData.data);
        dispatch(updateUser({isLogin: true}));
        navigation.navigate('DrawerNavigator');
        setLoading(false);
      })
      .catch(error => {
        console.log('--------------', error);
        setLoading(false);
        // Error handling is already done inside the verifyMobile function
        // You can add additional error handling here if necessary
      });
    // navigation.navigate('DrawerNavigator');
  };

  const UserfindAddress = async (Zipcode, setFieldValue) => {
    setLoading(true);
    await Findaddress({Zipcode})
      .then(responseData => {
        console.log(responseData, 'responseData');
        // Remove the 'return' statement here
        const {District, State, address2} = responseData.data;
        setFieldValue('city', District);
        setFieldValue('state', State);
        setFieldValue('address2', address2);
        setAutoFilled(true);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('Error:', error);
        // Error handling is already done inside the verifyMobile function
        // You can add additional error handling here if necessary
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={[styles.container]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <Header back iconColor={Colors.C7C7C} />
        <View style={styles.imgView}>
          <Image
            style={styles.imageSize}
            source={Images.Business_Information}
          />
        </View>
        <View style={{backgroundColor: 'white', margin: STANDARD_SPACING * 3}}>
          <Text style={styles.titletxt}>Business Information</Text>
        </View>
        <Formik
          initialValues={{
            email: '',
            name: '',
            zipcode: '',
            state: '',
            city: '',
            address1: '',
            address2: '',
            industryType: '',
            industryName: '',
            businessType: '',
            businessName: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{marginHorizontal: scale(20)}}>
                  <View>
                    <Text style={styles.inputtitle}>E-mail id*</Text>
                    <TextInputComp
                      value={values.email.trim()}
                      placeholder={'Enter email'}
                      onChangeText={handleChange('email')}
                      keyboardType={'email-address'}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    <Text style={styles.inputtitle}>Business Name*</Text>
                    <TextInputComp
                      value={values.name.trimStart()}
                      placeholder={'Enter business name'}
                      onChangeText={handleChange('name')}
                      keyboardType={'default'}
                    />
                    {touched.name && errors.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}

                    <View style={styles.inputview}>
                      <View style={styles.zipcodeview}>
                        <Text style={styles.inputtitle}>Zipcode*</Text>
                        <TextInputComp
                          value={values.zipcode.trim()}
                          placeholder={'Enter zipcode'}
                          onChangeText={handleChange('zipcode')}
                          keyboardType={'numeric'}
                          maxLength={6}
                          textStyle={styles.inputStyle}
                        />
                      </View>
                      <View style={styles.findbtnview}>
                        <Button
                          label={'Find'}
                          labelColor={Colors.white}
                          style={styles.findbtn}
                          labelStyle={{fontSize: scale(12)}}
                          backgroundColor={Colors.primary}
                          onPress={() => {
                            const zipCode = values.zipcode;
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
                    {touched.zipcode && errors.zipcode && (
                      <Text style={styles.errorText}>{errors.zipcode}</Text>
                    )}

                    <View style={styles.inputview}>
                      <View style={styles.equalInput}>
                        <Text style={styles.inputtitle}>State</Text>
                        <TextInputComp
                          value={values.state}
                          placeholder={'Enter state'}
                          onChangeText={handleChange('state')}
                          keyboardType={'default'}
                          editable={isEditing && !autoFilled}
                          inputStyle={{
                            backgroundColor: autoFilled ? Colors.gray : null,
                          }}
                          textStyle={{fontSize:scale(12)}}
                        />
                        {touched.state && errors.state && (
                          <Text style={styles.errorText}>{errors.state}</Text>
                        )}
                      </View>
                      <View style={styles.equalInput}>
                        <Text style={styles.inputtitle}>City</Text>
                        <TextInputComp
                          value={values.city}
                          placeholder={'Enter city'}
                          onChangeText={handleChange('city')}
                          keyboardType={'default'}
                          editable={isEditing && !autoFilled}
                          inputStyle={{
                            backgroundColor: autoFilled ? Colors.gray : null,
                          }}
                          textStyle={{fontSize:scale(12)}}
                        />
                        {touched.city && errors.city && (
                          <Text style={styles.errorText}>{errors.city}</Text>
                        )}
                      </View>
                    </View>

                    <Text style={styles.inputtitle}>Address 1*</Text>
                    <TextInputComp
                      value={values.address1.trimStart()}
                      placeholder={'Enter house no. ,building name'}
                      onChangeText={handleChange('address1')}
                      onPressSecure={() => setSecureText(!secureText)}
                    />
                    {touched.address1 && errors.address1 && (
                      <Text style={styles.errorText}>{errors.address1}</Text>
                    )}

                    <Text style={styles.inputtitle}>Address 2*</Text>
                    <TextInputComp
                      value={values.address2}
                      placeholder={'Enter road name,colony'}
                      onChangeText={handleChange('address2')}
                      // editable={isEditing && !autoFilled}
                    />
                    {touched.address2 && errors.address2 && (
                      <Text style={styles.errorText}>{errors.address2}</Text>
                    )}

                    <Text style={styles.inputtitle}>Industry Type*</Text>

                    <DropdownAccordion
                      // title={'Select Option'}
                      placeholderName={'Select Option'}
                      options={industryOptions}
                      // backgroundColor={Colors.white}
                      // labelColor={Colors.darkblack}
                      // uncheckedRadioBackgroundColor={Colors.white}
                      // checkedRadioBackgroundColor={Colors.primary}
                      // selectedIndustry={values.selectedIndustry}
                      onPress={val => {
                        console.log('hgsdhshcsd', val);
                        if (val.name.toLocaleLowerCase() == 'others') {
                          setFieldValue('industryType', val.name);
                          SetIndustry(true);
                        } else {
                          setFieldValue('industryType', val.id);
                          SetIndustry(false);
                        }

                        // // setFieldValue(
                        // //   'industry',
                        // //   industry !== 'Others' ? industry : '',
                        // // );
                      }}
                      // onBlur={() => handleBlur('industryType')}
                    />
                    {touched.industryType && errors.industryType && (
                      <Text style={styles.errorText}>
                        {errors.industryType}
                      </Text>
                    )}
                    {industry && (
                      <>
                        <TextInputComp
                          value={values.industryName.trimStart()}
                          placeholder={'Enter your industry type'}
                          onChangeText={handleChange('industryName')}
                          keyboardType={'default'}
                        />
                        {touched.industryName && errors.industryName && (
                          <Text style={styles.errorText}>
                            {errors.industryName}
                          </Text>
                        )}
                      </>
                    )}

                    <Text style={styles.inputtitle}>Business Type*</Text>
                    <DropdownAccordion
                      placeholderName={'Select Option'}
                      // title={'Select Option'}
                      options={businessTypeOptions}
                      // backgroundColor={Colors.white}
                      // labelColor={Colors.darkblack}
                      // uncheckedRadioBackgroundColor={Colors.white}
                      // checkedRadioBackgroundColor={Colors.primary}
                      // selectedIndustry={values.selectedBusinessType}
                      onPress={val => {
                        if (val.name.toLocaleLowerCase() == 'others') {
                          setFieldValue('businessType', val.name);

                          SetBusinessType(true);
                        } else {
                          SetBusinessType(false);
                          setFieldValue('businessType', val.id);
                        }
                        // setFieldValue(
                        //   'businessType',
                        //   businessType !== 'Others' ? businessType : '',
                        // );
                      }}
                    />
                    {touched.businessType && errors.businessType && (
                      <Text style={styles.errorText}>
                        {errors.businessType}
                      </Text>
                    )}
                  </View>

                  {businesstype && (
                    <>
                      <TextInputComp
                        value={values.businessName.trimStart()}
                        placeholder={'Enter your business type'}
                        onChangeText={handleChange('businessName')}
                        keyboardType={'default'}
                      />
                      {touched.businessName && errors.businessName && (
                        <Text style={styles.errorText}>
                          {errors.businessName}
                        </Text>
                      )}
                    </>
                  )}

                  <View style={styles.buttonstyle}>
                    <Button
                      label={'SUBMIT'}
                      labelColor={Colors.white}
                      style={{borderRadius: STANDARD_BORDER_RADIUS * 6}}
                      backgroundColor={Colors.primary}
                      onPress={
                        handleSubmit
                        // () => {navigation.navigate('DrawerNavigator');}
                      }
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
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
    backgroundColor: Colors.white,
  },
  imgView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.54,
  },
  imageSize: {
    width: scale(186),
    height: scale(170),
    resizeMode: 'contain',
  },
  titletxt: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: FONT_SIZE_LG,
    fontWeight: '700',
    fontFamily: POPPINS_BOLD,
    color: Colors.darkblack,
  },
  zipcodeview: {
    width: SCREEN_WIDTH * 0.65,
  },
  findbtnview: {
    position:'absolute',
    alignSelf: 'center',
    marginLeft:STANDARD_SPACING * 50,
  },
  findbtn: {
    width: 'auto',
    borderRadius: STANDARD_BORDER_RADIUS * 1.2,
    height: scale(45),
    alignItems: 'center',
    justifyContent: 'center',
    top: scale(5),
  },
  inputStyle: {
    textAlign: 'left',
    alignItems: 'center',
  },
  inputview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  equalInput: {
    width: SCREEN_WIDTH * 0.42,
  },
  buttonstyle: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    marginVertical: STANDARD_SPACING * 5,
  },
  inputtitle: {
    fontFamily: POPPINS_REGULAR,
    fontSize: scale(14),
    fontWeight: '600',
    color: Colors.darkblack,
    bottom: scale(2),
  },
  errorText: {
    color: 'red',
    fontSize: scale(10),
    // backgroundColor:'pink',
    bottom: scale(14),
  },
});

export default Business;

//  const { business_name, zipcode, city, state, address1, address2, email, business_type, industry } = data;
// const updatedValues = {
//   ...values,
//   businessName: business_name,
//   zipcode,
//   city,
//   state,
//   address1,
//   address2,
//   email,
//   selectedBusinessType: BusinessType[business_type - 1], // Assuming business_type is an index
//   selectedIndustry: Industry[industry - 1], // Assuming industry is an index
// };

// console.log('updatedValues',updatedValues);
