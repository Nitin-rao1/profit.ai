//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/colors';

// create a component
const OnbordingItem = ({item}) => {
    const {width} = useWindowDimensions();
    return (
        <View style={[styles.container, {width}]}>
          <View>
           <Image style={[styles.image, {width, resizeMode:'contain'}]} source={item.image}/>
           </View>
            <View style={{flex:0.45,bottom:scale(80)}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 0.55,
        justifyContent:'center',
    },
    title:{
        fontWeight: '400',
        fontSize: scale(20),
        marginBottom: scale(10),
        color:Colors.black,
        textAlign:'center',
    },
    description:{
        fontWeight:'400',
        lineHeight:scale(20),
        fontSize:scale(12),
        textAlign:'center',
        color:Colors.black,
        marginHorizontal:scale(20),
    }
});

//make this component available to the app
export default OnbordingItem;
