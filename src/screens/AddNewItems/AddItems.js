//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Header from '../../components/Header/Header';
import colors from '../../constants/colors';
import {
  FONT_SIZE_MD,
  FONT_SIZE_XS,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_FLEX,
} from '../../constants/constants';
import {scale} from 'react-native-size-matters';
import Button from '../../components/Button';
import TextInputComp from '../../components/Input/TextInputComp';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SelectDropdown from 'react-native-select-dropdown';
import Icons from '../../components/Icons/Icons';
import {useSelector} from 'react-redux';
import {AddProduct, productQuantity} from '../../api/auth/auth';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useRef } from 'react';

const AddItems = ({navigation,route}) => {
  const userInfo = useSelector(state => state.users.users);
  const [formValues, setFormValues] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  const [isProductNameSelected, setIsProductNameSelected] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const {Customerinfo} = route.params || {};
  console.log('Customerinfo',Customerinfo);
  const flashMessageRef = useRef();
  // const productNames = productsData.map(product => product.product_name);

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required('Product Name is required'),
    productType: Yup.string().required('Product Type is required'),
    quantity: Yup.number().required('Quantity is required'),
    price: Yup.number().required('Price is required'),
    tax: Yup.number().required('Tax is required'),
    discount: Yup.number(),
    // discount: Yup.number().required('Discount is required'),
  });

  const addProduct = async (value, index = null) => {
    if(value.discount === '' ){
      value['discount'] = 0;
      // console.log('---------Naveen',value)
    }
    if (value.quantity) {
      try {
        const quantityCheckResult = await productQuantity(
          userInfo.token.access,
          value.productID,
          value.quantity
        );
  
        console.log('rrrrrr', quantityCheckResult); // Move the console.log here
  
        if (quantityCheckResult.status === 'success') {
          console.log('Product quantity check passed:', value);
        } else {
          flashMessageRef.current.showMessage({
            description: `Sorry, the selected quantity (${value.quantity}) is not available. Please choose a different quantity.`,
            message: 'Insufficient Quantity',
            type: 'warning',
            position: 'top',
          });
          return;
        }
      } catch (error) {
        console.error('Quantity Check Error:', error);
        flashMessageRef.current.showMessage({
          description: 'An error occurred while checking the quantity.',
          message: 'You dont have enough quantity available.',
          type: 'Error',
          position: 'top',
        });
        return;
      }
    }
    console.log('=====/////', value);
    // return
    let productAmount = value.price;
    let qty = value.quantity;
    let tax = value.tax;
    let discount = value.discount;

    let disNumber = (productAmount * qty * (discount * qty)) / 100;
    let discountPrice = productAmount * qty - disNumber;
    console.log('discountPrice', discountPrice);

    let taxNumber = (productAmount * tax) / 100;
    let taxPrice = productAmount + taxNumber;
    console.log('taxPrice', taxPrice);
    if (index !== null) {
      // Update existing product
      const updatedItems = [...addedItems];
      updatedItems[index] = value;
      setAddedItems(updatedItems);
    } else {
      // Add new product
      setAddedItems([...addedItems, value]);
    }
    setFormValues(null);
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchData = () => {
      if (userInfo) {
        AddProduct(userInfo.token.access)
          .then(response => {
            console.log('response====>????', response);
            setProductsData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <Header
        back
        iconColor={colors.C7C7C}
        title={'Add new Items'}
        Textcolor={colors.black}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.contentWrapper}>
          <Text style={styles.contentText}>
            Please add a new item to the inventory company
            <Text> has for sale or the materials needed to create</Text>
            <Text> those goods.</Text>
          </Text>
        </View>
        {addedItems.length === 0 && (
          <Button
            label={'Add Item'}
            labelColor={colors.white}
            style={styles.additembtn}
            backgroundColor={colors.primary}
            onPress={() => setModalVisible(true)}
          />
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <KeyboardAwareScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <TouchableOpacity
              activeOpacity={1}
              // onPress={() => setModalVisible(false)}
              style={styles.modalContainer}>
              {/* Modal content */}
              <Formik
                initialValues={{
                  productID: formValues?.productID || '',
                  productName: formValues?.productName || '',
                  productType: formValues?.productType || '',
                  quantity: formValues?.quantity || '',
                  price: String(formValues?.price || ''),
                  tax: String(formValues?.tax || ''),
                  discount: formValues?.discount  || '',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                  addProduct(
                    values,
                    formValues ? addedItems.indexOf(formValues) : null,
                  );
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
                  <View style={styles.modalContent}>
                    <Button
                      iconType={'AntDesign'}
                      iconname={'close'}
                      size={scale(20)}
                      color={colors.black}
                      style={styles.modalButton}
                      // backgroundColor={colors.primary}
                      onPress={() => {
                        setModalVisible(false);
                      }}
                    />
                    <View style={styles.Mainwrapper}>
                      <View style={styles.inputMainwrapper}>
                        <View style={styles.inputWrapper}>
                          <Text style={styles.inputtitle}>Product Name</Text>
                          <SelectDropdown
                            data={productsData}
                            onSelect={(selectedItem, index) => {
                              // const selectedProduct = productsData.find(
                              //   product =>
                              //     product.product_name === selectedItem,
                              // );
                              console.log(
                                'Selected Product===:',
                                selectedProduct,
                              );
                              setSelectedProduct(selectedProduct);
                              setIsProductNameSelected(true); // Set product name selected
                              // Auto-fill productType field
                              setFieldValue('productID', selectedItem.id);
                              handleChange('productName')(
                                selectedItem.product_name,
                              );
                              handleChange('productType')(
                                selectedItem.product_type.category_name,
                              );
                              handleChange('price')(
                                String(selectedItem.sales_price),
                              );
                              handleChange('tax')(String(selectedItem.tax));
                            }}
                            defaultButtonText={'Select Product'}
                            // defaultValue={"values.productName ? values.productName :''"}
                            // defaultValueByIndex={1}
                            defaultValueByIndex={productsData.findIndex(object => {
                              return object.product_name === values.productName;
                            })}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              return `${selectedItem.product_name} (${selectedItem.remaining_quantity})`;
                            }}
                            rowTextForSelection={(item, index) => {
                              return `${item.product_name} (${item.remaining_quantity})`;
                            }}
                            buttonStyle={[
                              styles.dropdown1BtnStyle,
                              {
                                borderColor:
                                  touched.productName && errors.productName
                                    ? 'red'
                                    : '#B6B6B6',
                              },
                            ]}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                              return (
                                <Icons
                                  iconType={'FontAwesome'}
                                  name={
                                    isOpened ? 'chevron-up' : 'chevron-down'
                                  }
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
                            search
                            searchInputStyle={
                              styles.dropdown1searchInputStyleStyle
                            }
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

                          <Text style={styles.inputtitle}>Product type</Text>
                          <TextInputComp
                            inputStyle={styles.inputstyle}
                            value={values.productType}
                            placeholder={'Product type'}
                            onChangeText={handleChange('productType')}
                            onBlur={handleBlur('productType')}
                            error={
                              touched.productType &&
                              errors.productType &&
                              !isProductNameSelected
                            }
                            editable={!isProductNameSelected}
                            textStyle={styles.inputtextstyl}
                          />

                          <Text style={styles.inputtitle}>Quantity</Text>
                          <TextInputComp
                            inputStyle={styles.inputstyle}
                            value={values.quantity}
                            placeholder={'Quantity'}
                            keyboardType={'numeric'}
                            onChangeText={handleChange('quantity')}
                            onBlur={handleBlur('quantity')}
                            error={touched.quantity && errors.quantity}
                            textStyle={styles.inputtextstyl}
                          />

                          <Text style={styles.inputtitle}>Price</Text>
                          <TextInputComp
                            inputStyle={styles.inputstyle}
                            value={values.price}
                            placeholder={'Price'}
                            keyboardType={'numeric'}
                            onChangeText={handleChange('price')}
                            onBlur={() => handleBlur('price')}
                            error={
                              touched.price &&
                              errors.price &&
                              !isProductNameSelected
                            }
                            editable={!isProductNameSelected}
                            textStyle={styles.inputtextstyl}
                          />

                          <Text style={styles.inputtitle}>Tax (%)</Text>
                          <TextInputComp
                            inputStyle={styles.inputstyle}
                            value={values.tax}
                            placeholder={'tax'}
                            keyboardType={'numeric'}
                            onChangeText={handleChange('tax')}
                            onBlur={handleBlur('tax')}
                            error={touched.tax && errors.tax}
                            editable={false}
                            textStyle={styles.inputtextstyl}
                          />

                          <Text style={styles.inputtitle}>
                            Purchase Discount (%)
                          </Text>
                          <TextInputComp
                            inputStyle={styles.inputstyle}
                            value={values.discount.toString()}
                            placeholder={'Discount%'}
                            keyboardType={'numeric'}
                            maxLength={5}
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
                              console.log(
                                finalText,
                                'finalText',
                                typeof finalText,
                              );
                              handleChange('discount')(finalText);
                            }}
                            onBlur={handleBlur('discount')}
                            // error={touched.discount && errors.discount}
                            textStyle={styles.inputtextstyl}
                          />
                        </View>
                      </View>
                      <Button
                        label={'Done'}
                        labelColor={colors.white}
                        style={styles.donebutton}
                        backgroundColor={colors.primary}
                        onPress={() => handleSubmit()}
                      />
                    </View>
                  </View>
                )}
              </Formik>
              <FlashMessage ref={flashMessageRef} />
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </Modal>
        {/* Display form values */}
        {addedItems.length > 0 && (
          <View>
            <View style={styles.descriptionwrapper}>
              <Text style={styles.descriptiontext}>Items Description</Text>
              <Button
                iconname={'plus'}
                iconType={'AntDesign'}
                size={20}
                color={colors.white}
                style={styles.addbutton}
                backgroundColor={colors.primary}
                onPress={() => {
                  setFormValues(null);
                  setSelectedProduct('');
                  setModalVisible(true);
                }}
              />
            </View>

            {addedItems.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  console.log('Pressed item:', item);
                  setFormValues(item);
                  setModalVisible(true);
                }}
                key={index}
                style={styles.itemwrapper}>
                <Text
                  style={styles.productnametxt}>{`${item.productName}`}</Text>
                <Icons
                  name={'chevron-down'}
                  iconType={'Entypo'}
                  size={25}
                  color={colors.dividerColor}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
        {addedItems.length > 0 && (
          <Button
            label={'Click to submit'}
            labelColor={colors.white}
            style={styles.sumbitbutton}
            backgroundColor={colors.primary}
            onPress={() => navigation.navigate('Invoices', {addedItems})}
          />
        )}
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: STANDARD_FLEX,
    backgroundColor: colors.white,
  },
  Mainwrapper: {
    top: scale(25),
  },
  contentWrapper: {
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
    fontWeight: '600',
  },
  descriptionwrapper: {
    flexDirection: 'row',
    padding: scale(10),
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH * 0.9,
  },
  descriptiontext: {
    fontSize: FONT_SIZE_MD,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '500',
    color: colors.black,
    textTransform: 'capitalize',
  },
  addbutton: {
    height: scale(25),
    width: SCREEN_WIDTH * 0.2,
    borderRadius: scale(8),
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
    fontFamily: POPPINS_MEDIUM,
    // fontSize: scale(14),
    // fontWeight: '400',
    color: colors.darkblack,
    marginBottom: scale(1),
  },
  inputstyle: {
    height: scale(45),
    display:'flex',
    marginBottom:scale(10),
    // backgroundColor:'red',
    alignItems:'center',
  },
  inputtextstyl:{
    display:'flex',
      // top:scale(2s.5),
      fontSize:scale(12),
      fontFamily:POPPINS_REGULAR,
      // flex:1,
      color: colors.black
  },
  donebutton: {
    width: SCREEN_WIDTH * 0.8,
    alignSelf: 'center',
    marginBottom: scale(40),
  },
  additembtn: {
    width: SCREEN_WIDTH * 0.5,
    height: scale(45),
    alignSelf: 'center',
    marginBottom: scale(40),
  },
  sumbitbutton: {
    // position: 'absolute',
    bottom: 0,
    backgroundColor: 'green',
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    marginBottom: scale(40),
    marginVertical: scale(30),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.9,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: FONT_SIZE_MD,
    marginBottom: 20,
  },
  modalButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  errorText: {
    fontSize: scale(8),
    color: colors.error,
    bottom: scale(10),
  },
  dropdown1BtnStyle: {
    width: SCREEN_WIDTH * 0.8,
    height: scale(40),
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
  itemwrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth:scale(0.5),
    // borderColor:colors.dividerColor,
    marginHorizontal: scale(15),
    padding: scale(15),
    paddingHorizontal: scale(18),
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    backgroundColor: colors.white,
    margin: scale(5),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  productnametxt: {
    fontSize: FONT_SIZE_MD,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '600',
    color: colors.black,
    textTransform: 'capitalize',
  },
});

//make this component available to the app
export default AddItems;
