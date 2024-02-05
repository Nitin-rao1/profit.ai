import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import FilterReset from '../../assets/svg/Filter-Reset.svg';
import Button from '../../components/Button';
import Inventorylist from '../../components/Cards/Inventorylist';
import FilterModal from '../../components/Modal/FilterModal/FilterModal';
import SortingModal from '../../components/Modal/SorttingModal/SortingModal';
import SubHeader from '../../components/SubHeader/SubHeader';
import {filterData, sortingsData} from '../../components/data/Inventorydata';
import colors from '../../constants/colors';
import {
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE,
  STANDARD_SOCIAL_ICON_SIZE,
  STANDARD_SPACING,
} from '../../constants/constants';

import {useDispatch, useSelector, useStore} from 'react-redux';
import {userAllDataList} from '../../api/auth/auth';
import {BarIndicators, Indicators} from '../../components/apploader';

const Inventory = ({navigation}) => {
  const store = useStore();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [atLeastOneSelected, setAtLeastOneSelected] = useState(false);
  const [filterSortListShow, setFilterSortListShow] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [sortingData, setSortingData] = useState([]);
  const [sortingOption, setSortingOption] = useState(null);
  const [totalLength, setTotalLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.users.users);
  // const inventryList = useSelector(state => state.inventryList.inventryList);
  const [inventryList, setInventryList] = useState([]);
  const PAGE_SIZE = 10;

  // console.log('xxxxx', inventryList);

  const selectOption = option => {
    setSelectedOption(option);
    setDropdownVisible(false);
    setFilteredData([]);
  };
  const handleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  const openSortModal = () => {
    setSortModalVisible(true);
  };

  const closeSortModal = () => {
    setSortModalVisible(false);
  };

  const onClose = () => {
    setSortModalVisible(false);
  };
  useEffect(() => {
    fetchData();
    // console.log('Filtered Data:', filteredData);
  }, [page]);
  const fetchData = () => {
    // const data = {page: index};
    setIsLoading(true);
    userAllDataList(userInfo.token.access, page)
      .then(response => {
        console.log(
          'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          response,
        );
        setInventryList(pre => [...pre, ...response.data]);
        const oldProduct = store.getState().inventryList.inventryList;
        const arrr = [...oldProduct, ...response.data];
        // dispatch(setCategoriesData(arrr));
        if (response.next == null) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setTotalLength(response.total_length_all_data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        setIsLoading(false);
      });
  };

  const keyExtractor = (item, index) => `${item.id}-${index}`;

  const ItemSeparatorComponent = () => {
    return;
    // <View style={{}}></View>;
  };

  const onEndReached = () => {
    setIsLoading(true);

    if (hasMore) {
      if (totalLength > inventryList.length) {
        setPage(pre => pre + 1);
      }
    } else {
      setIsLoading(false);
    }
  };

  const onEndReachedfilter = () => {
    setIsLoading(true);
    if (hasMore) {
      // fetchData(page+1);

      setPage(pre => pre + 1);
    } else {
      setIsLoading(false);
    }
  };

  const handleEdit = item => {
    console.log('item', item);
    const modifiedItem = {
      ...item,
      product_type: item.product_type.id,
    };
    navigation.navigate('NewInventory', {editData: modifiedItem});
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {/* Header */}
      <SubHeader
        title={'Inventory'}
        Textcolor={colors.black}
        // optionalBtn="search"
        optionalBtnPress={() => {
          navigation.navigate('InventorySearchList');
        }}
        // right={'sliders'}
        onRightPress={openFilterModal}
        onRightSidePress={openSortModal}
        // rightSide={'sort-variant'}
        iconColor={colors.black}
        leftview={false}
        margintitleLeft={scale(14)}
        searchIcon={true}
        sortingIcon={true}
        filterIcon={true}
        // calenderIcon={true}
      />

      <FlatList
        data={inventryList}
        renderItem={({item, index}) => (
          <Inventorylist
            key={`${item.id}-${index}`}
            index={index}
            item={item}
            onPress={() => handleEdit(item)}
          />
        )}
        keyExtractor={keyExtractor}
        // ItemSeparatorComponent={ItemSeparatorComponent}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        // ListEmptyComponent={() => {
        //   return <Text>not found</Text>;
        // }}
        ListHeaderComponent={() => (
          <View style={styles.contentWrapper}>
            {/* <Text style={styles.contentText}>
              <Text>
                Please add a new item to the inventory company{'\n'} has for
                sale
              </Text>
              <Text> or the materials needed to create those goods.</Text>
            </Text> */}
            <Button
              iconname={'plus'}
              iconType={'Feather'}
              size={scale(25)}
              iconstyle={styles.iconbtn}
              color={colors.white}
              label={'Create New Inventory'}
              labelColor={colors.white}
              labelStyle={{fontSize: scale(14)}}
              style={styles.UpdateInventory}
              backgroundColor={colors.primary}
              onPress={() => {
                navigation.navigate('NewInventory', {editData: false});
              }}
              // onPress={() => {
              //   navigation.navigate('UpdateInventory');
              // }}
            />
            <Text style={[styles.welcomeLabel, {color: colors.black}]}>
              Inventory List
            </Text>
            {inventryList && (
              <View style={styles.sectionTitleAndLinkWrapper}>
                {product.length > 0 && (
                  <TouchableOpacity onPress={() => setProduct([])}>
                    <FilterReset
                      width={STANDARD_SOCIAL_ICON_SIZE * 0.8}
                      height={STANDARD_SOCIAL_ICON_SIZE * 0.8}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}
        ListFooterComponent={() => (
          <>
            {isLoading && (
              <View style={{marginTop: scale(20), marginBottom: scale(40)}}>
                <BarIndicators />
              </View>
            )}
          </>
        )}
      />

      {/* Filter Modal */}
      <FilterModal
        filterModalVisible={filterModalVisible}
        closeFilterModal={closeFilterModal}
        dropdownVisible={dropdownVisible}
        selectedOption={selectedOption}
        handleDropdown={handleDropdown}
        selectOption={selectOption}
        setFilteredData={setFilteredData}
        filterData={filterData}
        categoryNames={categories.map(item => item?.category_name)}
        getFilterData={val => {
          navigation.navigate('InventoryFilterList', {
            item: val,
          });
          // const data = val.name;
          // setFilterSortListShow(true);
          closeFilterModal();
          // datafilter(val);
          // // alert(val.name);
          // setAtLeastOneSelected(true);
        }}
      />

      {/* Sort Modal */}
      <SortingModal
        visible={sortModalVisible}
        onClose={onClose}
        dropdownVisible={dropdownVisible}
        selectedOption={selectedOption}
        handleDropdown={handleDropdown}
        selectOption={selectOption}
        setSortingData={setSortingData}
        sortingsData={sortingsData}
        getSortingData={val => {
          navigation.navigate('InventorySortList', {
            item: val,
          });
          closeSortModal();
          // console.log('valvalval', val);
          // const data = val.name;

          // datafilter(val);
          // onClose();
          // alert(val.name);
          // setAtLeastOneSelected(true);
        }}
      />

      {/* {isLoading && <Indicators />}  */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: STANDARD_SPACING * 2,
    marginTop: STANDARD_SPACING * 3,
  },
  sectionTitleAndLinkWrapper: {
    margin: STANDARD_SPACING * 1,
    marginHorizontal: STANDARD_SPACING * 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeLabel: {
    fontSize: scale(18),
    fontWeight: '500',
    fontFamily: POPPINS_REGULAR,
    color: colors.black,
    marginLeft: scale(-20),
  },
  headerView: {
    flex: 1,
  },
  drawerMenuIconWrapper: {
    width: scale(25),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE * 0.1,
  },
  contentWrapper: {
    // padding: scale(2),
    // width: SCREEN_WIDTH * 0.96,
    // marginHorizontal: scale(16),
    marginVertical: scale(5),
    alignSelf: 'center',
  },
  contentText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: scale(14),
    color: colors.darkblack,
    fontSize: scale(12),
    letterSpacing: scale(0.6),
    fontWeight: '400',
  },
  UpdateInventory: {
    margin: STANDARD_SPACING * 3,
    width: SCREEN_WIDTH * 0.7,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  iconbtn: {
    marginRight: scale(8),
    alignItems: 'center',
    bottom: scale(2),
  },
  bagestyle: {
    backgroundColor: colors.green,
    alignSelf: 'center',
    marginVertical: scale(5),
  },
  ListWrapper: {
    borderWidth: 1,
    borderColor: '#B6B6B6',
    padding: scale(10),
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    marginBottom: scale(15),
  },
  tittleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scale(5),
  },
  boldtxt: {
    fontSize: scale(15),
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '600',
    lineHeight: scale(20),
    color: colors.black,
    alignSelf: 'center',
  },
  normaltxt: {
    fontSize: scale(12),
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '400',
    lineHeight: scale(20),
    color: colors.C7C7C,
    alignSelf: 'center',
  },
  flatListContainer: {
    flexGrow: 1,
    marginHorizontal: scale(10),
    top: scale(10),
    // backgroundColor: 'green',
  },
});

export default Inventory;
