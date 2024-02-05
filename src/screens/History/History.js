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
import {BarIndicators} from '../../components/apploader';
import {CustomerLedgerBook, getTransactionsHistory} from '../../api/auth/auth';
import {useSelector} from 'react-redux';
// import {historyData} from '../../components/data/Inventorydata';

const History = ({navigation}) => {
  const userInfo = useSelector(state => state.users.users);

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [logBookData, setLogBookData] = useState([]);

  const [hasMore, setHasMore] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const minDate = new Date(); // Today
  const maxDate = new Date(2017, 6, 3);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateString, setDateString] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const containerBackgroundColor = showDatePicker
    ? 'rgba(0,0,0,0)'
    : colors.white;

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

  // const openFilterModal = () => {
  //   setFilterModalVisible(true);
  // };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  const openSortModal = () => {
    setSortModalVisible(true);
  };

  const closeSortModal = () => {
    setSortModalVisible(false);
  };

  const onChange = selectedDate => {
    if (selectedDate) {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      setDateString(formattedDate);
      setSelectedDate(selectedDate);
      const formData = {
        date: formattedDate,
      };
      navigation.navigate('HistorySortList', {
        item: formData,
      });
      console.log('eeeeeeeeeeeeee', formattedDate);
    }
    hideOverlay();
  };

  const showOverlay = () => {
    setShowDatePicker(true);
  };

  const hideOverlay = () => {
    setShowDatePicker(false);
  };

  const fetchData = async () => {
    setIsLoading(true);
    await getTransactionsHistory(userInfo.token.access, page)
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

  const renderItem = ({item, index}) => (
    <Transaction key={item.id} item={item} index={index} />
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
    <View style={styles.container}>
      <SubHeader
        title={'Bill Book'}
        Textcolor={colors.black}
        // optionalBtn="search"
        optionalBtnPress={() => {
          navigation.navigate('HistorySearchList');
        }}
        onRightPress={showOverlay}
        onRightSidePress={openSortModal}
        iconColor={colors.black}
        leftview={false}
        margintitleLeft={scale(14)}
        searchIcon={true}
        sortingIcon={true}
        calenderIcon={true}
      />

      <Modal
        transparent={true}
        animationType="slide"
        visible={showDatePicker}
        onRequestClose={hideOverlay}>
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            date={selectedDate}
            onConfirm={onChange}
            onCancel={hideOverlay}
            pickerComponentStyleIOS={{backgroundColor: 'red'}}
          />
        </View>
      </Modal>

      <View>
        <FlatList
          data={logBookData}
          renderItem={({item, index}) => (
            <Transaction
              key={`${item.id}-${index}`}
              item={item}
              index={index}
            />
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
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
              <View style={{marginBottom: scale(60)}}></View>
            </>
          )}
          // ListHeaderComponent={() => (
          //   <>
          //     <View style={styles.contentWrapper}></View>
          //     {/* <View style={styles.FlatListcontainer}>
          //       <Text style={styles.headingtxt}>All Transaction History</Text>
          //     </View> */}
          //   </>
          // )}
        />
      </View>

      {/* Sort Modal */}
      <SortingModal
        visible={sortModalVisible}
        onClose={closeSortModal}
        dropdownVisible={dropdownVisible}
        selectedOption={selectedOption}
        handleDropdown={handleDropdown}
        handleSorting={handleSorting}
        selectOption={selectOption}
        historysortData={sortingsData}
        getSortingData={val => {
          console.log('xxx', val);
          navigation.navigate('HistorySortList', {
            item: val,
          });
          closeSortModal();
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
});

export default History;
