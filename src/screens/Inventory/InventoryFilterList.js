import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import colors from '../../constants/colors';
import Header from '../../components/Header/Header';
import Icons from '../../components/Icons/Icons';
import {
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_BUTTON_HEIGHT,
  STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE,
  STANDARD_SOCIAL_ICON_SIZE,
  STANDARD_SPACING,
  STANDARD_VECTOR_ICON_SIZE,
} from '../../constants/constants';
import Filter from '../../assets/svg/Filter.svg';
import Short from '../../assets/svg/Short.svg';
import {scale} from 'react-native-size-matters';
import {red} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import Button from '../../components/Button';
import {Badge} from 'react-native-paper';
import Inventorylist from '../../components/Cards/Inventorylist';
import Inventorydata, {
  filterData,
  sortingsData,
} from '../../components/data/Inventorydata';
import SortingModal from '../../components/Modal/SorttingModal/SortingModal';
import FilterModal from '../../components/Modal/FilterModal/FilterModal';
import SubHeader from '../../components/SubHeader/SubHeader';
import FilterReset from '../../assets/svg/Filter-Reset.svg';

import {
  userAllDataList,
  userGetInventory,
  userSortFilter,
} from '../../api/auth/auth';
import {useCallback} from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {BarIndicators, Indicators} from '../../components/apploader';
import {setCategoriesData} from '../../redux/slices/InventrySlice';
const InventoryFilterList = ({navigation,route}) => {
    console.log('ppppppppppppp', route?.params?.item);
  const isrouteData = route?.params?.item;
  const store = useStore();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [atLeastOneSelected, setAtLeastOneSelected] = useState(false);
  const [filterSortListShow, setFilterSortListShow] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [sortingData, setSortingData] = useState([]);
  const [sortingOption, setSortingOption] = useState(null);
  const [loading, setLoading] = useState(true);
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

//   const openFilterModal = () => {
//     setFilterModalVisible(true);
//   };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

//   const openSortModal = () => {
//     setSortModalVisible(true);
//   };

  const closeSortModal = () => {
    setSortModalVisible(false);
  };

  const onClose = () => {
    setSortModalVisible(false);
  };
  useEffect(() => {
    datafilter();
    // console.log('Filtered Data:', filteredData);
  }, [page]);

  const keyExtractor = (item, index) => `${item.id}-${index}`;

  const ItemSeparatorComponent = () => {
    return;
    // <View style={{}}></View>;
  };

  const onEndReached = () => {
    setIsLoading(true);
    if (hasMore) {
      // fetchData(page+1);

      setPage(pre => pre + 1);
    } else {
      setIsLoading(false);
    }
  };

//   const onEndReachedfilter = () => {
//     setIsLoading(true);
//     if (hasMore) {
//       // fetchData(page+1);

//       setPage(pre => pre + 1);
//     } else {
//       setIsLoading(false);
//     }
//   };

  const datafilter = async data => {
    console.log('data=============', data);
    setIsLoading(true);
    // return
    await userSortFilter(userInfo.token.access,isrouteData, page)
      .then(res => {
        console.log('Products Found Successfully!', res.data[0]);
        setFilteredData(pre => [...pre, ...res.data]);
        if (res.data.length == 0) {
            setHasMore(false);
            setIsLoading(false);
          }
          setIsLoading(false);
          setLoading(false);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        setIsLoading(false);
        setHasMore(false);
        setLoading(false);
      });
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
    <>
    {loading ? (
      <Indicators />
    ) : (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {/* Header */}
      <SubHeader
        back={true}
        title={'Inventory Filter List'}
        Textcolor={colors.black}
        optionalBtnPress={() => {
          navigation.navigate('SearchScreen');
        }}
        iconColor={colors.black}
        leftview={false}
        margintitleLeft={scale(14)}
      />
        <FlatList
          data={filteredData}
          renderItem={({item}) => (
            <Inventorylist
              key={item.id}
              item={item}
              onPress={() => handleEdit(item)}
            />
          )}
          keyExtractor={keyExtractor}
          // ItemSeparatorComponent={ItemSeparatorComponent}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyListComponent}>
               <Text style={styles.emptyListText}>Sorry, but there is currently no data available in the inventory</Text>
               </View>
            )
          }}
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
          const data = val.name;
          setFilterSortListShow(true);
          closeFilterModal();
          datafilter(val);
          // alert(val.name);
          setAtLeastOneSelected(true);
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
          console.log('valvalval', val);
          // const data = val.name;

          // datafilter(val);
          onClose();
          // alert(val.name);
          setAtLeastOneSelected(true);
        }}
      />
    </View>
     )}
     </>
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
  emptyListComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:SCREEN_HEIGHT,
    // backgroundColor:'red',
  },
  emptyListText: {
    fontSize: scale(14),
    fontFamily: POPPINS_REGULAR,
    color: colors.black,
    textAlign: 'center',
  },
});

export default InventoryFilterList;
