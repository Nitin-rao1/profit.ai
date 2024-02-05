import {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icons from '../Icons/Icons';


// Functional component
const Button = ({label,labelStyle, labelColor, backgroundColor, onPress, iconname, iconType, size, iconstyle, color, borderWidth, borderColor, disabled,style}) => {
  return (
    <TouchableOpacity
      style={[{...styles.button, ...style}, {backgroundColor: backgroundColor, borderWidth: borderWidth, borderColor:borderColor,}]}
      onPress={onPress} disabled={disabled}>
        <Icons name={iconname} iconType={iconType} size={size} color={color} style={iconstyle} />
        <Text style={[{ ...styles.label, ...labelStyle }, { color: labelColor }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
 
// Exporting
export default memo(Button);
