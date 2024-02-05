import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import {
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  SCREEN_WIDTH,
  STANDARD_SOCIAL_ICON_SIZE,
  STANDARD_SPACING,
} from '../../constants/constants';
import Icons from '../../components/Icons/Icons';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/SubHeader/SubHeader';
import FilterModal from '../../components/Modal/FilterModal/FilterModal';
import SortingModal from '../../components/Modal/SorttingModal/SortingModal';
import {
  CustomerLedgerBook,
  FavouriteCustomer,
  ledgerBookFilter,
  userSortFilter,
} from '../../api/auth/auth';
import {useSelector} from 'react-redux';
import {BarIndicators, Indicators} from '../../components/apploader';
import FilterReset from '../../assets/svg/Filter-Reset.svg';
import {filterData, sortingsData} from '../../components/data/LedgerBookdata';
import LedgerList from '../../components/LedgerList';

const LogBook = ({navigation}) => {
  const userInfo = useSelector(state => state.users.users);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSortFilter, setPageSortFilter] = useState(1);
  const [hasMoreSortFilter, setHasMoreSortFilter] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [sortFilterPayLoad, setSortFilterPayLoad] = useState({});

  // const toggleHeart = (index) => {
  //   const newData = [...data];
  //   newData[index].heartClicked = !newData[index].heartClicked;
  //   setData(newData);
  // };

  const toggleHeart = (index, customerId, isFavourite) => {
    console.log(index, customerId, isFavourite);

    FavouriteCustomer(userInfo.token.access, {
      id: customerId,
      favourite: !isFavourite,
    })
      .then(response => {
        console.log('FavouriteCustomer API Response:', response);
        // const newData = [...data];
        // newData[index].heartClicked = !isFavourite;
        // setData(newData);
      })
      .catch(error => {
        console.error('Error calling FavouriteCustomer API:', error);
      });
  };

  const [data, setData] = useState([]);
  const [logBookData, setLogBookData] = useState([]);
  const [filterSortData, setFilterSortData] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterSort, setFilterSort] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = option => {
    setSelectedOption(option);
    setDropdownVisible(false);
    // Perform any other actions based on the selected option
  };
  const handleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSorting = option => {
    setSelectedOption(option);
    setDropdownVisible(false);
    // Additional sorting logic can be added here
  };
  console.log('selectedOption', selectedOption);

  const handleBrandSelection = brand => {
    console.log('Selected Brand:', brand);
    // Additional actions...
  };

  const openFilterModal = () => {
    setFilterSortData([]);
    setPageSortFilter(1);
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterSortData([]);
    setFilterModalVisible(false);
  };

  const openSortModal = () => {
    setSortModalVisible(true);
  };

  const closeSortModal = () => {
    setSortModalVisible(false);
  };

  const fetchData = async () => {
    setIsLoading(true);
    await CustomerLedgerBook(userInfo.token.access, page)
      .then(response => {
        console.log('response====>????', response.data);
        setLogBookData(pre => [...pre, ...response.data]);
        if (response.data.length == 0) {
          setHasMore(false);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        setIsLoading(false);
        setHasMore(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // useEffect(() => {
  //   if (filterSort) {
  //     datafilter(sortFilterPayLoad);
  //   }
  // }, [pageSortFilter]);

  const renderItem = ({item, index}) => {
    console.log('item????????????', item);
    return (
      <LedgerList
        price={item.last_invoice_grand_total}
        status={item.last_invoice_status}
        favourite={item.favourite}
        navigation={navigation}
        item={item}
        index={index}
      />
    );
  };

  // const onEndReachedSortFilter = () => {
  //   if (filterSort) {

  //     setIsLoading(true);

  //     if (hasMoreSortFilter) {
  //       // fetchData(page+1);

  //       setPageSortFilter(pre => pre + 1);
  //     } else {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  const onEndReached = () => {
    setIsLoading(true);
    if (hasMore) {
      // fetchData(page+1);

      setPage(pre => pre + 1);
    } else {
      setIsLoading(false);
    }
  };

  // const datafilter = async data => {
  //   console.log('data', data);
  //   setIsLoading(true);

  //   await ledgerBookFilter(userInfo.token.access, data, pageSortFilter)
  //     .then(res => {
  //       console.log('Products Found Successfully!', res.data[0]);
  //       const pkpk = [...filterSortData, ...res.data]
  //       setFilterSortData(pkpk);
  //       if (response.next == null) {
  //         setHasMoreSortFilter(false);
  //       }
  //       setIsLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //       setIsLoading(false);
  //       setHasMoreSortFilter(false);
  //     });
  // };

  return (
    <View style={styles.container}>
      <SubHeader
        title={'Ledger Book'}
        Textcolor={colors.black}
        optionalBtnPress={() => {
          navigation.navigate('LogBookSearchList');
        }}
        onRightPress={openFilterModal}
        onRightSidePress={openSortModal}
        iconColor={colors.black}
        leftview={false}
        margintitleLeft={scale(14)}
        searchIcon={true}
        sortingIcon={true}
        filterIcon={true}
      />

      <View style={styles.FlatListcontainer}>
        {/* {filterSort ? (
          <FlatList
            data={filterSortData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReachedSortFilter}
            ListEmptyComponent={() => (
              <>{isLoading == false && <Text>No Data Found</Text>}</>
            )}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <>
                {isLoading && (
                  <View style={{marginTop: scale(20), marginBottom: scale(40)}}>
                    <BarIndicators />
                  </View>
                )}
              </>
            )}
            ListHeaderComponent={() => (
              <View style={styles.contentWrapper}>
                <View style={styles.sectionTitleAndLinkWrapper}>
                  <Text style={[styles.welcomeLabel, {color: colors.black}]}>
                    Ledger Book Filter & SortList
                  </Text>

                  <TouchableOpacity onPress={() => setFilterSort(false)}>
                    <FilterReset
                      width={STANDARD_SOCIAL_ICON_SIZE * 0.8}
                      height={STANDARD_SOCIAL_ICON_SIZE * 0.8}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : ( */}
        <FlatList
          data={logBookData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <>
              {isLoading && (
                <View style={{marginTop: scale(20), marginBottom: scale(40)}}>
                  <BarIndicators />
                </View>
              )}
            </>
          )}

          // ListHeaderComponent={() => (
          //   <View style={styles.contentWrapper}>

          //       <View style={styles.sectionTitleAndLinkWrapper}>
          //         <Text style={[styles.welcomeLabel, {color: colors.black}]}>
          //         Ledger Book List
          //         </Text>

          //           <TouchableOpacity onPress={() => setProduct([])}>
          //             <FilterReset
          //               width={STANDARD_SOCIAL_ICON_SIZE * 0.8}
          //               height={STANDARD_SOCIAL_ICON_SIZE * 0.8}
          //             />
          //           </TouchableOpacity>

          //       </View>

          //   </View>
          // )}
        />
        {/* )} */}
      </View>
      {/* Filter Modal */}

      <FilterModal
        filterModalVisible={filterModalVisible}
        closeFilterModal={closeFilterModal}
        dropdownVisible={dropdownVisible}
        selectedOption={selectedOption}
        handleDropdown={handleDropdown}
        selectOption={selectOption}
        ledgerbookData={filterData}
        getFilterData={val => {
          navigation.navigate('LogBookFilterList', {
            item: val,
          });
          // setFilterSortData([]);
          // setFilterSort(true);
          // setSortFilterPayLoad(val);
          // console.log('val', val);
          closeFilterModal();
          // datafilter(val);
          // alert(val.name);
        }}
      />

      {/* Sort Modal */}
      <SortingModal
        visible={sortModalVisible}
        onClose={closeSortModal}
        dropdownVisible={dropdownVisible}
        selectedOption={selectedOption}
        handleDropdown={handleDropdown}
        handleSorting={handleSorting}
        selectOption={selectOption}
        ledgerBookData={sortingsData}
        getSortingData={val => {
          console.log('xxx', val);
          navigation.navigate('LogBookSortList', {
            item: val,
          });
          closeSortModal();
        }}
      />
      {/* {isLoading && <Indicators />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  FlatListcontainer: {
    flex: 1,
    paddingTop: scale(10),
    // marginVertical: scale(20),
  },
  MainWrapper: {
    marginHorizontal: scale(10),
    borderWidth: 1,
    borderColor: colors.dividerColor,
    borderRadius: scale(10),
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10), // Adjust margin as needed
  },
  titleWrapper: {
    // backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: '#1976D29C',
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '600',
    fontSize: scale(15),
    lineHeight: scale(20),
    textTransform: 'capitalize',
  },
  numberText: {
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '400',
    fontSize: scale(12),
    lineHeight: scale(20),
    textTransform: 'capitalize',
  },
  priceWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: scale(5),
    height: scale(55),
    // marginVertical:scale(10),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '700',
    fontSize: scale(12),
    lineHeight: scale(20),
    textTransform: 'capitalize',
    color: colors.green,
    marginLeft: scale(5), // Adjust margin as needed
  },
  iconhertsty: {
    marginLeft: scale(20),
    marginTop: scale(6),
  },
  contentWrapper: {
    // padding: scale(2),
    // width: SCREEN_WIDTH * 0.96,
    // marginHorizontal: scale(16),
    // marginVertical: scale(5),
    alignSelf: 'center',
    justifyContent: 'space-between',
    // borderWidth:2,
    width: '95%',
  },
  sectionTitleAndLinkWrapper: {
    // margin: STANDARD_SPACING * 1,
    // marginHorizontal: STANDARD_SPACING * 2,
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
});

export default LogBook;
