import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_MD,
  STANDARD_BUTTON_HEIGHT,
  POPPINS_BOLD,
  FONT_SIZE_SM,
  POPPINS_SEMIBOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
} from '../../constants/constants';

// Exporting style
export default StyleSheet.create({
  label: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_MD,
    fontWeight:'400',
  },
  button: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: STANDARD_BUTTON_HEIGHT,
    borderRadius: STANDARD_BUTTON_HEIGHT * 0.2,
    paddingHorizontal: scale(15),
  },
});
