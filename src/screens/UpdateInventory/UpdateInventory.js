import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import colors from '../../constants/colors';
import Icons from '../../components/Icons/Icons';
import {
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE,
  STANDARD_SPACING,
} from '../../constants/constants';
import Filter from '../../assets/svg/Filter.svg';
import Short from '../../assets/svg/Short.svg';
import {scale} from 'react-native-size-matters';
import Button from '../../components/Button';
import DeleteModal from '../../components/Modal/DeleteModal/DeleteModal';
import UpdateInventorydata from '../../components/data/UpdateInventorydata';
import FilterModal from '../../components/Modal/FilterModal/FilterModal';
import SortingModal from '../../components/Modal/SorttingModal/SortingModal';
import SubHeader from '../../components/SubHeader/SubHeader';
import {
  userAllDataList,
  userCreateList,
  userDeleteProductList,
  userSortFilter,
  userUpdateList,
} from '../../api/auth/auth';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {BarIndicators, Indicators} from '../../components/apploader';
import {filterData, sortingsData} from '../../components/data/Inventorydata';
import {setCategoriesData} from '../../redux/slices/InventrySlice';

const PAGE_SIZE = 10;
const UpdateInventory = ({navigation, route}) => {
  const store = useStore();
  const [refreshKey, setRefreshKey] = useState(0);
  const [page, setPage] = useState(1);
  const {inventoryData} = route.params || {};
  console.log('Inventory Data:', inventoryData);
  const userInfo = useSelector(state => state.users.users);
  const [inventryList, setInventryList] = useState([]);
  // const inventryList = useSelector(state => state.inventryList.inventryList);
  const [sortingData, setSortingData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sortingOption, setSortingOption] = useState(null);
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [atLeastOneSelected, setAtLeastOneSelected] = useState(false);
  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();

  const selectOption = option => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };
  const handleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  console.log('selectedOption', inventryList.length);
  const handleBrandSelection = productId => {
    console.log('Selected Product ID:', productId);
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

  const onClose = () => {
    setSortModalVisible(false);
  };

  useEffect(() => {
    fetchData();

    // console.log('Filtered Data:', filteredData);
  }, [page]);

  const fetchData = val => {
    // const formData = val?val:page;
    setIsLoading(true);
    // alert(page)
    userAllDataList(userInfo.token.access, page)
      .then(response => {
        console.log(
          'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          response.data[0],
        );
        setInventryList(pre => [...pre, ...response.data]);
        // const oldProduct = store.getState().inventryList.inventryList
        // const arrr = [...oldProduct, ...response.data];
        // if (val) {
        //   dispatch(setCategoriesData(response.data));

        // } else {

        //   dispatch(setCategoriesData(arrr));
        //   setPage(pre => pre + 1);
        // }
        if (response.next == null) {
          setHasMore(false);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
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

  // useEffect(() => {
  //   const focusHandler = navigation.addListener('focus', () => {
  //     fetchData(1)
  //     // setPage(1)
  //     // setTimeout(() => {
  //     //   // alert('dddd')
  //     //   setVisibleData(prevVisibleData => [...prevVisibleData]);
  //     // }, 100);
  //   });
  //   return focusHandler;
  // }, [navigation]);

  const handleEdit = item => {
    console.log('item', item);
    const modifiedItem = {
      ...item,
      product_type: item.product_type.id,
    };
    navigation.navigate('NewInventory', {editData: modifiedItem});
  };

  const datafilter = async data => {
    console.log('data', data);
    setIsLoading(true);

    await userSortFilter(userInfo.token.access, data)
      .then(res => {
        console.log('Products Found Successfully!', res.data);
        setIsLoading(false);
        setProduct(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };

  const renderItem = ({item}) => (
    <View style={styles.listWrapper}>
      <View style={styles.titleContainer}>
        <View>
          <Text style={[styles.boldText, {alignSelf: 'flex-start'}]}>
            {item.product_name}
          </Text>
          <Text style={[styles.normalText, {alignSelf: 'flex-start'}]}>
            Qty: {item.remaining_quantity}
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <Pressable onPress={() => handleEdit(item)}>
            <Icons
              iconType={'Feather'}
              name={'edit-2'}
              size={scale(20)}
              color={colors.darkgray}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              handleDelete(item.id);
            }}>
            <Icons
              iconType={'MaterialIcons'}
              name={'delete'}
              size={scale(25)}
              color={colors.error}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );

  const handleDelete = id => {
    console.log('handleDelete', id);
    setSelectedItemId(id);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {/* Header */}
      <SubHeader
        back={true}
        title={'Inventory'}
        Textcolor={colors.black}
        // optionalBtn="search"
        optionalBtnPress={() => {
          navigation.navigate('SearchScreen');
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
        data={product.length > 0 ? product : inventryList}
        renderItem={item => renderItem(item)}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        keyExtractor={(item, index) =>
          `${item.product_name}_${item.product_id || index}`
        }
        contentContainerStyle={styles.flatListContainer}
        // ListEmptyComponent={()=>{
        //   return(

        //     <Text>not found</Text>
        //   )
        // }}
        ListHeaderComponent={() => (
          <View style={styles.contentWrapper}>
            <Text style={styles.contentText}>
              <Text>
                Please add a new item to the inventory company
                <Text> has for sale or the materials needed to create </Text>
              </Text>
              <Text> those goods.</Text>
            </Text>
            <Button
              iconname={'plus'}
              iconType={'Feather'}
              size={scale(25)}
              iconstyle={styles.iconbtn}
              color={colors.white}
              label={'Create New Inventory'}
              labelColor={colors.white}
              labelStyle={{fontSize: scale(14)}}
              style={styles.updateInventory}
              backgroundColor={colors.primary}
              onPress={() => {
                navigation.navigate('NewInventory');
              }}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <>
            {isLoading && (
              <View style={{marginTop: scale(20), marginBottom:scale(40), }}>
                <BarIndicators />
              </View>
            )}
          </>
        )}
        showsVerticalScrollIndicator={false}
      />
      {/*delete modal*/}
      <DeleteModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        itemId={selectedItemId}
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
          closeFilterModal();
          datafilter(data);
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
          const data = val.name;
          onClose();
          datafilter(data);
          // alert(val.name);
          setAtLeastOneSelected(true);
        }}
      />
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
  welcomeLabel: {
    fontSize: scale(18),
    fontWeight: '500',
    fontFamily: POPPINS_SEMIBOLD,
  },
  headerView: {
    flex: 1,
    // backgroundColor:'red',
    marginLeft: scale(10),
  },
  LeftView: {
    // marginHorizontal: scale(),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: scale(35),
    width: scale(35),
    borderRadius: scale(10),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    elevation: 2,
  },
  menuIconsContainer: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.23,
    justifyContent: 'space-around',
  },
  drawerMenuIconWrapper: {
    width: scale(25),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE * 0.1,
  },
  contentWrapper: {
    height: SCREEN_HEIGHT * 0.18,
    // padding: scale(2),
    marginVertical: scale(5),
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
  contentText: {
    textAlign: 'center',
    // textTransform: 'capitalize',
    lineHeight: scale(14),
    color: colors.darkblack,
    fontSize: FONT_SIZE_XS,
    letterSpacing: scale(0.6),
    fontWeight: '400',
    fontFamily: POPPINS_REGULAR,
  },
  updateInventory: {
    top: scale(25),
    width: SCREEN_WIDTH * 0.7,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  iconbtn: {
    alignItems: 'center',
    bottom: scale(2),
  },
  listWrapper: {
    borderWidth: 1,
    borderColor: '#B6B6B6',
    padding: scale(10),
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    marginBottom: scale(8),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(50),
    justifyContent: 'space-between',
  },
  boldText: {
    fontSize: scale(15),
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '500',
    lineHeight: scale(20),
    color: colors.black,
    alignSelf: 'center',
  },
  normalText: {
    fontSize: scale(12),
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '400',
    lineHeight: scale(20),
    color: colors.black,
    alignSelf: 'center',
  },
  flatListContainer: {
    flexGrow: 1,
    marginHorizontal: scale(10),
    top: scale(10),
    // backgroundColor: 'green',
  },
});

export default UpdateInventory;

{
  /* <View style={styles.header}>
      <View style={styles.LeftView}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icons iconType={'Feather'} name="chevron-left" size={scale(20)} color={colors.C7C7C} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerView}>
          <Text style={[styles.welcomeLabel, {color: colors.black}]}>
            Inventory List
          </Text>
        </View>
        <View style={styles.menuIconsContainer}>
          <Pressable
            style={styles.drawerMenuIconWrapper}
            onPress={() => navigation.openDrawer()}>
            <Icons
              name={'search'}
              iconType={'Feather'}
              color={colors.primary}
              size={scale(22)}
            />
          </Pressable>
          <Pressable
            style={styles.drawerMenuIconWrapper}
            onPress={openFilterModal}>
               <Icons iconType={'FontAwesome6'} name={'sliders'} size={scale(18)} color={colors.black}/>
          </Pressable>
          <Pressable
            style={styles.drawerMenuIconWrapper}
            onPress={openSortModal}>
              <Icons iconType={'MaterialCommunityIcons'} name={'sort-variant'} size={scale(25)} color={colors.black}/>
          </Pressable>
        </View>
      </View> */
}
