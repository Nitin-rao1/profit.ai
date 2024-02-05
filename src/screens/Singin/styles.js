import {StyleSheet} from 'react-native';
import {
  STANDARD_FLEX,
  FONT_SIZE_MD,
  POPPINS_BOLD,
  SCREEN_WIDTH,
  STANDARD_SPACING,
  FONT_SIZE_XS,
  POPPINS_MEDIUM,
  FONT_SIZE_SM,
  FONT_SIZE_XXS,
  POPPINS_SEMIBOLD,
} from '../../constants/constants';
import {scale} from 'react-native-size-matters';
import Colors from '../../constants/colors';
import colors from '../../constants/colors';

export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    backgroundColor: Colors.white,
  },
  imgView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.71,
  },
  imageSize: {
    width: scale(255),
    height: scale(150),
    resizeMode: 'contain',
  },
  Signtxt: {
    textAlign: 'center',
    fontFamily: POPPINS_BOLD,
    fontSize: FONT_SIZE_MD,
    fontWeight: '700',
    color: Colors.black,
    marginVertical: scale(10),
  },
  maintitleview:{
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  txtstyle: {
    fontWeight: '700',
    fontSize: FONT_SIZE_XXS,
    fontFamily: POPPINS_BOLD,
    color: Colors.black,
    textAlign: 'center',
    lineHeight: scale(16),
  },
  textContainerStyle: {
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    borderRadius: scale(8),
    fontFamily: POPPINS_SEMIBOLD,

  },
  containerStyle: {
    borderRadius: scale(8),
    padding: scale(2),
    backgroundColor: '#F4F5F7',
    height: scale(65),
    width: '82%',
  },
  countryPickerButtonStyle: {
    borderRadius: scale(8),
    // backgroundColor: '#F4F5F7',
  },
  textInputStyle: {
    backgroundColor: colors.textcolor,
    backgroundColor: '#F4F5F7',
    textAlign: 'left',
    alignSelf: 'center',
    marginVertical: scale(-10),
    fontSize: scale(14),
    fontFamily: POPPINS_SEMIBOLD,
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  codeTextStyle: {
    // backgroundColor: 'red',
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    fontSize: scale(15),
    fontWeight: '500',
    fontFamily: POPPINS_SEMIBOLD,
    textAlignVertical: 'center',
  },
  phoneInputTitle: {
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    paddingLeft: STANDARD_SPACING * 8,
    marginTop: STANDARD_SPACING * 4,
    marginBottom: STANDARD_SPACING * 1,
  },
  phoneInputTitletxt: {
    fontWeight: '700',
    fontSize: FONT_SIZE_XS,
    fontFamily: POPPINS_BOLD,
    color: Colors.black,
    textAlign: 'center',
    // lineHeight: scale(18),
  },
  phoneInputView: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: scale(11),
    // marginVertical: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH * 1,
  },
  buttonstyle: {
    width: SCREEN_WIDTH * 0.8,
    alignSelf: 'center',
    marginVertical: STANDARD_SPACING * 5,
  },
  termsContainer: {
    margin: scale(15),
    marginTop: scale(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendTxt: {
    fontWeight: '700',
    // fontSize: scale(11),
    fontSize: FONT_SIZE_XS,
    fontFamily: POPPINS_BOLD,
    color: colors.textcolor,
    textAlign: 'center',
    lineHeight:scale(20)
  },
});
