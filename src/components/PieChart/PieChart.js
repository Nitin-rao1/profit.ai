// PieChart.js
import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';
import { Circle, G, Path, Svg } from 'react-native-svg';

const PieChart = ({ data }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(360, { duration: 2000, easing: Easing.ease });
  }, [data]);

  const slices = data.map((slice, index) => {
    const startAngle = (index / data.length) * 360;
    const endAngle = ((index + 1) / data.length) * 360;

    const path = `
      M 50 50
      L 50 0
      A 50 50 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${Math.cos((startAngle + endAngle) * 0.5 * (Math.PI / 180)) * 50 + 50} ${Math.sin((startAngle + endAngle) * 0.5 * (Math.PI / 180)) * 50 + 50}
      Z
    `;

    return (
      <G key={index} transform={`rotate(${startAngle} 50 50)`}>
        <Path d={path} fill={slice.color} />
      </G>
    );
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View>
     <Svg width={scale(150)} height={scale(150)} viewBox="0 0 100 100">
        <G>
          {slices}
          <G style={animatedStyle}>
            <Circle cx="50" cy="50" r="40" fill="#fff" />
          </G>
        </G>
      </Svg>
    </View>
  );
};

export default PieChart;
