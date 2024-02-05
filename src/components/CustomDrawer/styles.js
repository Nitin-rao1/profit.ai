import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  FONT_SIZE_XXS,
  STANDARD_FLEX,
  FONT_SIZE_MD,
  POPPINS_SEMIBOLD,
} from '../../constants/constants';
import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    // backgroundColor: '#D6EAF8',
    backgroundColor: colors.white
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: scale(150),
  },
  logoWrapper: {
    marginHorizontal: STANDARD_SPACING * 2,
    padding: STANDARD_SPACING,
    borderRadius: STANDARD_BORDER_RADIUS * 12,
    width: scale(100),
    aspectRatio: 1,
  },
  textContainer: {
    marginLeft: STANDARD_SPACING,
    alignItems: 'center',
  },
  brandName: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    fontWeight: '600',
  },
  brandSlogan: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE_SM,
    fontWeight: '600',
  },
  logo: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    borderRadius: STANDARD_BORDER_RADIUS * 9,
    resizeMode: 'contain',
    borderWidth: scale(2),
    borderColor: colors.gray,
  },
  itemContainer: {
    flex: 1,
    height: scale(480),
    backgroundColor: '#fff',
    top: scale(20),
    paddingTop: 10,
  },
  bottomContainer: {
    padding: scale(10),
    position: 'absolute',
    bottom: scale(20),
    width: '100%',
  },
  logoutButton: {
    padding: scale(8),
    borderRadius: 10,
    // backgroundColor: '#FFFFFF',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  logoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    marginLeft: scale(15),
  },
  logoutText: {
    color: '#FF0000',
    fontFamily: 'Poppins-Regular',
    fontSize: scale(15),
    marginLeft: 10,
  },
});
