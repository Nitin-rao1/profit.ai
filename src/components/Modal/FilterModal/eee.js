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
// import {Indicators} from '../components/apploader';
import {Indicators} from '../../apploader';
const FilterModal = ({
  filterModalVisible,
  closeFilterModal,
  handleDropdown,
  selectOption,
  navigation,
  setFilteredData,
}) => {
  const [saleprice, setSaleprice] = useState('');
  const [purchaseprice, setPurchaseprice] = useState('');
  const [productQuntity, setProductQuntity] = useState('');
  const [category, setCategory] = useState('');
  const [selectName, setSelectName] = useState(''); // Set the initial value
  const [activeDropdown, setActiveDropdown] = useState(null);
  const userInfo = useSelector(state => state.users.users);
  const [loading, setLoading] = useState(false);
  const [atLeastOneSelected, setAtLeastOneSelected] = useState(false);

  const [product, setProduct] = useState([]);

  const categoryNames = product.map(product => product.category_name);

  console.log('ssssss====', categoryNames);

  console.log('product', product);

  useEffect(() => {
    const productData = () => {
      userGetInventory(userInfo.token.access)
        .then(categoryData => {
          console.log('Category Datassssssssssssss:', categoryData);

          console.log('nnnnnnn', categoryData.data[0].category_name);
          const responseData = categoryData?.data;
          setProduct(responseData);
        })
        .catch(error => {
          console.log('Error fetching category data:', error);
        });
    };
    productData();
  }, []);

  useEffect(() => {
    const sortFilter = () => {
      setLoading(true);
      const filters = {
        productStatus: saleprice,
        brandName: purchaseprice,
        topSelling: category,
      };

      console.log('Filters:', filters);
      setLoading(true);

      userSortFilter(userInfo.token.access, filters)
        .then(response => {
          console.log('Successeeeeeeeeeeeeeeeeeeeee:', response);
          setFilteredData(response.data);
        })
        .catch(error => {
          console.log('Error:', error);
        })
        .finally(() => {
          setLoading(false);
          if (atLeastOneSelected) {
            closeFilterModal();
            setAtLeastOneSelected(false);
          }
        });
    };

    if (atLeastOneSelected) {
      sortFilter();
    }
  }, [atLeastOneSelected, setFilteredData]);

  const onSelectOption = (option, stateSetter, index) => {
    console.log(option, ` ${stateSetter}: ${option}`);
    selectOption(option);
    stateSetter(option);
    setSelectName(option);
    handleDropdown();
    setActiveDropdown(index);
    setAtLeastOneSelected(true);
  };

  const renderDropdown = (title, options, state, stateSetter, index) => (
    console.log('options', options),
    (
      <>
        <Text style={styles.titletxt}>{title}</Text>
        <FilteringDropdown
          key={index}
          placeholderName={'Select Option'}
          options={options}
          onSelect={val => {
            console.log('hgsdhshcsd', val);
            onSelectOption(val, stateSetter);
          }}
          disabled={activeDropdown !== null && activeDropdown !== index}
        />
      </>
    )
  );

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
              {renderDropdown(
                'Product Status',
                ['Red', 'Green', 'Yellow'],
                saleprice,
                setSaleprice,
                0,
              )}

              {renderDropdown(
                'Top Selling',
                ['Top50', 'Top100', 'Top150'],
                purchaseprice,
                setPurchaseprice,
                1,
              )}

              {renderDropdown(
                'Product Category',
                categoryNames,
                category,
                setCategory,
                2,
              )}
            </View>
          </ScrollView>
          {loading && <Indicators />}
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
