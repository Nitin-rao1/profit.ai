import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from './colors';

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex: {flex: 1},
  height1: {
    height: hp('1.3%'),
  },
  height2: {
    height: hp('2%'),
  },
  height3: {
    height: hp('3%'),
  },
  height16: {
    height: hp('16%'),
  },
  height10: {
    height: hp('10%'),
  },
  height20: {
    height: hp('20%'),
  },
  height35: {
    height: hp('35%'),
  },
  height90: {
    height: hp('90%'),
  },
  height87: {
    height: hp('87%'),
  },
  width0: {width: wp('0%')},
  width27: {width: wp('27%')},
  width30: {width: wp('30%')},
  width35: {width: wp('35%')},
  width37: {width: wp('37%')},
  width40: {width: wp('40%')},
  width43: {width: wp('43%')},
  width42: {width: wp('42%')},
  width41: {width: wp('41%')},
  width45: {width: wp('45%')},
  width50: {width: wp('50%')},
  width55: {width: wp('55%')},
  width94: {
    width: wp('94%'),
  },
  width92: {
    width: wp('92%'),
  },
  width95: {
    width: wp('95%'),
  },
  width90: {
    width: wp('90%'),
  },
  width80: {
    width: wp('80%'),
  },
  width85: {width: wp('85%')},
  width70: {width: wp('70%')},
  width74: {width: wp('74%')},
  width11: {width: wp('11%')},
  marginTop1: {
    marginTop: hp('1%'),
  },
  margin0: {margin: wp('0')},
  margin1: {margin: wp('1')},
  margin2: {margin: wp('2')},
  marginTop2: {
    marginTop: hp('2%'),
  },
  marginTop3: {
    marginTop: hp('3%'),
  },
  marginTop4: {
    marginTop: hp('4%'),
  },
  marginTop5: {
    marginTop: hp('5%'),
  },
  marginTop6: {
    marginTop: hp('6%'),
  },
  marginTop10: {marginTop: hp('10')},
  marginTop20: {marginTop: hp('20')},
  marginBottom20: {marginBottom: hp('20')},
  marginBottom5: {marginBottom: hp('5')},
  marginBottom1: {marginBottom: hp('1')},
  marginBottom2: {marginBottom: hp('2')},
  marginBottom3: {marginBottom: hp('3')},
  marginBottom4: {marginBottom: hp('4')},
  marginBottom7: {marginBottom: hp('7')},
  marginLeft3: {marginLeft: wp('3%')},
  marginLeft1: {marginLeft: wp('1%')},
  marginLeft2: {marginLeft: wp('2%')},
  marginRight1: {marginRight: wp('1%')},
  marginRight2: {marginRight: wp('2%')},
  marginRight3: {marginRight: wp('3%')},
  marginLeft5: {marginLeft: wp('5%')},
  marginLeft7: {marginLeft: wp('7%')},
  marginLeft10: {marginLeft: wp('10%')},
  marginEnd2: {marginEnd: wp('2')},
  textcenter: {textAlign: 'center'},
  paddingBottom2: {paddingBottom: hp('2')},
  paddingTop0: {paddingTop: hp('0')},
  top1: {
    top: Platform.OS == 'ios' ? hp('1') : hp('0'),
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  alignItemCenter: {alignItems: 'center'},
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  flexRow: {
    flexDirection: 'row',
  },
  backgroundColorECECEC: {backgroundColor: '#ECECEC'},

  headerBottomTxt: {alignSelf: 'center', width: wp('90%'), fontSize: 20},
  bottom1: {bottom: hp('1%')},
  error: {
    color: colors.error,
    fontSize: hp('1%'),
    fontFamily: 'Roboto-Medium',
    // textTransform: 'capitalize',
  },
  font500: {
    fontWeight: '500',
  },
  font700: {
    fontWeight: '700',
  },
  dangerColor: {
    color: 'red',
  },
  row: {
    flexDirection: 'row',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  left1: {
    left: wp('1%'),
  },
  left42: {
    left: wp('42%'),
  },
  right42: {
    right: wp('42%'),
  },
  viewBorder: {
    backgroundColor: '#fff',
    borderColor: colors.lightgray,
    borderWidth: 1,
    borderColor: colors.process,
    borderRadius: 5,
    width: wp('90%'),
    alignSelf: 'center',
    paddingBottom: hp('2'),
  },
  fontSize2: {
    fontSize: hp('2%'),
  },
  fontSize1: {
    fontSize: hp('1%'),
  },
  fontSize1dot6: {fontSize: hp('1.6')},
  fontSizeH2: hp('2%'),
  borderBlack: {
    borderColor: 'black',
  },
  submitBtnView: {flex: 1, justifyContent: 'flex-end', marginBottom: hp('2')},
  submitBtnView1: {justifyContent: 'flex-end', marginBottom: hp('2')},
  submitBtnColor: {
    backgroundColor: colors.gray,
    marginTop: hp('1%'),
  },

  headingTxt: {
    fontWeight: '700',
    fontSize: hp('2%'),
    paddingTop: hp('1'),
    paddingBottom: hp('0.7'),
    alignSelf: 'center',
    width: wp('95%'),
  },
  heading: {
    fontWeight: '400',
    fontSize: hp('2.2%'),
    // paddingTop: hp('2'),
    paddingBottom: hp('1.5'),
    marginTop: hp('2'),
    alignSelf: 'center',
    width: wp('90%'),
    fontFamily: 'Nunito-SemiBold',
  },

  headingTxt1: val => ({
    fontWeight: '700',
    fontSize: hp('1.8%'),
    paddingTop: hp('2'),
    alignSelf: 'center',
    width: wp(val),
    color: colors.themeColor,
  }),
  viewgap: {alignSelf: 'center', marginBottom: hp('3%')},
  flexWraps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  textInputStyle: {
    // fontSize: 16,
    fontSize: hp('1.95%'),
    left: wp('2'),
    // fontWeight: '500',
    fontFamily: 'Nunito-Medium',
    color: colors.black,
    width: wp('85%'),
    // height: hp('6'),
  },
  lableTxt: {
    alignSelf: 'center',
    color: colors.primary,
    // fontWeight: '500',
    fontFamily: 'Nunito-SemiBold',
    // fontSize: 16,
    fontSize: hp('1.95%'),
    marginBottom: hp('0.5%'),
    marginTop: hp('1%'),
    width: wp('90%'),
    // alignSelf: 'center',
    textTransform: 'none',
  },

  txtStyle: val => ({
    fontSize: hp('1.95%'),
    fontFamily: 'Nunito-Medium',
    padding: hp('1.7'),
    alignSelf: 'flex-start',
    color: val ? colors.black : colors.inputBorderColor,
  }),
  boxTitle: {
    fontSize: hp('2.7'),
    // fontSize:22,
    textAlign: 'center',
    color: colors.primary,
    alignSelf: 'center',
    marginBottom: hp('2'),
  },
});

export default mainStyles;
