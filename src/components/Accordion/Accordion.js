// Accordion.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {POPPINS_MEDIUM, SCREEN_WIDTH} from '../../constants/constants';
import Icons from '../Icons/Icons';
import colors from '../../constants/colors';
import {scale} from 'react-native-size-matters';

const Accordion = ({title, isSelected, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.header, isSelected && styles.selectedHeader]}>
        <Text
          style={[
            styles.title,
            isSelected && {color: colors.white}, // Change text color to white when selected
          ]}>
          {title}
        </Text>
        <Icons
          name={'chevron-right'}
          iconType={'Entypo'}
          size={25}
          color={isSelected ? colors.white : colors.dividerColor}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.95,
    margin: scale(5),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: scale(15),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(20),
    backgroundColor: colors.white,
  },
  selectedHeader: {
    backgroundColor: colors.green, // Highlight color
  },
  title: {
    fontSize: scale(16),
    fontFamily: POPPINS_MEDIUM,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default Accordion;
