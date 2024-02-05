import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import colors from '../../constants/colors';
import Header from '../../components/Header/Header';
import {Image} from 'react-native';
import Icons from '../../components/Icons/Icons';
import {s, scale} from 'react-native-size-matters';
import {
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_SPACING,
} from '../../constants/constants';
import TextInputComp from '../../components/Input/TextInputComp';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  Findaddress,
  GetBusinessType,
  GetIndustryType,
  savePhoto,
  BussinessUpdateProfile,
} from '../../api/auth/auth';
import Button from '../../components/Button';
import DropdownAccordion from '../../components/Accordion/DropdownAccordion';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useIsFocused} from '@react-navigation/native';
import ImagePickerModal from '../../components/Modal/ImagePickerModal/ImagePickerModal';
import {updateUser} from '../../redux/slices/SessionUser';
import {API_URL} from '../../../env';
import {Indicators} from '../../components/apploader';

// create a component
const Profile = ({navigation}) => {
  const [industry, SetIndustry] = useState(false);
  const [businesstype, SetBusinessType] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [businessTypeOptions, setBusinessTypeOptions] = useState([]);
  const [autoFilled, setAutoFilled] = useState(false);
  const userInfo = useSelector(state => state.users.users);
  const [isImageLoading, setImageLoading] = useState(false);

  console.log('userInfo==========', userInfo);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(userInfo?.profilePic);

  const dispatch = useDispatch();
  console.log('setselectedimage==========', selectedImage);

  console.log('ProfileuserInfo', userProfilePic);
  console.log('ProfileuserInfo email', userInfo.business_profile_data.email);

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

  useEffect(() => {
    const fetchIndustryType = async () => {
      await GetIndustryType(userInfo.token.access)
        .then(responseData => {
          // console.log('responseData==fetchIndustryType==>', responseData.data);
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
        // console.log('responseData==fetchBusinessType==>', responseData.data);
        setBusinessTypeOptions(responseData.data);
        setLoading(false);
      })
      .catch(error => {
        console.log('--------------', error);
        setLoading(false);
      });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleCameraPress = () => {
    closeModal();
    openCamera();
  };

  // const handleGalleryPress = () => {
  //   closeModal();
  // };

  const [cameraPhoto, setCameraPhoto] = useState();
  console.log('iiiiiii', cameraPhoto);

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
    quality: 0.1,
    includeBase64: true,
  };
  const isFocused = useIsFocused();

  const [image, setImage] = useState();
  console.log('adadafadaadaafaf', image);
  useEffect(() => {
    // getPhoto(setImage)
    console.log('Component is focused');
    console.log(cameraPhoto, 'nitin');
  }, [isFocused, cameraPhoto]);

  const openCamera = async () => {
    setModalVisible(false);
    const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;
    const storagePermission =
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const granted = await PermissionsAndroid.requestMultiple([
      cameraPermission,
      storagePermission,
    ]);

    if (
      granted[cameraPermission] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[storagePermission] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      // Camera and storage permissions are granted
      const result = await launchCamera(options);
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      const uri = result.assets[0].uri;
      setSelectedImage(base64);

      // console.log('base64', base64);
      // const userID = userInfo.objectId;
      // const data = { userID: userID, photo: base64 };
      // const formData = {profile_image: base64};
      const formData = {profile_images_uri: base64};
      // console.log('result',result.assets[0].uri);
      // console.log('data', data);

      // const formData = new FormData();
      //   formData.append('profile_image', {
      //     uri: result.assets[0].uri,
      //     type: result.assets[0].type,
      //     name: result.assets[0].fileName,
      //   });
      // formData.append('ppppp',
      //   result.assets[0].uri
      // );
      // console.log('formData', formData);
      // return
      setImageLoading(true);
      await savePhoto(userInfo.token.access, formData)
        .then(val => {
          console.log('Photo saved successfully:', val);
          setCameraPhoto(val?.user_profile_data?.profile_image);
          setUserProfilePic(val?.user_profile_data?.profile_image);
          dispatch(
            updateUser({profilePic: val?.user_profile_data?.profile_image}),
          );
          setImageLoading(false);
        })
        .catch(err => {
          setImageLoading(false);
          console.log(err.response);
        });
    } else {
      // Camera or storage permission is not granted
      console.log('Camera or storage permission is not granted');
    }
  };

  const handleGalleryPress = () => {
    openGallery();
    closeModal();
  };

  const openGallery = async () => {
    setModalVisible(false);
    const galleryPermission =
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const granted = await PermissionsAndroid.request(galleryPermission);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchImageLibrary(options);

      if (!result.didCancel) {
        const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      const uri = result.assets[0].uri;
        setSelectedImage(base64);

        const formData = {profile_images_uri: base64};
        // console.log(
        //   'forformDataformDataformDataformDataformDataformDataformDataformDataformDatamDataformData',
        //   formData,
        // );
        // const formData = new FormData();
        // formData.append('profile_image', {
        //   uri: result.assets[0].uri,
        //   type: result.assets[0].type,
        //   name: result.assets[0].fileName,
        // });
        setImageLoading(true);
        await savePhoto(userInfo?.token.access, formData)
          .then(val => {
            console.log('Photo saved successfully:', val);
            console.log(
              'Photo saved successfully:',
              val?.user_profile_data?.profile_image,
            );
            setCameraPhoto(val?.user_profile_data?.profile_image);
            setUserProfilePic(val?.user_profile_data?.profile_image);
            dispatch(
              updateUser({profilePic: val?.user_profile_data?.profile_image}),
            );
            setImageLoading(false);
          })
          .catch(err => {
            console.log(err.response);
            setImageLoading(false);
          });
      }
    } else {
      console.log('Gallery permission not granted');
    }
  };

  // const updatedUserInfo = {
  //   ...userInfo,
  //   business_profile_data: responseData.data,
  // };
  // const updatedProfilePic = responseData.data?.profile_image || userProfilePic;
  const handleSubmit = async values => {
    // console.log('Form valuesttt:', values);
    const data = {
      business_name: values.name,
      gst_number: '',
      email: values.email,
      zipcode: values.zipcode,
      city: values.city,
      user_profile: userInfo.business_profile_data.user_profile,
      address1: values.address1,
      address2: values.address2,
      business_type:
        values.businessType === 'Others' ? 'others' : values.businessType,
      // new_field1: values.businessType === 'others' ? values.businessName : '',
      industry:
        values.industryType === 'Others' ? 'others' : values.industryType,
      // new_field2: values.industryType === 'others' ? values.industryName : '',
    };

    setLoading(true);

    await BussinessUpdateProfile(userInfo?.token.access, data)
      .then(responseData => {
        console.log('responseData=======dddddddd=====>', responseData.data);
        dispatch(updateUser({business_profile_data: responseData.data}));
        setLoading(false);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('--------------', error);
        setLoading(false);
      });
    navigation.navigate('DrawerNavigator');
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
        setLoading(false);
        setAutoFilled(true);
      })
      .catch(error => {
        setLoading(false);
        console.log('Error:', error);
        // Error handling is already done inside the verifyMobile function
        // You can add additional error handling here if necessary
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Header
          back
          iconColor={colors.C7C7C}
          title={'Profile'}
          Textcolor={colors.black}
        />
        <ScrollView>
          <View style={styles.profileImgContainer}>
            {isImageLoading && <Indicators />}
            <Image
              style={styles.imgstyl}
              source={{uri: selectedImage || userProfilePic}}
              onError={error => console.log('Image Loading Error:', error)}
            />
          </View>
          <TouchableOpacity
            onPress={() => openModal()}
            style={styles.pencilview}>
            <Icons
              name={'pencil'}
              iconType={'Octicons'}
              color={colors.white}
              size={20}
              style={styles.icons}
            />
          </TouchableOpacity>
          {/* <View style={styles.usernameview}>
            <Text style={styles.usernametxt}>
              {userInfo.business_profile
                ? ` ${userInfo.business_profile_data.business_name}`
                : 'Heylie ronaldo'}
            </Text>
          </View> */}

          <View style={{marginHorizontal: scale(0)}}>
            <Formik
              initialValues={{
                email: userInfo.business_profile_data.email || '',
                name: userInfo.business_profile_data.business_name || '',
                zipcode: userInfo.business_profile_data.zipcode || '',
                state: userInfo.business_profile_data.state || '',
                city: userInfo.business_profile_data.city || '',
                address1: userInfo.business_profile_data.address1 || '',
                address2: userInfo.business_profile_data.address2 || '',
                industryType: userInfo.business_profile_data.industry || '',
                industryName: '',
                businessType:
                  userInfo.business_profile_data.business_type || '',
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
                    <View style={{marginHorizontal: scale(20),marginTop:scale(15)}}>
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
                          value={values.name.trim()}
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
                              value={values.zipcode}
                              placeholder={'Enter zipcode'}
                              onChangeText={handleChange('zipcode')}
                              keyboardType={'numeric'}
                              maxLength={6}
                            />
                          </View>
                          <View style={styles.findbtnview}>
                            <Button
                              label={'Find'}
                              labelColor={colors.white}
                              style={styles.findbtn}
                              backgroundColor={colors.primary}
                              onPress={() => {
                                const zipCode = values.zipcode;
                                console.log('zipCode', zipCode);
                                setIsEditing(false);
                                if (zipCode === '') {
                                  // console.log("sddhdgddd")
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
                                paddingHorizontal: scale(6),
                                backgroundColor: autoFilled
                                  ? colors.gray
                                  : null,
                              }}
                              textStyle={{fontSize: scale(12)}}
                            />
                            {touched.state && errors.state && (
                              <Text style={styles.errorText}>
                                {errors.state}
                              </Text>
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
                                paddingHorizontal: scale(6),
                                backgroundColor: autoFilled
                                  ? colors.gray
                                  : null,
                              }}
                              textStyle={{fontSize: scale(12)}}
                            />
                            {touched.city && errors.city && (
                              <Text style={styles.errorText}>
                                {errors.city}
                              </Text>
                            )}
                          </View>
                        </View>

                        <Text style={styles.inputtitle}>Address 1*</Text>
                        <TextInputComp
                          value={values.address1}
                          placeholder={'Enter house no. ,building name'}
                          onChangeText={handleChange('address1')}
                          onPressSecure={() => setSecureText(!secureText)}
                        />
                        {touched.address1 && errors.address1 && (
                          <Text style={styles.errorText}>
                            {errors.address1}
                          </Text>
                        )}

                        <Text style={styles.inputtitle}>Address 2*</Text>
                        <TextInputComp
                          value={values.address2}
                          placeholder={'Enter road name,colony'}
                          onChangeText={handleChange('address2')}
                          // editable={isEditing && !autoFilled}
                        />
                        {touched.address2 && errors.address2 && (
                          <Text style={styles.errorText}>
                            {errors.address2}
                          </Text>
                        )}

                        <Text style={styles.inputtitle}>Industry Type*</Text>

                        <DropdownAccordion
                          placeholderName={'Select Option'}
                          options={industryOptions}
                          selectedIndustry={values.industryType?.id || ''}
                          onPress={val => {
                            // console.log('hgsdhshcsd', val);

                            if (val.name.toLocaleLowerCase() === 'others') {
                              setFieldValue('industryType', val.name);
                              SetIndustry(true);
                            } else {
                              setFieldValue('industryType', val.id || '');
                              SetIndustry(false);
                            }
                          }}
                          selectid={userInfo.business_profile_data.industry}
                        />

                        {touched.industryType && errors.industryType && (
                          <Text style={styles.errorText}>
                            {errors.industryType}
                          </Text>
                        )}
                        {industry && (
                          <>
                            <TextInputComp
                              value={values.industryName.trim()}
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
                          options={businessTypeOptions}
                          onPress={val => {
                            if (val.name.toLocaleLowerCase() == 'others') {
                              setFieldValue('businessType', val.name);

                              SetBusinessType(true);
                            } else {
                              SetBusinessType(false);
                              setFieldValue('businessType', val.id);
                            }
                          }}
                          selectid={values?.businessType}
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
                            value={values.businessName.trim()}
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
                          label={'Update Profile'}
                          labelColor={colors.white}
                          style={{borderRadius: STANDARD_BORDER_RADIUS * 1.8}}
                          backgroundColor={colors.primary}
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
          </View>
        </ScrollView>
        <ImagePickerModal
          isVisible={isModalVisible}
          onClose={closeModal}
          onCameraPress={() => openCamera()}
          onGalleryPress={() => handleGalleryPress()}
        />
        {isLoading && <Indicators />}
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  // Imagecontainer: {
  //   alignItems: 'center',
  // },
  profileImgContainer: {
    height: scale(120),
    width: scale(120),
    borderRadius: scale(60),
    alignSelf: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: colors.gray,
  },
  imgstyl: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(120),
    width: scale(120),
    borderRadius: scale(60),
    resizeMode: 'contain',
  },
  pencilview: {
    backgroundColor: colors.primary,
    height: scale(30),
    width: scale(30),
    borderRadius: scale(8),
    position: 'absolute',
    top: scale(90),
    right: scale(110),
    justifyContent: 'center',
  },
  usernameview: {
    alignItems: 'center',
    marginVertical: scale(10),
  },
  usernametxt: {
    fontSize: scale(20),
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '700',
    lineHeight: scale(20),
    color: colors.black,
  },
  icons: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  findbtn: {
    borderRadius: STANDARD_BORDER_RADIUS * 1.2,
    width: SCREEN_WIDTH * 0.22,
    marginTop: scale(3),
    height: scale(45),
    alignItems: 'center',
  },
  inputview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  zipcodeview: {
    width: SCREEN_WIDTH * 0.62,
  },
  findbtnview: {
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
    color: colors.darkblack,
    bottom: scale(2),
  },
  errorText: {
    color: 'red',
    fontSize: scale(10),
    // backgroundColor:'pink',
    bottom: scale(14),
  },
});

export default Profile;
