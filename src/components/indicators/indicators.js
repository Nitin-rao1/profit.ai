import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {SkypeIndicator, BarIndicator} from 'react-native-indicators';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 0,
  },
  containerBarIndicators: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Make the background transparent
    
  },
  indicatorContainer: {
    width: 100,
    height: 100,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  text: {
    color: 'white',
    fontSize: 15,
    marginBottom: 20,
  },
});

export const Indicators = ({transparent}) => {
  const containerStyle = transparent
    ? styles.container
    : [styles.container, {backgroundColor: 'rgba(0, 0, 0, 0.30)'}];

  return (
    <View style={containerStyle}>
      <View style={styles.indicatorContainer}>
        <SkypeIndicator color="#fff" size={50} animationDuration={1000} />
      </View>
    </View>
  );
};

export const BarIndicators = ({ transparent }) => {
  const containerStyle = transparent
    ? styles.containerBarIndicators
    : [styles.containerBarIndicators, { backgroundColor: 'rgba(0, 0, 0, 0)' }];

  return (
    <View style={containerStyle}>
      <View style={styles.indicatorContainer}>
        <BarIndicator color="#009A00" size={40} animationDuration={1000} />
      </View>
    </View>
  );
};


