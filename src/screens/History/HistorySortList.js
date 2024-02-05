import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header/Header';
import colors from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import {
  POPPINS_BOLD,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
} from '../../constants/constants';
import {Badge, Modal} from 'react-native-paper';
import Transactiondata, {
  sortingsData,
} from '../../components/data/Transactiondata';
import Transaction from '../../components/Cards/Transaction';
import SubHeader from '../../components/SubHeader/SubHeader';
// import FilterModal from '../../components/Modal/FilterModal/FilterModal';
import SortingModal from '../../components/Modal/SorttingModal/SortingModal';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {BarIndicators, Indicators} from '../../components/apploader';
import {CustomerLedgerBook, getTransactionsHistory, saleBookSort} from '../../api/auth/auth';
import {useSelector} from 'react-redux';
// import {historyData} from '../../components/data/Inventorydata';

const HistorySortList = ({navigation,route}) => {
  const userInfo = useSelector(state => state.users.users);
  const isrouteData = route?.params?.item;
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [logBookData, setLogBookData] = useState([]);

  const [hasMore, setHasMore] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);



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


  const closeSortModal = () => {
    setSortModalVisible(false);
  };






  const fetchData = async () => {
    setIsLoading(true);
    await saleBookSort(userInfo.token.access, isrouteData, page)
      .then(response => {
        console.log('response====>????', response.data);
        setLogBookData(pre => [...pre, ...response.data]);
        if (response.data.length == 0) {
          setHasMore(false);
          setIsLoading(false);
        }
        setIsLoading(false);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        setHasMore(false);
        setHasMore(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const renderItem = ({item, index}) => (
    <Transaction key={`${item.id}-transactionSort`} item={item} index={index} />
  );

  const onEndReached = () => {
    setIsLoading(true);
    if (hasMore) {
      // fetchData(page+1);

      setPage(pre => pre + 1);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
    {loading ? (
      <Indicators />
    ) : (
    <View style={styles.container}>
      <SubHeader
        back={true}
        title={'Sale Book Sort List'}
        Textcolor={colors.black}
        iconColor={colors.black}
        leftview={false}
        margintitleLeft={scale(14)}
      />

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
              <View style={{marginTop: scale(20), marginBottom: scale(70)}}>
                <BarIndicators />
              </View>
            )}
          </>
        )}
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyListComponent}>
             <Text style={styles.emptyListText}>Sorry, but there is currently no data available in the Sale book</Text>
             </View>
          )
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
  contentWrapper: {
    // width:SCREEN_WIDTH * 0.9,
    // padding: scale(12),
    marginVertical: scale(10),
    alignSelf: 'center',
  },
  contentText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    letterSpacing: scale(0.6),
    lineHeight: scale(16),
    color: colors.darkblack,
    fontSize: scale(12),
    fontWeight: '400',
  },
  headingtxt: {
    fontFamily: POPPINS_BOLD,
    textTransform: 'capitalize',
    lineHeight: scale(20),
    color: colors.black,
    fontSize: scale(16),
    fontWeight: '500',
  },
  FlatListcontainer: {
    flex: 1,
    marginHorizontal: scale(10),
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

export default HistorySortList;
