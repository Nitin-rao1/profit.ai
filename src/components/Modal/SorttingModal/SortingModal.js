import React, {useState, useEffect} from 'react';
import {View, Text, Modal, StyleSheet, ScrollView} from 'react-native';
import Icons from '../../Icons/Icons';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_MD,
  POPPINS_BOLD,
  POPPINS_REGULAR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
} from '../../../constants/constants';
import colors from '../../../constants/colors';
import ShortingDropdown from '../../Accordion/ShortingDropdown';
import {userSortFilter} from '../../../api/auth/auth';
import {useSelector} from 'react-redux';
import {Indicators} from '../../apploader';

const SortingModal = ({
  visible,
  onClose,
  selectedOption,
  handleDropdown,
  selectOption,
  closeSortingModal,
  setSortingData,
  getSortingData,
  sortingsData = [],
  historysortData = [],
  ledgerBookData = [],
}) => {
  const [saleprice, setSaleprice] = useState('');
  const [purchaseprice, setPurchaseprice] = useState('');
  const [productStatus, setProductStatus] = useState('');
  const [category, setCategory] = useState('');
  const userInfo = useSelector(state => state.users.users);
  const [loading, setLoading] = useState(false);
  const [atLeastOneSelected, setAtLeastOneSelected] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const salePriceOptions = ['Low To High', 'High To Low'];
  const purchasePriceOptions = ['Low To High', 'High To Low'];
  const productStatusOptions = ['Red', 'Green', 'Yellow'];
  const productCategoryOptions = ['A to D', 'D to A'];

  const onSelectOption = (option, stateSetter) => {
    console.log(`Selected ${stateSetter}: ${option}`);
    selectOption(option);
    // stateSetter(option);
    handleDropdown();
    setAtLeastOneSelected(true);
  };

  return (
    <Modal transparent={true} visible={visible} animationType="none">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={[styles.welcomeLabel, {color: colors.black}]}>
              Sorting
            </Text>
            <Icons
              name="close"
              iconType="AntDesign"
              color={colors.black}
              onPress={onClose}
              size={scale(20)}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.inputContainer}>
              {sortingsData.map((items, i) => {
                return (
                  <View key={i}>
                    <Text style={styles.titletxt}>{items.name}</Text>
                    <ShortingDropdown
                      key={i}
                      title={items.name}
                      placeholderName={'Select Option'}
                      options={items.option}
                      onSelect={val => {
                        console.log('sorting_val', val);
                        let payload = {};
                        const Typeof = items.type;
                        // console.log('typeeeeeeee', Typeof);

                        switch (true) {
                          case val.name.toLowerCase() === 'high to low' && Typeof === 'sale_price':
                            payload = { sorting: 'sale price high to low' };
                            break;
                          case val.name.toLowerCase() === 'low to high' && Typeof === 'sale_price':
                            payload = { sorting: 'sale price low to high' };
                            break;
                          case val.name.toLowerCase() === 'high to low' && Typeof === 'purchase_price':
                            payload = { sorting: 'purchesh price high to low' };
                            break;
                          case val.name.toLowerCase() === 'low to high' && Typeof === 'purchase_price':
                            payload = { sorting: 'purchesh price low to high' };
                            break;
                          case val.name.toLowerCase() === 'a to d' && Typeof === 'product_name':
                            payload = { sorting: 'product name A to Z' };
                            break;
                          case val.name.toLowerCase() === 'd to a' && Typeof === 'product_name':
                            payload = { sorting: 'product name Z to A' };
                            break;
                          // Add more cases for other sorting options as needed
                          default:
                            break;
                        }

                        console.log('payloadpayloadpayloadpayloadpayload', payload);
                        // const filter = {sorting: val.name.toLowerCase()};
                        getSortingData(payload);
                        onSelectOption(val);
                      }}
                    />
                  </View>
                );
              })}

              {historysortData.map((items, i) => {
                return (
                  <View key={i}>
                    <Text style={styles.titletxt}>{items.name}</Text>
                    <ShortingDropdown
                      key={i}
                      title={items.name}
                      placeholderName={'Select Option'}
                      options={items.option}
                      onSelect={val => {
                        console.log('hgsdhshcsd', val);
                        let fromData;
                        if (items.name == 'Amount') {
                          fromData = {
                            amount:
                              val.name == 'High To Low'
                                ? 'high to low'
                                : 'low to high',
                          };
                        } else if (items.name == 'Ladger Status') {
                          fromData = {
                            status: val.name.toLowerCase(),
                          };
                        }
                        getSortingData(fromData);
                        onSelectOption(val);
                      }}
                    />
                  </View>
                );
              })}
              {ledgerBookData.map((items, i) => {
                return (
                  <View key={i}>
                    <Text style={styles.titletxt}>{items.name}</Text>
                    <ShortingDropdown
                      key={i}
                      title={items.name}
                      placeholderName={'Select Option'}
                      options={items.option}
                      onSelect={val => {
                        console.log('hgsdhshcsd', val);
                        let fromData;
                        if (items.name == 'Name') {
                          fromData = {
                            user_name: val.name.toLowerCase(),
                          };
                        } else if (items.name == 'Debt') {
                          fromData = {
                            debt:
                              val.name == 'High To Low'
                                ? 'high to low'
                                : 'low to high',
                          };
                        } else if (items.name == 'Sale') {
                          fromData = {
                            sales:
                              val.name == 'High To Low'
                                ? 'high to low'
                                : 'low to high',
                          };
                        } else if (items.name == 'Top Occurrences') {
                          if (val.name == 'Most Frequent') {
                            fromData = {
                              most_frequent: 'most_frequent',
                            };
                          } else {
                            fromData = {
                              most_profitable: 'most_profitable',
                            };
                          }
                        }
                        getSortingData(fromData);
                        onSelectOption(val);
                      }}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
          {loading && <Indicators />}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.6,
    position: 'absolute',
    bottom: 0,
    borderRadius: STANDARD_BORDER_RADIUS,
    elevation: 5,
    padding: scale(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
  },
  welcomeLabel: {
    fontFamily: POPPINS_BOLD,
    fontSize: FONT_SIZE_MD,
    fontWeight: '700',
    textAlignVertical: 'center',
  },
  inputContainer: {
    marginHorizontal: scale(12),
    marginTop: scale(15),
    marginBottom: scale(20),
  },
  titletxt: {
    fontFamily: POPPINS_REGULAR,
    fontSize: scale(14),
    fontWeight: '600',
    color: colors.darkblack,
  },
  icons: {
    padding: scale(5),
  },
});

export default SortingModal;
