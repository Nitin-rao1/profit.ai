//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header/Header';
import colors from '../../constants/colors';
import {
  FONT_SIZE_MD,
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

// create a component
const AddItems = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [addedItems, setAddedItems] = useState([]);
  const Product = ['coffe', 'Maggi', 'cold coffee', 'sugar', 'tea', 'Milk'];

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required('Product Name is required'),
    productType: Yup.string().required('Product Type is required'),
    quantity: Yup.number().required('Quantity is required'),
    price: Yup.number().required('Price is required'),
    tax: Yup.number().required('Tax is required'),
    discount: Yup.number().required('Discount is required'),
  });

  const addproduct = value => {
    // console.log('valueeeee', value);
    setFormValues(value); // Store form values in state
    setAddedItems([...addedItems, value]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header
        back
        iconColor={colors.C7C7C}
        title={'Add new Items'}
        Textcolor={colors.black}
      />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.contentWrapper}>
          <Text style={styles.contentText}>
            Please add a new item to the inventory company {'\n'} has for sale
            or the materials needed to create {'\n'} those goods.
          </Text>
        </View>
        {addedItems.length === 0 && (
          <Button
            label={'Add Item'}
            labelColor={colors.white}
            style={styles.donebutton}
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
                  productName: selectedProduct,
                  productType: formValues ? formValues.productType :'',
                  quantity: formValues ? formValues.quantity :'',
                  price: formValues ? formValues.price :'',
                  tax: formValues ? formValues.tax :'',
                  discount: formValues ? formValues.discount :'',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                  // Handle form submission here
                  // console.log('Form Values:', values);
                  addproduct(values);
                }}>
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
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
                            data={Product}
                            onSelect={(selectedItem, index) => {
                              setSelectedProduct(selectedItem);

                              handleChange('productName')(selectedItem);
                              // console.log(selectedItem, index);
                            }}
                            defaultButtonText={'Select Product'}
                            defaultValueByIndex={Product.indexOf(formValues?.productName || '')}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                              return item;
                            }}
                            def
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
                            error={touched.productType && errors.productType}
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
                          />

                          <Text style={styles.inputtitle}>Price</Text>
                          <TextInputComp
                            inputStyle={styles.inputstyle}
                            value={values.price}
                            placeholder={'Price'}
                            keyboardType={'numeric'}
                            onChangeText={handleChange('price')}
                            onBlur={handleBlur('price')}
                            error={touched.price && errors.price}
                          />

                          <Text style={styles.inputtitle}>Tax</Text>
                          <TextInputComp
                            inputStyle={styles.inputstyle}
                            value={values.tax}
                            placeholder={'Tax'}
                            keyboardType={'numeric'}
                            onChangeText={handleChange('tax')}
                            onBlur={handleBlur('tax')}
                            error={touched.tax && errors.tax}
                          />

                          <Text style={styles.inputtitle}>
                            Purchase Discountdd
                          </Text>
                          <TextInputComp
                            inputStyle={styles.inputstyle}
                            value={values.discount}
                            placeholder={'Discount'}
                            keyboardType={'numeric'}
                            onChangeText={handleChange('discount')}
                            onBlur={handleBlur('discount')}
                            error={touched.discount && errors.discount}
                          />
                        </View>
                      </View>
                      <Button
                        label={'Done'}
                        labelColor={colors.white}
                        style={styles.donebutton}
                        backgroundColor={colors.primary}
                        onPress={handleSubmit}
                      />
                    </View>
                  </View>
                )}
              </Formik>
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
                onPress={() => setModalVisible(true)}
              />
            </View>

            {addedItems.map((item, index) => (
              console.log('itemnnnnniiiiiiittttttttttiiiiiinnnnnnn',item),
              <TouchableOpacity
              onPress={() => {
                setFormValues(item); 
                setModalVisible(true);
              }}
              key={index} style={styles.itemwrapper}>
                <Text>{`Item ${index + 1}`}</Text>
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
    // backgroundColor: 'red',
    marginHorizontal: scale(10),
    marginVertical: scale(10),
  },
  contentText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: scale(20),
    color: colors.darkblack,
    fontSize: scale(12),
    fontWeight: '400',
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
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '600',
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
    fontFamily: POPPINS_REGULAR,
    fontSize: scale(14),
    fontWeight: '400',
    color: colors.darkblack,
    marginBottom: scale(5),
  },
  inputstyle: {
    height: scale(40),
  },
  donebutton: {
    width: SCREEN_WIDTH * 0.7,
    alignSelf: 'center',
    marginBottom: scale(40),
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
    padding: scale(10),
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    backgroundColor: colors.white,
    margin: scale(5),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

//make this component available to the app
export default AddItems;
