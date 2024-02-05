import {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

// Functional component
const Link = ({label, labelColor, onPress}) => {
  // Returning
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.style, {color: labelColor}]}>{label}</Text>
    </TouchableOpacity>
  );
};

// Exporting
export default memo(Link);
