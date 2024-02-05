import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  POPPINS_MEDIUM,
  SCREEN_WIDTH,
  STANDARD_BORDER_RADIUS,
  STANDARD_PAYMENT_METHOD_RADIO_WRAPPER_HEIGHT,
} from '../../constants/constants';
import Icons from '../Icons/Icons';
import colors from '../../constants/colors';
import { scale } from 'react-native-size-matters';

const ShortingDropdown = ({
  title,
  options,
  placeholderName,
  backgroundColor,
  labelColor,
  uncheckedRadioBackgroundColor,
  checkedRadioBackgroundColor,
  onSelect
}) => {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(null);
  const [selectName, setSelectName] = useState('');
console.log("options",selectName);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}>
        <Text
          style={[
            styles.title,
            { color: selectName ? colors.black : colors.gray },
          ]}>
          {selectName ? selectName : placeholderName}
        </Text>
        <Icons
          name={expanded ? 'chevron-down' : 'chevron-right'}
          iconType={'Entypo'}
          size={25}
          color={colors.dividerColor}
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.content}>
          <View style={styles.buttonContainer}>
            {options.map((option, index) => 
            {
                const name = option;
              // console.log("option",option);
              return(
              <TouchableOpacity
                key={index}
                style={[
                  styles.radioWrapper,
                  {
                    backgroundColor:
                      active == index
                        ? colors.primary
                        : colors.white,
                    borderColor: colors.primary,
                    borderWidth: active == index ? 0 : 1,
                  },
                ]}
                onPress={() => {
                  setActive(index)
                  setSelectName(name)
                  onSelect({...option, name:name});
                  setExpanded(false); // Close the accordion after selection
                }}>
                <Text
                  style={[
                    styles.paymentMethodLabel,
                    {
                      color:
                        active === index ? colors.white : labelColor,
                    },
                  ]}>
                  {name}
                </Text>
              </TouchableOpacity>
            )})}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.88,
    borderWidth: scale(1),
    borderColor: '#B6B6B6',
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    margin: scale(2),
    marginBottom:scale(15),
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    marginHorizontal: scale(10),
    backgroundColor: colors.white,
  },
  title: {
    fontSize: scale(14),
    fontFamily: POPPINS_MEDIUM,
    color: colors.gray,
  },
  content: {
    padding: scale(10),
    flexDirection: 'column',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  radioWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(12),
    height: scale(30),
    borderRadius: STANDARD_PAYMENT_METHOD_RADIO_WRAPPER_HEIGHT * 0.5,
    marginBottom: scale(10),
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: scale(10),
    // marginTop: scale(10),
  },
  paymentMethodLabel: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: scale(12),
    textAlign: 'center',
    paddingVertical: scale(5),
  },
});

export default ShortingDropdown;
