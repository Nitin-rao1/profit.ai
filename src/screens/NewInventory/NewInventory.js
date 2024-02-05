import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';
import Header from '../../components/Header/Header';
import {
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
} from '../../constants/constants';
import {scale} from 'react-native-size-matters';
import TextInputComp from '../../components/Input/TextInputComp';
import Button from '../../components/Button';
import SelectDropdown from 'react-native-select-dropdown';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icons from '../../components/Icons/Icons';
import {
  userAllDataList,
  userDeleteProductList,
  userGetInventory,
  userPostInventory,
  userUpdateList,
} from '../../api/auth/auth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setCategoriesData} from '../../redux/slices/InventrySlice';
import DeleteModal from '../../components/Modal/DeleteModal/DeleteModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

// create a component
const NewInventory = ({navigation, route}) => {
  const editData = route?.params?.editData;
  const isEditData = route?.params?.editData ? true : false;
  const dispatch = useDispatch();
  console.log('editData', editData);
  console.log('isEditData', isEditData);
  const userInfo = useSelector(state => state.users.users);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [Product, setProduct] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required('Product name is required'),
    productType: Yup.string().required('Product type is required'),
    quantity: Yup.number().required('Quantity is required'),
    sales_price: Yup.number().required('Sales price is required'),
    purchase_price: Yup.number().required('Purchase price is required'),
    MRP_price: Yup.number().required('MRP price is required'),
    // tax: Yup.number().required('Tax is required'),
    barCode: Yup.string().required('BAR Code number is required'),
    batchNumber: Yup.string().required('Batch Number is required'),
    expiryDate: Yup.string().nullable(),

    tax: Yup.number()
      .typeError('Tax must be a number')
      .max(100, 'Tax cannot exceed 100%')
      .required('Tax is required'),
    BrandName: Yup.string().required('Brand name is required'),
  });
  console.log('selectedId', editData);

  useEffect(() => {
    const productData = () => {
      userGetInventory(userInfo.token.access)
        .then(categoryData => {
          console.log('Category Data:', categoryData);
          const responseData = categoryData?.data;
          setProduct(responseData);
        })
        .catch(error => {
          console.log('Error fetching category data:', error);
        });
    };
    productData();
  }, []);

  const CreateInventory = (values, navigation) => {
    const productdata = {
      product_name: values.productName,
      brand: values.BrandName,
      total_quantity: values.quantity,
      sales_price: values.sales_price,
      purchase_price: values.purchase_price,
      MRP_price: values.MRP_price,
      // business_profile: 1,
      tax: values.tax,
      product_type: selectedId || editData.product_type,
      BAR_code_number: values.barCode,
      batch_number: values.batchNumber,
      expiry_date: values.expiryDate,
    };
    console.log('productdata', productdata);
    // return
    if (isEditData) {
      editList(productdata);
    } else {
      console.log('Request Data:', productdata);
      // return
      userPostInventory(userInfo.token.access, productdata)
        .then(response => {
          // const formdata = {pageNumber, PAGE_SIZE, sortingOption};
          console.log('Product Create Successfully:', response.data);
          //   userAllDataList(userInfo.token.access, 1)
          //   .then(response => {
          //     console.log('Products Found Successfully!', response.data);
          //   // dispatch(setCategoriesData(response.data))
          // })
          // navigation.goBack()
          navigation.reset({
            index: 0,
            routes: [{name: 'Inventory'}],
          });
          // navigation.navigate('Inventory');
          // navigation.replace('UpdateInventory', {inventoryData: response.data});
        })
        .catch(error => {
          console.log('Error posting inventory:', error);
          if (error.response) {
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
          } else if (error.request) {
            console.log('No response received from the server');
          } else {
            console.log('Error setting up the request:', error.message);
          }
        });
    }
  };
  const editList = item => {
    console.log('qqqqqqqqqqqqqqq', item);
    userUpdateList(userInfo.token.access, item, editData.id)
      .then(response => {
        console.log('Product updated Successfully', response);
        // userAllDataList(1, userInfo.token.access)
        // .then(response => {
        //   console.log('Products Found Successfully!', response.data);
        // dispatch(setCategoriesData(response.data))
        // navigation.goBack()
        // })
        // navigation.replace('UpdateInventory', {inventoryData: response.data});
        // showMessage({
        //   message: 'Product updated successfully',
        //   type: 'success',
        // });
        navigation.reset({
          index: 0,
          routes: [{name: 'Inventory'}],
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const handleDelete = id => {
    console.log('handleDelete', id);
    setSelectedItemId(id);
    setModalVisible(true);
  };

  const deletedata = async id => {
    console.log('aaaaaaaaaaaaaaaaaaaa', id);
    userDeleteProductList(userInfo.token.access, id)
      .then(response => {
        console.log('Product Deleted:', response);
        // onClose();
        navigation.reset({
          index: 0,
          routes: [{name: 'Inventory'}],
        });
      })
      .catch(error => {
        console.log('Error deleting product list:', error);
      });
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({type}, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    }
    toggleDatepicker();
  };

  return (
    <View style={styles.container}>
      <Header
        back
        iconColor={colors.C7C7C}
        title={'Inventory Information'}
        Textcolor={colors.black}
        isdelete={isEditData ? isEditData : false}
        isdeletePress={() => {
          handleDelete(editData.id);
        }}
      />
      <KeyboardAwareScrollView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        keyboardShouldPersistTaps="handled" // Add this line
      >
        <View style={styles.contentWrapper}>
          {/* <Text style={styles.contentText}>
            <Text>
              Please add a new item to the inventory company has for sale
            </Text>
            <Text> or the materials needed to create those goods.</Text>
          </Text> */}
        </View>

        <Formik
          initialValues={{
            productName: editData?.product_name || '',
            productType: editData?.product_type,
            // quantity: editData?.total_quantity || '',
            quantity: editData?.remaining_quantity?.toString() || '',
            price: '',
            sales_price: editData?.sales_price,
            purchase_price: editData?.purchase_price,
            MRP_price: editData?.MRP_price,
            tax: editData?.tax,
            BrandName: editData?.brand,
            barCode: editData?.BAR_code_number || '',
            batchNumber: editData?.batch_number || '',
            expiryDate: editData?.expiry_date
              ? moment(editData?.expiry_date).format('YYYY-MM-DD')
              : '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            values.expiryDate = values.expiryDate || null;
            CreateInventory(values, navigation);
          }}>
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
          }) => (
            <View style={styles.inputMainwrapper}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputtitle}>Product Name</Text>
                <TextInputComp
                  value={values.productName}
                  placeholder={'Product name'}
                  onChangeText={handleChange('productName')}
                  onBlur={handleBlur('productName')}
                  inputStyle={{marginBottom: scale(12)}}
                />
                {errors.productName && touched.productName && (
                  <Text style={styles.errorText}>{errors.productName}</Text>
                )}

                <Text style={styles.inputtitle}>Product Type</Text>
                <SelectDropdown
                  data={Product}
                  onSelect={(selectedItem, index) => {
                    console.log(isEditData, 'hgcgfgfgcfg', selectedItem);
                    setSelectedProduct(selectedItem.id);
                    setFieldValue('productType', selectedItem.id);
                    setSelectedId(selectedItem.id);
                    // handleChange('productName')(selectedItem.id);
                  }}
                  defaultButtonText={'Select product type'}
                  search={true}
                  defaultValueByIndex={
                    isEditData
                      ? Product.findIndex(item => item.id == values.productType)
                      : null
                  }
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // console.log('hgcgfgfgcfg', selectedItem);
                    return selectedItem.category_name;
                  }}
                  rowTextForSelection={(item, index) => item.category_name}
                  buttonStyle={[
                    styles.dropdown1BtnStyle,
                    {
                      marginBottom: scale(13),
                    },
                  ]}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                    return (
                      <Icons
                        iconType={'FontAwesome'}
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={colors.dividerColor}
                        size={scale(15)}
                      />
                    );
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                  selectedRowStyle={styles.dropdown1SelectedRowStyle}
                  searchl
                  searchInputStyle={styles.dropdown1searchInputStyleStyle}
                  searchPlaceHolder={'Search here'}
                  searchPlaceHolderColor={colors.dividerColor}
                  renderSearchInputLeftIcon={() => {
                    return (
                      <Icons
                        iconType={'FontAwesome'}
                        name={'search'}
                        color={colors.dividerColor}
                        size={scale(15)}
                      />
                    );
                  }}
                />
                {errors.productType && touched.productType && (
                  <Text style={styles.errorText}>{errors.productType}</Text>
                )}

                <Text style={styles.inputtitle}>Quantity</Text>
                <TextInputComp
                  value={values.quantity}
                  placeholder={'Quantity'}
                  keyboardType={'numeric'}
                  onChangeText={handleChange('quantity')}
                  onBlur={handleBlur('quantity')}
                  // error={touched.quantity && errors.quantity}
                  inputStyle={{marginBottom: scale(12)}}
                />
                {errors.quantity && touched.quantity && (
                  <Text style={styles.errorText}>{errors.quantity}</Text>
                )}

                <Text style={styles.inputtitle}>MRP Price</Text>
                <TextInputComp
                  value={values.MRP_price}
                  placeholder={'MRP Price'}
                  keyboardType={'numeric'}
                  onChangeText={handleChange('MRP_price')}
                  onBlur={handleBlur('MRP_price')}
                  inputStyle={{marginBottom: scale(12)}}
                />
                {errors.MRP_price && touched.MRP_price && (
                  <Text style={styles.errorText}>{errors.MRP_price}</Text>
                )}

                <Text style={styles.inputtitle}>Retail Price</Text>
                <TextInputComp
                  value={values.sales_price}
                  placeholder={'Retail Price'}
                  keyboardType={'numeric'}
                  onChangeText={handleChange('sales_price')}
                  onBlur={handleBlur('sales_price')}
                  // error={touched.sales_price && errors.sales_price}
                  inputStyle={{marginBottom: scale(12)}}
                />
                {errors.sales_price && touched.sales_price && (
                  <Text style={styles.errorText}>{errors.sales_price}</Text>
                )}

                <Text style={styles.inputtitle}>Purchase Price</Text>
                <TextInputComp
                  value={values.purchase_price}
                  placeholder={'Purchase Price'}
                  keyboardType={'numeric'}
                  onChangeText={handleChange('purchase_price')}
                  onBlur={handleBlur('purchase_price')}
                  inputStyle={{marginBottom: scale(12)}}
                />
                {errors.purchase_price && touched.purchase_price && (
                  <Text style={styles.errorText}>{errors.purchase_price}</Text>
                )}

                <Text style={styles.inputtitle}>Tax</Text>
                <TextInputComp
                  value={values.tax}
                  placeholder={'Tax'}
                  keyboardType={'numeric'}
                  onChangeText={text => {
                    const sanitizedText = text.replace(/[^\d.]/g, '');
                    // If there's a dot, set dotIndex
                    const dotPosition = sanitizedText.indexOf('.');
                    const hasDot = dotPosition !== -1;
                    // If there are three digits and no dot, add a dot after the second digit
                    let finalText = sanitizedText;
                    if (sanitizedText.length === 3 && !hasDot) {
                      finalText =
                        sanitizedText.slice(0, 2) +
                        '.' +
                        sanitizedText.slice(2);
                    }
                    // console.log(
                    //   finalText,
                    //   'finalText',
                    //   typeof finalText,
                    // );
                    setFieldValue('tax', finalText);
                  }}
                  onBlur={handleBlur('tax')}
                  inputStyle={{marginBottom: scale(12)}}
                />
                {errors.tax && touched.tax && (
                  <Text style={styles.errorText}>{errors.tax}</Text>
                )}

                <Text style={styles.inputtitle}>Brand Name</Text>
                <TextInputComp
                  value={values.BrandName}
                  placeholder={'Enter brand name'}
                  onChangeText={handleChange('BrandName')}
                  onBlur={handleBlur('BrandName')}
                  inputStyle={{marginBottom: scale(12)}}
                />
                {errors.BrandName && touched.BrandName && (
                  <Text style={styles.errorText}>{errors.BrandName}</Text>
                )}

                <Text style={styles.inputtitle}>BAR Code Number</Text>
                <TextInputComp
                  value={values.barCode}
                  placeholder={'BAR Code number'}
                  onChangeText={handleChange('barCode')}
                  onBlur={handleBlur('barCode')}
                  inputStyle={{marginBottom: scale(12)}}
                />
                {errors.barCode && touched.barCode && (
                  <Text style={styles.errorText}>{errors.barCode}</Text>
                )}

                <Text style={styles.inputtitle}>Batch Number</Text>
                <TextInputComp
                  value={values.batchNumber}
                  placeholder={'Batch Number'}
                  onChangeText={handleChange('batchNumber')}
                  onBlur={handleBlur('batchNumber')}
                  inputStyle={{marginBottom: scale(12)}}
                />
                {errors.batchNumber && touched.batchNumber && (
                  <Text style={styles.errorText}>{errors.batchNumber}</Text>
                )}

                <Text style={styles.inputtitle}>Expiry Date</Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowPicker(true);
                  }}>
                  <TextInputComp
                    value={values.expiryDate}
                    placeholder={'Expiry Date'}
                    editable={false}
                    inputStyle={{marginBottom: scale(12)}}
                  />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={showPicker}
                  mode="date"
                  display="spinner"
                  onConfirm={date => {
                    setFieldValue(
                      'expiryDate',
                      date.toISOString().split('T')[0],
                    );
                    onChange({type: 'set'}, date);
                    setShowPicker(false); // Close DateTimePickerModal after selection
                  }}
                  onCancel={() => {
                    setShowPicker(false); // Close DateTimePickerModal on cancel
                  }}
                />
                {errors.expiryDate && touched.expiryDate && (
                  <Text style={styles.errorText}>{errors.expiryDate}</Text>
                )}
              </View>
              <Button
                label={isEditData ? 'update' : 'Done'}
                labelColor={colors.white}
                style={styles.donebutton}
                backgroundColor={colors.primary}
                onPress={() => handleSubmit()}
              />
            </View>
          )}
        </Formik>
        <DeleteModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={deletedata}
          itemId={selectedItemId}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    // backgroundColor: 'red',
    // paddingHorizontal: scale(5),
    // marginHorizontal: scale(8),
    // marginVertical: scale(10),
    alignSelf: 'center',
  },
  contentText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: scale(16),
    color: colors.darkblack,
    fontSize: scale(12),
    // letterSpacing: scale(0.6),
    fontFamily: POPPINS_REGULAR,
    fontWeight: '600',
  },
  inputMainwrapper: {
    marginVertical: scale(10),
  },
  inputWrapper: {
    marginHorizontal: scale(10),
    width: SCREEN_WIDTH * 0.8,
    alignSelf: 'center',
  },
  inputtitle: {
    fontFamily: POPPINS_REGULAR,
    fontSize: scale(14),
    fontWeight: '400',
    color: colors.darkblack,
  },
  inputstyle: {
    marginBottom: '15',
    height: scale(40),
  },
  dropdown1BtnStyle: {
    width: SCREEN_WIDTH * 0.8,
    height: scale(48),
    backgroundColor: '#FFF',
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    borderWidth: scale(1),
    borderColor: '#B6B6B6',
    marginBottom: scale(15),
  },
  dropdown1BtnTxtStyle: {
    color: colors.black,
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    height: scale(250),
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {
    color: colors.black,
    textAlign: 'left',
  },
  dropdown1SelectedRowStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dropdown1searchInputStyleStyle: {
    alignSelf: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: STANDARD_BORDER_RADIUS * 3,
    marginVertical: scale(5),
    width: SCREEN_WIDTH * 0.78,
    height: scale(40),
    borderWidth: 1,
    borderColor: colors.dividerColor,
  },
  donebutton: {
    width: SCREEN_WIDTH * 0.8,
    alignSelf: 'center',
    marginTop: scale(20),
    marginBottom: scale(40),
  },
  errorTextView: {
    // bottom: scale(14),
    // position:'absolute',
    // borderWidth:2
  },
  errorText: {
    color: 'red',
    fontSize: scale(10),
    fontFamily: POPPINS_REGULAR,
    bottom: scale(10),
  },
});

export default NewInventory;
