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
import { userSearchProduct } from '../../api/auth/auth';
import Inventorylist from '../../components/Cards/Inventorylist';

const InventorySearchList = ({navigation}) => {
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
  const [brandName, setBrandName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const userInfo = useSelector(state => state.users.users);

  const [showResults, setShowResults] = useState(false);
  console.log('brandName====>', brandName);

  useEffect(() => {
    searchProduct();
  }, [searchQuery]);
  const searchProduct = () => {
    userSearchProduct(userInfo.token.access, brandName)
      .then(response => {
        console.log('Search Query:', brandName);
        console.log('Response Data:', response.data);

        if (
          response &&
          response.status === 'success' &&
          response.data.length > 0
        ) {
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
  console.log('Search Results Length:', searchResults.length);

  // const renderItem = ({item}) => (
  //   <View style={styles.resultItem}>
  //     <Text style={styles.resultTitle}>{item.product_name}</Text>
  //     <Text>{`Brand: ${item.brand}`}</Text>
  //     <Text>{`Category: ${item.product_type.category_name}`}</Text>
  //     <Text>{`Sales Price: $${item.sales_price}`}</Text>
  //   </View>
  // );

  // const renderItem = ({item}) => (
  //   <View style={styles.listWrapper}>
  //     <View style={styles.titleContainer}>
  //       <View>
  //         <Text style={[styles.boldText, {alignSelf: 'flex-start'}]}>
  //           {item.product_name}
  //         </Text>
  //         <Text style={[styles.normalText, {alignSelf: 'flex-start'}]}>
  //           {/* <Text>{`Brand: ${item.brand}`}</Text> */}
  //           Qty: {item.total_quantity}
  //         </Text>
  //       </View>
  //       <View style={styles.actionContainer}>
  //         <Pressable onPress={() => handleEdit(item)}>
  //           <Icons
  //             iconType={'Feather'}
  //             name={'edit-2'}
  //             size={scale(20)}
  //             color={colors.darkgray}
  //           />
  //         </Pressable>
  //         <Pressable
  //           onPress={() => {
  //             handleDelete(item.id);
  //           }}>
  //           <Icons
  //             iconType={'MaterialIcons'}
  //             name={'delete'}
  //             size={scale(25)}
  //             color={colors.error}
  //           />
  //         </Pressable>
  //       </View>
  //     </View>
  //   </View>
  // );

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
          value={brandName}
          onChangeText={text => setBrandName(text)}
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
            // renderItem={renderItem}
            renderItem={({item}) => (
              <Inventorylist
                key={item.id}
                item={item}
                onPress={() => handleEdit(item)}
              />
            )}
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
  textinputstyl: {
    alignItems:'center',
    flex: 1,
    fontSize: scale(12),
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '600', 
    color:colors.black,
    // backgroundColor:'red'
  },
  backbtn:{
    padding: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily:POPPINS_REGULAR,
    fontWeight:'600',
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
    flex:1,
    marginTop:STANDARD_SPACING * 3,
  },

  searchbarTextInput: {
    height: STANDARD_TEXT_INPUT_HEIGHT * 0.95,
    width: SCREEN_WIDTH * 0.7,
    alignSelf: 'center',
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
  titletxt:{
    fontSize:scale(14),
    fontFamily:POPPINS_MEDIUM,
    color:colors.black,
    fontWeight:'500',
    lineHeight:scale(14),
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

export default InventorySearchList;
