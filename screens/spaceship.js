import React, { useState, useEffect } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ImageBackground,
  Image,
} from 'react-native';

const spaceShip = ({navigation}) => {
  //const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <ImageBackground source={require("../assets/gallary/GamaBG.png")} style={styles.cover}> 
        <View style={styles.imgBlock}>
          <Text style={styles.txtBox}>
          Save your ticket for the moon mission on 21/12 </Text>
          <Image style={styles.ticket} source={require("../assets/gallary/ticket2.png")} /> 
        </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      marginTop: 0
    },
    cover: {
        flex: 1,
        justifyContent:'center',
        resizeMode:'contain'
    },
    imgBlock: {
      justifyContent:'center',
      alignItems:'center'
    },
    txtBox: {
        fontSize: 35,
        padding: 10,
        color: 'black',
        textAlign: 'center',
        width:'70%',
        borderRadius: 150,
        borderWidth:3,
        borderColor: 'black'
      },
      ticket: {
        height: 200,
        width: '70%'
      }
  });

export default spaceShip;