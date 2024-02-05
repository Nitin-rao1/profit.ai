import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header/Header';
import colors from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import {
  POPPINS_BOLD,
  POPPINS_MEDIUM,
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
import SortingModal from '../../components/Modal/SorttingModal/SortingModal';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {BarIndicators} from '../../components/apploader';
import {
  CustomerLedgerBook,
  getTransactionsHistory,
  saleBookSearch,
  saleBookSort,
} from '../../api/auth/auth';
import {useSelector} from 'react-redux';
import Icons from '../../components/Icons/Icons';
// import {historyData} from '../../components/data/Inventorydata';

const HistorySearchList = ({navigation, route}) => {
  const userInfo = useSelector(state => state.users.users);
  const isrouteData = route?.params?.item;
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const [hasMore, setHasMore] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [search, setSearch] = useState(null);
  const [showResults, setShowResults] = useState(false);

  console.log('mmmmmmm', searchResults);

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

  const searchProduct = () => {
    saleBookSearch(userInfo.token.access, customerName)
      .then(response => {
        // console.log('Search result:', customerName);
        console.log(
          'Response Datannnnnnnnxxxxxxxxx:',
          response.data[0]?.customer,
        );

        if (response.data.length > 0) {
          setSearchResults(response.data);
          setShowResults(true);
        } else {
          setSearchResults([]);
          setShowResults(false);
        }
      })
      .catch(error => {
        console.log('Error:', error);
        setSearchResults([]);
        setShowResults(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchbarWrapper}>
        <View style={styles.backbtn}>
          <Icons
            name={'chevron-back'}
            iconType={'Ionicons'}
            color={colors.C7C7C}
            size={scale(20)}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <TextInput
          style={styles.textinputstyl}
          placeholder="Customer Name"
          placeholderTextColor={colors.black}
          value={customerName}
          onChangeText={text => setCustomerName(text)}
        />

        <View style={styles.Searchingbtn}>
          <Icons
            name={'search'}
            iconType={'Feather'}
            color={colors.primary}
            size={20}
            onPress={searchProduct}
          />
        </View>
      </View>

      {searchResults?.length > 0 && (
        <View style={styles.content}>
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <>
                {/* {isLoading && (
                  <View style={{marginTop: scale(20), marginBottom: scale(70)}}>
                    <BarIndicators />
                  </View>
                )} */}
              </>
            )}
          />
        </View>
      )}
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
    marginTop: 10,
  },
  FlatListcontainer: {
    flex: 1,
    marginHorizontal: scale(10),
  },
  searchbarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH * 0.94,
    borderRadius: STANDARD_BORDER_RADIUS * 1,
    marginTop: scale(10),
    backgroundColor: '#F6F5F6',
    color: colors.gray,
    borderWidth: 1.5,
    borderColor: colors.C7C7C,
  },
  backbtn: {
    padding: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinputstyl: {
    alignItems: 'center',
    flex: 1,
    fontSize: scale(12),
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '600',
    color: colors.black,
    // backgroundColor:'red'
  },
  // searchbarTextInput: {
  //   flex: 1,
  //   // height: scale(30),
  //   paddingLeft: scale(10),
  // },
  Searchingbtn: {
    padding: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistorySearchList;
