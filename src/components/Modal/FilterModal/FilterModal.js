import React, {useEffect, useState} from 'react';
import {View, Text, Modal} from 'react-native';
import {scale} from 'react-native-size-matters';
import Icons from '../../Icons/Icons';
import colors from '../../../constants/colors';
import Button from '../../Button';
import {
  FONT_SIZE_MD,
  POPPINS_BOLD,
  POPPINS_REGULAR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
} from '../../../constants/constants';
import DropdownAccordion from '../../Accordion/DropdownAccordion';
import {ScrollView} from 'react-native-gesture-handler';
import {userGetInventory, userSortFilter} from '../../../api/auth/auth';
import FilteringDropdown from '../../Accordion/FilteringDropdown';
import {useSelector} from 'react-redux';
import {Indicators} from '../../apploader';
const FilterModal = ({
  filterModalVisible,
  closeFilterModal,
  handleDropdown,
  selectOption,
  navigation,
  setFilteredData,
  filterData = [],
  getFilterData,
  categoryNames,
  historyData = [],
  ledgerbookData = [],
}) => {
  const [productQuntity, setProductQuntity] = useState('');
  const [selectName, setSelectName] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const userInfo = useSelector(state => state.users.users);
  const [atLeastOneSelected, setAtLeastOneSelected] = useState(false);

  // console.log('ledgerbookDataaaaaaaaaaaaaaa', filterData);

  const onSelectOption = (option, stateSetter, index) => {
    console.log(option, ` ${stateSetter}: ${option}`);
    selectOption(option);
    // stateSetter(option);
    setSelectName(option);
    handleDropdown();
    setActiveDropdown(index);
    setAtLeastOneSelected(true);
  };

  return (
    <Modal transparent={true} visible={filterModalVisible} animationType="none">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={[styles.welcomeLabel, {color: colors.black}]}>
                Filters
              </Text>
              <Icons
                name="close"
                iconType="AntDesign"
                color={colors.black}
                onPress={closeFilterModal}
                size={scale(20)}
              />
            </View>

            <View style={styles.inputContainer}>
              {filterData.map((items, i) => {
                if (
                  items.name === 'Product Status' ||
                  items.name === 'Top Selling'
                ) {
                  // For static dropdowns

                  return (
                    <View key={i}>
                      <Text style={styles.titletxt}>{items.name}</Text>
                      <FilteringDropdown
                        key={i}
                        title={items.name}
                        placeholderName={'Select Option'}
                        options={items.option}
                        onSelect={val => {
                          console.log('hgsdhshcsd', val);
                          const filter = {Filter: val.name.toLowerCase()};
                          getFilterData(filter);
                          onSelectOption(val);
                        }}
                      />
                   </View>
                  );
                } else if (items.name === 'Product Category') {
                  return (
                    <View key={i}>
                      <Text style={styles.titletxt}>{items.name}</Text>
                      <FilteringDropdown
                        key={i}
                        title={items.name}
                        placeholderName={'Select Option'}
                        options={categoryNames}
                        onSelect={val => {
                          console.log('hgsdhshcsd', val);
                          getFilterData(val);
                          onSelectOption(val);
                        }}
                      />
                    </View>
                  );
                }
                return null;
              })}

              {/* {historyData.map((items, i) => {
                return (
                  <>
                    <Text style={styles.titletxt}>{items.name}</Text>
                    <FilteringDropdown
                      key={i}
                      title={items.name}
                      placeholderName={'Select Option'}
                      options={items.option}
                      onSelect={val => {
                        console.log('hgsdhshcsd', val);
                        getFilterData(val);
                        onSelectOption(val);
                      }}
                    />
                  </>
                );
              })} */}

              {ledgerbookData.map((items, i) => {
                return (
                  <View key={i}>
                    <Text style={styles.titletxt}>{items.name}</Text>
                    <FilteringDropdown
                      key={i}
                      title={items.name}
                      placeholderName={'Select Option'}
                      options={items.option}
                      onSelect={val => {
                        let formData;
                        if (items.name == 'User Status') {
                          formData = {
                            status: val.name.toLowerCase(),
                          };
                        } else if (items.name == 'Favorites') {
                          formData = {
                            favourite: val.name == 'Yes' ? 1 : 2,
                          };
                        } else if (items.name == 'GST') {
                          formData = {
                            gst_number: val.name == 'Yes' ? 2 : 1,
                          };
                        }
                        console.log(
                          items,
                          'a=a=a=a=a=a==aa=a=a=a=a=a==a=a=a=aa==a=',
                          val,
                        );
                        getFilterData(formData);
                        onSelectOption(val);
                      }}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
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
  titletxt: {
    fontFamily: POPPINS_REGULAR,
    fontSize: scale(14),
    fontWeight: '600',
    color: colors.darkblack,
  },
  inputContainer: {
    marginHorizontal: scale(12),
    marginTop: scale(15),
  },
  buttons: {
    width: SCREEN_WIDTH * 0.91,
  },
};

export default FilterModal;
