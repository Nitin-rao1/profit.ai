import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';
import { scale } from 'react-native-size-matters';
import { POPPINS_BOLD, POPPINS_SEMIBOLD } from '../../constants/constants';

const GstOption = ({ onOptionSelect }) => {
  const [activeOption, setActiveOption] = useState(null);

  const handleOptionSelect = (option) => {
    setActiveOption(option);
    onOptionSelect(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleOptionSelect('Yes')}
        style={[
          styles.button,
          activeOption === 'Yes' ? styles.activeButton : null,
        ]}>
        <Text style={[styles.label, activeOption === 'Yes' ? styles.activeLabel : null]}>
          Yes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleOptionSelect('No')}
        style={[
          styles.button,
          activeOption === 'No' ? styles.activeButton : null,
        ]}>
        <Text style={[styles.label, activeOption === 'No' ? styles.activeLabel : null]}>
          No
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: scale(150),
    // backgroundColor:'red',
  },
  button: {
    borderRadius: scale(20),
    paddingVertical: scale(10),
    paddingHorizontal: scale(60),
    backgroundColor: colors.white,
    borderWidth: scale(1),
    borderColor: colors.primary,
  },
  label: {
    color: colors.black,
    fontSize: scale(16),
    fontWeight: 'bold',
    fontFamily:POPPINS_SEMIBOLD,
    textTransform:'capitalize',
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  activeLabel: {
    color: colors.white,
    fontSize: scale(16),
    fontWeight: 'bold',
    fontFamily:POPPINS_SEMIBOLD,
    textTransform:'capitalize',
  },
});

export default GstOption;




