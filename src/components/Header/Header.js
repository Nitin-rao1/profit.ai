import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Badge, Surface, Title} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {
  FONT_SIZE_LG,
  FONT_SIZE_MD,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_SEMIBOLD,
  STANDARD_FLEX,
} from '../../constants/constants';
import colors from '../../constants/colors';
import Icons from '../Icons/Icons';

const IconSize = 24;

const Header = ({
  style,
  menu,
  back,
  title,
  right,
  onRightPress,
  optionalBtn,
  optionalBtnPress,
  rightComponent,
  headerBg,
  iconColor,
  Textcolor,
  titleAlight,
  optionalBadge,
  onClickBack,
  goBack,
  isdelete,
  isdeletePress,
}) => {
  const navigation = useNavigation();
  const LeftView = () => (
    <View style={styles.LeftView}>
      {menu && (
        <TouchableOpacity onPress={() => navigation.openDrawe()}>
          <Feather name="menu" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
      {back && (
        <TouchableOpacity
        style={styles.backstyl}
          onPress={() => {
            if (goBack) {
              onClickBack();
            } else {
              navigation.goBack();
            }
          }}>
          <Feather name="chevron-left" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
  const RightView = () =>
    rightComponent ? (
      rightComponent
    ) : (
      <View style={[styles.view, styles.rightView]}>
        {optionalBtn && (
          <TouchableOpacity style={styles.rowView} onPress={optionalBtnPress}>
            <Feather name={optionalBtn} size={IconSize} color={iconColor} />
            {optionalBadge && (
              <Badge style={{position: 'absolute', top: -5, right: -10}}>
                {optionalBadge}
              </Badge>
            )}
          </TouchableOpacity>
        )}
        {right && (
          <TouchableOpacity onPress={onRightPress}>
            <Feather name={right} size={IconSize} color={iconColor} />
          </TouchableOpacity>
        )}
        {isdelete && (
          <TouchableOpacity style={styles.isdeletestyl} onPress={isdeletePress}>
            {/* <MaterialIcons name={right} size={IconSize} color={iconColor} /> */}
            <Icons
              iconType={'MaterialIcons'}
              name={'delete'}
              size={IconSize}
              color={colors.error}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  const TitleView = () => (
    <View style={styles.titleView}>
      <Title
        style={{
          color: Textcolor,
          textAlign: titleAlight,
          fontSize: scale(16),
          fontWeight: '500',
          fontFamily: POPPINS_MEDIUM,
          textTransform: 'capitalize',
        }}>
        {title}
      </Title>
    </View>
  );
  return (
    <Surface style={[styles.header, style, {backgroundColor: headerBg}]}>
      <LeftView />
      <TitleView />
      <RightView />
    </Surface>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: scale(50),
    elevation: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.black,
  },
  LeftView: {
    marginHorizontal: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: Colors.white,
    // height: scale(35),
    // width: scale(35),
    // borderRadius: scale(10),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    elevation: 2,
  },
  backstyl:{
    backgroundColor: Colors.white,
    height: scale(35),
    width: scale(35),
    borderRadius: scale(10),
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    marginHorizontal: scale(16),
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleView: {
    flex: STANDARD_FLEX,
  },
  rightView: {
    justifyContent: 'flex-end',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  isdeletestyl: {
    backgroundColor: colors.white,
    width: scale(35),
    height: scale(35),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    elevation:2,
  },
});
