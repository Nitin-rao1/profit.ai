import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import {
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  STANDARD_BORDER_RADIUS,
  STANDARD_SPACING,
} from '../../constants/constants';
import {scale} from 'react-native-size-matters';
import {Badge} from 'react-native-paper';

const Inventorylist = ({item, onPress, index}) => {
  // console.log('item', item);

  const statusColor =
    item.status == 1 ? 'red' : item.status == 2 ? 'yellow' : 'green';
  return (
    <TouchableOpacity onPress={onPress} key={`${item.id}-${index}`} style={{flex: 1}}>
      <View style={styles.ListWrapper}>
        <View style={styles.tittleContainer}>
          <View>
            <Text style={[styles.boldtxt, {alignSelf: 'flex-start'}]}>
              {item.product_name}
            </Text>
            <Text style={[styles.normaltxt, {alignSelf: 'flex-start'}]}>
              {item.product_type.category_name}
            </Text>
          </View>
          <View>
            <Text style={styles.normaltxt}>Qty</Text>
            <Text style={styles.boldtxt}>{item.remaining_quantity}</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.normaltxt}>Retail price</Text>
            <Text style={styles.boldtxt}>₹{item.sales_price}</Text>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.normaltxt}>Purchase price</Text>
            <Text style={styles.boldtxt}>₹{item.purchase_price}</Text>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.normaltxt}>Status</Text>
            <Badge
              style={[styles.bagestyle, {backgroundColor: statusColor}]}
              size={scale(10)}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ListWrapper: {
    borderWidth: 1,
    borderColor: '#B6B6B6',
    padding: scale(10),
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    marginBottom: scale(10),
    marginLeft: scale(10),
    marginRight: scale(10),
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
    fontFamily: POPPINS_MEDIUM,
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
  bagestyle: {
    backgroundColor: colors.green,
    alignSelf: 'center',
    marginVertical: scale(5),
  },
});

export default Inventorylist;

{
  /* <FlatList
data={data}
renderItem={renderItem}
keyExtractor={item => item.id}
// showsVerticalScrollIndicator={false}
contentContainerStyle={styles.flatListContent}
/> */
}

// const renderItem = ({item}) => (
//     <View style={styles.ListWrapper}>
//       <View style={styles.tittleContainer}>
//         <View>
//           <Text style={[styles.boldtxt, {alignSelf: 'flex-start'}]}>
//             {item.itemName}
//           </Text>
//           <Text style={[styles.normaltxt, {alignSelf: 'flex-start'}]}>
//             {item.itemDescription}
//           </Text>
//         </View>
//         <View>
//           <Text style={styles.normaltxt}>Qty</Text>
//           <Text style={styles.boldtxt}>{item.qty}</Text>
//         </View>
//       </View>

//       <View style={styles.priceContainer}>
//         <View>
//           <Text style={styles.normaltxt}>Sales price</Text>
//           <Text style={styles.boldtxt}>{item.salesPrice}</Text>
//         </View>
//         <View style={{alignSelf: 'center'}}>
//           <Text style={styles.normaltxt}>Purchase price</Text>
//           <Text style={styles.boldtxt}>{item.purchasePrice}</Text>
//         </View>
//         <View style={{alignSelf: 'center'}}>
//           <Text style={styles.normaltxt}>Status</Text>
//           <Badge
//             style={[styles.bagestyle, {backgroundColor: item.statusColor}]}
//             size={scale(10)}
//           />
//         </View>
//       </View>
//     </View>
//   );
