//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../../constants/colors';
import Header from '../../components/Header/Header';
import {
  FONT_SIZE_SM,
  SCREEN_WIDTH,
  STANDARD_BUTTON_HEIGHT,
  STANDARD_SPACING,
} from '../../constants/constants';
import {scale} from 'react-native-size-matters';
import {Images} from '../../constants/images';
import Button from '../../components/Button';

// create a component
const Verifications = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header back iconColor={Colors.C7C7C} />
      <View style={styles.imgView}>
        <Image style={styles.imageSize} source={Images.verificationDone} />
      </View>
      <View style={styles.buttonstyle}>
        <Button
          label={'VERIFICATION DONE'}
          labelColor={Colors.white}
          style={{borderRadius: STANDARD_BUTTON_HEIGHT * 0.5}}
          backgroundColor={Colors.primary}
          onPress={() => {navigation.navigate('Gstscreen',
           { destination: 'Business' }
           )}}
        />
      </View>
      <View style={styles.dummywrapper}>
        <Text style={styles.dummytext}>
          Lorem Ipsum is simply dummy text of the AN {'\n'} Lorem Ipsum is
          simply
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imgView: {
    // flex: 0.67,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.62,
    marginBottom: scale(160),
  },
  imageSize: {
    width: scale(231),
    height: scale(231),
    resizeMode: 'contain',
  },
  buttonstyle: {
    width: SCREEN_WIDTH * 0.7,
    alignSelf: 'center',
    marginBottom: scale(20),
    // marginVertical: STANDARD_SPACING * 5,
    // position: 'absolute',
    // bottom: scale(70),
  },
  dummywrapper: {
    alignItems: 'center',
  },
  dummytext: {
    textAlign: 'center',
    fontSize: FONT_SIZE_SM,
    fontWeight: '700',
    color: Colors.black,
  },
});

//make this component available to the app
export default Verifications;
