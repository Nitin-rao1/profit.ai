import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import colors from '../../constants/colors';
import Icons from '../../components/Icons/Icons';
import {
  SCREEN_WIDTH,
  STANDARD_SPACING,
  POPPINS_SEMIBOLD,
  STANDARD_TEXT_INPUT_HEIGHT,
  STANDARD_BORDER_RADIUS,
  POPPINS_REGULAR,
  POPPINS_MEDIUM,
} from '../../constants/constants';
import {scale} from 'react-native-size-matters';
import SubHeader from '../../components/SubHeader/SubHeader';
import {useSelector} from 'react-redux';
import DeleteModal from '../../components/Modal/DeleteModal/DeleteModal';
import {Searchingdata, userSearchProduct} from '../../api/auth/auth';
import LedgerList from '../../components/LedgerList';

const LogBookSearchList = ({navigation, route}) => {
  const handleEdit = item => {
    // alert('sdfgggddgg');
    // return;
    console.log('item', item);
    const modifiedItem = {
      ...item,
      product_type: item.product_type.id,
      // quantity: String(total_quantity),
    };
    // navigation.navigate('NewInventory');
    // editList(modifiedItem);
    navigation.navigate('NewInventory', {editData: modifiedItem});
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const userInfo = useSelector(state => state.users.users);


  console.log('serchresult',searchResults);

  const [showResults, setShowResults] = useState(false);
  // console.log('customerName====>', customerName);

  // useEffect(() => {
  //   searchProduct();
  // }, [searchQuery]);


  const searchProduct = async() => {
   await Searchingdata(userInfo.token.access, customerName)
      .then(response => {
        console.log('Search Query:', customerName);
        console.log('Response Data:', response.customers);

        if(response.customers?.length > 0) {
          setSearchResults(response.customers);
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
  console.log('Search Results Length:', searchResults.length);


  const renderItem = ({item, index}) => (
    <LedgerList
      favourite={item.favourite}
      navigation={navigation}
      item={item}
      index={index}
    />
  );

  const handleDelete = id => {
    console.log('handleDelete', id);
    setSelectedItemId(id);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchbarWrapper}>
       <View style={styles.backbtn}>
       <Icons
          name={'chevron-back'}
          iconType={'Ionicons'}
          color={colors.C7C7C}
          size={ scale(20)}
          onPress={() => {
            navigation.goBack();
          }} 
        />
       </View>
        <TextInput
          style={styles.textinputstyl}
          placeholder="Brand, Category, or Product Name"
          placeholderTextColor={colors.black}
          value={customerName}
          onChangeText={text => setCustomerName(text)}
        />

        <View style={styles.Searchingbtn}>
          <Icons
            name={'search'}
            iconType={'Feather'}
            color={colors.primary}
            size={scale(20)}
            onPress={searchProduct}
          />
        </View>
      </View>

      {searchResults.length > 0 ? (
        <View style={styles.content}>
          {/* <View style={styles.title}>
            <Text style={styles.titletxt}>Item List</Text>
          </View> */}
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No search results found</Text>
        </View>
      )}

      <DeleteModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        itemId={selectedItemId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchbarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'space-between',
    width:SCREEN_WIDTH * 0.94,
    borderRadius: STANDARD_BORDER_RADIUS * 1,
    marginTop:scale(10),
    backgroundColor: '#F6F5F6',
    color: colors.gray,
    borderWidth: 1.5,
    borderColor: colors.C7C7C,
  },
  backbtn:{
    padding: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinputstyl: {
    alignItems:'center',
    flex: 1,
    fontSize: scale(12),
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '600', 
    color:colors.black,
    // backgroundColor:'red'
  },
  Searchingbtn: {
    padding: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultItem: {
    borderWidth: scale(1),
    borderColor: colors.C7C7C,
    padding: scale(10),
    marginBottom: scale(10),
    borderRadius: STANDARD_BORDER_RADIUS * 2,
  },
  resultTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: scale(5),
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: scale(16),
    color: colors.black,
  },

  searchbarcontainer: {
    width: SCREEN_WIDTH * 0.92,
    marginVertical: scale(14),
    alignSelf: 'center',
  },
  Searchingbtn: {
    right: scale(5),
    padding: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: scale(10),
  },
  title: {
    marginLeft: scale(10),
    marginTop: scale(5),
    fontSize: scale(16),
    color: colors.black,
    fontFamily: POPPINS_REGULAR,
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
  titletxt: {
    fontSize: scale(14),
    fontFamily: POPPINS_MEDIUM,
    color: colors.black,
    fontWeight: '500',
    lineHeight: scale(14),
  },
  boldText: {
    fontSize: scale(15),
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '600',
    lineHeight: scale(20),
    color: colors.black,
    alignSelf: 'center',
  },
  normalText: {
    fontSize: scale(12),
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '400',
    lineHeight: scale(20),
    color: colors.darkblack,
    alignSelf: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(50),
    justifyContent: 'space-between',
  },
});

export default LogBookSearchList;
