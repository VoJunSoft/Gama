import React, { useState, useEffect } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  Image,
  Alert,
  Pressable,
  SafeAreaView
} from 'react-native';
import {Divider, Icon, Tooltip, Tile} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropShadow from "react-native-drop-shadow";

const gamaConsole = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getData()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
 
  },[navigation])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfoKey')
      if(value !== null)
        setUserInfo(JSON.parse(value))
    } catch(e) {
      // error reading value
    }
  }

  console.log('Current Score is: ', userInfo.currentScore)

  return(
    <SafeAreaView style={styles.container}>

      <DropShadow style={styles.dropShadow}>
        <Pressable 
            onPressIn={() => navigation.navigate('LevelOne')} style={styles.imgBlock}>
          <Text style={styles.txtBox}> 
            <Icon
              name='unlock'
              type='font-awesome'
              size={25}
              color='white'/> {'\n'} Select the matching card!</Text>
          <Image style={styles.img} source={require("../assets/console/Cards.png")} /> 
          </Pressable>
      </DropShadow>
            
        {userInfo.currentScore >= 30 ?
         <DropShadow style={styles.dropShadow}>
         <Pressable 
             onPressIn={() => navigation.navigate('LevelTwo')} style={styles.imgBlock}>
           <Image style={styles.img} source={require("../assets/console/spaceship1.png")} /> 
           <Text style={styles.txtBox}> 
             <Icon
               name='unlock'
               type='font-awesome'
               size={25}
               color='white'/> {'\n'} Level two is unlocked</Text>
           </Pressable>
        </DropShadow>
        :
        <DropShadow style={styles.dropShadow}>
        <Pressable 
            onPressOut={() => Alert.alert('Collect 30 or more in level one to unlock!')} style={styles.imgBlockLocked}>
          <Image style={styles.img} source={require("../assets/console/spaceship1.png")} /> 
          <Text style={styles.txtBoxLocked}> 
            <Icon
              name='lock'
              type='font-awesome'
              size={25}
              color='white'/> {'\n'} Collect 30 points in level one to unlock. </Text>
          </Pressable>
      </DropShadow>      
      }

      { userInfo.currentScore >= 150 ?
        <DropShadow style={styles.dropShadow}>
        <Pressable 
            onPressIn={() => navigation.navigate('Spaceship')} style={styles.imgBlock}>
          <Text style={styles.txtBox}> 
            <Icon
              name='unlock'
              type='font-awesome'
              size={25}
              color='white'/> {'\n'} Moon mission is unlocked</Text>
          <Image style={styles.img} source={require("../assets/console/moon.png")} /> 
          </Pressable>
        </DropShadow>
       :
        <DropShadow style={styles.dropShadow}>
        <Pressable 
            onPressOut={() => Alert.alert('collect 150 points to unlock')} style={styles.imgBlockLocked}>
          <Text style={styles.txtBoxLocked}> 
            <Icon
              name='lock'
              type='font-awesome'
              size={25}
              color='white'/> {'\n'} Moon mission </Text>
          <Image style={styles.img} source={require("../assets/console/moon.png")} /> 
          </Pressable>
      </DropShadow>
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop: 0,
      backgroundColor: "#6183B4",
      justifyContent: "center",
    },
    img: {
      height: 180,
      width: '65%',
      resizeMode:'contain'
    },
    imgBlock: {
      flex: -1,
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 15,
      padding: 5,
      backgroundColor: '#2196F3',
      borderWidth: 0,
      borderRadius: 10,
    },
    txtBox: {
      flex:1,
      fontSize: 18,
      backgroundColor:'black',
      padding: 5,
      color: 'white',
      margin:5,
      borderRadius: 10,
      textAlign: 'center',
    },
    imgBlockLocked: {
      flex:-1,
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems:"center",
      margin: 15,
      padding: 5,
      borderRadius: 10,
      borderColor: 'black',
      backgroundColor: 'darkgray',
      opacity: 0.55
    },
    txtBoxLocked: {
      flex:1,
      fontSize: 18,
      backgroundColor:'gray',
      padding: 5,
      color: 'white',
      margin:5,
      borderRadius: 10,
      textAlign: 'center',
    },
    dropShadow: {
      shadowColor: '#171717',
      shadowOffset: {width: -10, height: 12},
      shadowOpacity: 0.5,
      shadowRadius: 2,
    }
  });

export default gamaConsole;