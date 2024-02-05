import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Badge, Surface, Title} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/colors';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {
  FONT_SIZE_LG,
  FONT_SIZE_MD,
  POPPINS_BOLD,
  POPPINS_SEMIBOLD,
  STANDARD_FLEX,
} from '../../constants/constants';
import colors from '../../constants/colors';

const IconSize = 24;

const SubHeader = ({
  style,
  menu,
  back,
  title,
  right,
  onRightPress,
  optionalBtn,
  optionalBtnPress,
  rightComponent,
  rightSide,
  onRightSidePress,
  headerBg,
  iconColor,
  Textcolor,
  titleAlight,
  margintitleLeft,
  optionalBadge,
  leftview,
  searchIcon,
  sortingIcon,
  filterIcon,
  calenderIcon,
}) => {
  const navigation = useNavigation();
  const LeftView = () => {
    return (
      <>
        {back && (
          <View style={[styles.LeftView, ...(leftview || [])]}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Feather name="chevron-left" size={IconSize} color={iconColor} />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  const RightView = () => (
    <View style={[styles.view, styles.rightView]}>
      {searchIcon && (
        <TouchableOpacity style={styles.rowView} onPress={optionalBtnPress}>
          <Feather name={'search'} size={IconSize} color={colors.primary} />
        </TouchableOpacity>
      )}
      {filterIcon && (
        <TouchableOpacity
          onPress={onRightPress}
          style={{marginHorizontal: scale(1)}}>
          <FontAwesome6 name={'sliders'} size={scale(18)} color={iconColor} />
        </TouchableOpacity>
      )}
      {sortingIcon && (
        <TouchableOpacity onPress={onRightSidePress} style={{}}>
          {/* Adjust the icon and color based on your requirement */}
          <MaterialCommunityIcons
            name={'sort-variant'}
            size={scale(25)}
            color={iconColor}
          />
        </TouchableOpacity>
      )}

      {calenderIcon && (
        <TouchableOpacity
          onPress={onRightPress}
          style={{marginHorizontal: scale(1)}}>
          <FontAwesome6 name={'calendar'} size={scale(18)} color={iconColor} />
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
          fontSize: FONT_SIZE_MD,
          fontWeight: '700',
          fontFamily: POPPINS_BOLD,
          textTransform: 'capitalize',
          marginLeft: margintitleLeft,
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

export default SubHeader;

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
    backgroundColor: Colors.white,
    height: scale(35),
    width: scale(35),
    borderRadius: scale(10),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    elevation: 2,
  },
  view: {
    marginHorizontal: scale(10),
    gap: scale(5),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth:2,
    // backgroundColor:'red'
  },
  titleView: {
    flex: STANDARD_FLEX,
  },
  rightView: {
    // justifyContent: 'flex-end',
  },
  rowView: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // marginRight: 10,
  },
});
