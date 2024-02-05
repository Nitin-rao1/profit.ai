import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/colors';
import { POPPINS_REGULAR } from '../../constants/constants';

// create a component
const TextInputComp = ({
  value = '',
  onChangeText,
  placeholder = '',
  keyboardType,
  autoCapitalize,
  onBlur,
  editable,
  secureText = false,
  onPressSecure = () => {},
  inputStyle = {},
  textStyle = {},
  placeholderTextColor = Colors.red,
  error,
  autoFilled,
  maxLength,
  ...props
}) => {
  return (
    <View
      style={[
        styles.inputContainer,
        inputStyle,
        error && { borderColor: 'red', borderWidth: 1 },
        autoFilled && styles.autoFilled,
      ]}
    >
      <TextInput
        style={[
          styles.textInput,
          textStyle,
        ]}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onBlur={onBlur}
        editable={editable}
        maxLength={maxLength}
        // textAlignVertical="center"
        {...props}
      />
      {secureText && (
        <TouchableOpacity onPress={onPressSecure} style={styles.secureButton}>
          <Text style={styles.secureText}>{secureText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  inputContainer: {
    height: scale(45),
    borderRadius: scale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(8),
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#B6B6B6',
    marginBottom: scale(16),
  },
  textInput: {
    flex: 1,
    fontSize: scale(14),
    fontFamily: POPPINS_REGULAR,
    color: Colors.black,
    paddingVertical: 0, 
    top:2,
    textAlignVertical: 'center',
  },
  autoFilled: {
    backgroundColor: Colors.gray,
  },
  secureButton: {
    marginLeft: scale(8),
  },
  secureText: {
    fontSize: scale(14),
    fontFamily: POPPINS_REGULAR,
    color: Colors.black,
  },
});


export default TextInputComp;
