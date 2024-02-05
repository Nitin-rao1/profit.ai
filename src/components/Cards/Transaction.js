import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Badge } from 'react-native-paper';
import { POPPINS_SEMIBOLD, POPPINS_REGULAR, STANDARD_BORDER_RADIUS, SCREEN_WIDTH } from '../../constants/constants';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const Transaction = ({ item, index }) => {
  const navigation = useNavigation();
// const invoiceStatus = 

const transactionsDate = moment(item.updated_at).format('YYYY-MM-DD');
const transactionsStatus =
  item.status == 1
    ? colors.error
    : item.status == 2
    ? colors.yellow
    : colors.green;
  return (
    <TouchableOpacity key={`${index}+ID`} style={styles.TableWrapper} onPress={() => navigation.navigate('InvoiceDetails', {item:item})}>
      <View style={styles.Table_Tittle}>
        <Text style={styles.Table_Bold_Text}>{item.customer.customer_name}({item.customer.phone_number})</Text>
        <Text style={styles.Table_Bold_Text}>{item.grand_total}</Text>
      </View>
      <View style={styles.TableDivider} />
      <View style={styles.Table_Container}>
        <View style={styles.Table_styles}>
          <Text style={styles.Table_Normal_Text}>Transaction ID</Text>
          <Text style={styles.Table_Bold_Text}># {item.invoice_counter}</Text>
        </View>
        <View style={styles.Table_styles}>
          <Text style={styles.Table_Normal_Text}>Issued Date</Text>
          <Text style={styles.Table_Bold_Text}>{transactionsDate}</Text>
        </View>
        <View style={styles.Table_styles}>
          <Text style={styles.Table_Normal_Text}>Status</Text>
          <View style={styles.TableStatus}>
            {/* <View style={styles.bagestyle} /> */}
            <Badge style={{...styles.bagestyle, ...{backgroundColor: transactionsStatus},}} size={scale(12)} />
            {/* <Text style={styles.Table_Bold_Text}> {item.status}</Text> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TableWrapper: {
    alignSelf:'center',
    width:SCREEN_WIDTH * 0.95,
    marginVertical: scale(5),
    borderWidth: scale(0.8),
    borderColor: colors.dividerColor,
    borderRadius: STANDARD_BORDER_RADIUS,
    paddingHorizontal: scale(5),
    padding: scale(5),
  },
  Table_Tittle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: scale(5),
    padding: scale(5),
  },
  Table_Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: scale(5),
    padding: scale(5),
  },
  Table_styles: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: scale(40),
  },
  Table_Bold_Text: {
    fontSize: scale(12),
    fontFamily: POPPINS_SEMIBOLD,
    fontWeight: '700',
    color: colors.darkblack,
  },
  Table_Normal_Text: {
    fontSize: scale(12),
    fontFamily: POPPINS_REGULAR,
    fontWeight: '400',
    color: colors.black,
  },
  TableDivider: {
    borderBottomWidth: scale(1),
    borderBottomColor: '#7C7C7C',
    width: 'auto',
  },
  TableStatus: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // right: scale(5),
    alignSelf: 'center',
  },
  bagestyle: {
    backgroundColor: colors.green,
    alignSelf: 'center',
  },
});

export default Transaction;
