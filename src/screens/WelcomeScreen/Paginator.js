import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/constants';
import {scale} from 'react-native-size-matters';

const Paginator = ({data, scrollX}) => {
  const width = useWindowDimensions().width;

  return (
    <View style={styles.mainWrapper}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 30, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
    mainWrapper: {
    flexDirection: 'row',
    height: SCREEN_HEIGHT * 0.02,
    alignItems: 'center',
    alignSelf: 'center',
    bottom: scale(20),
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1976D2',
    marginHorizontal: 8,
  },
});

export default Paginator;
