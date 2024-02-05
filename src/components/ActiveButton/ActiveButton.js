// ActiveButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import colors from '../../constants/colors'; // Import your color definitions
import { POPPINS_MEDIUM, POPPINS_REGULAR, STANDARD_BORDER_RADIUS } from '../../constants/constants';

const ActiveButton = ({ label, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive ? styles.activeButton : null,
      ]}
      onPress={onPress}>
      <Text style={[styles.label, isActive ? styles.activeLabel : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: STANDARD_BORDER_RADIUS * 1.2,
    paddingVertical: scale(6),
    paddingHorizontal: scale(20),
    backgroundColor: colors.white,
    borderWidth: scale(1),
    borderColor: colors.primary,
  },
  label: {
    color: colors.black,
    fontSize: scale(10),
    fontWeight: '500',
    fontFamily:POPPINS_MEDIUM,
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  activeLabel: {
    color: colors.white,
  },
});

export default ActiveButton;
