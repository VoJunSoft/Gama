import React, { useState, useEffect } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  TextInput, 
  Button, 
  ScrollView, 
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import admob, { MaxAdContentRating, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import DropShadow from "react-native-drop-shadow";

const profile = ({navigation}) => {
  //const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-4556757412228601/4443801647';
  const adUnitId = 'ca-app-pub-4556757412228601/4443801647';
  
  //Optional code
    // admob()
    // .setRequestConfiguration({
    //   maxAdContentRating: MaxAdContentRating.PG,
    //   tagForChildDirectedTreatment: true,
    //   tagForUnderAgeOfConsent: true,
    // })
    // .then(() => {
    //   // Request config successfully set!
    // })
    
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

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('userInfoKey', jsonValue)
    } catch (e) {
      //error storing data
      setUserInfo({
        userName: 'Anonymous',
        hiScore: 0,
        currentScore: 0,
        level: 1
      })
      storeData(userInfo)
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfoKey')
      if(value !== null){
        setUserInfo(JSON.parse(value))
      }else{
        setUserInfo({
          userName: 'Anonymous',
          hiScore: 0,
          currentScore: 0,
          level: 1
        })
        storeData(userInfo)
      }
    } catch(e) {
      // error reading value
      setUserInfo({
        userName: 'Anonymous',
        hiScore: 0,
        currentScore: 0,
        level: 1
      })
    }
  }

  const [isEditable, setIsEditable] = useState(false);
  const [editSaveTxt, setEditSaveText] = useState('Edit name');

  const handleUserName = (txt) => {
    setUserInfo(obj => {
      return { ...obj, userName: txt }
    })
  }
  
  const handleEditSave = () => {
    if(userInfo.userName == '')
      return Alert.alert('enter name please')
   
    setIsEditable(!isEditable)

    if(!isEditable)
      setEditSaveText('Save name')
    else
      setEditSaveText('Edit name')
     
    //save username to AsyncStorage
    storeData(userInfo)
  }
 
  //handle level 1 and 2
  const setLevelDifficult =  () => {
     setUserInfo(obj => {
      return { ...obj, level: 2 }
    })
    //save level to AsyncStorage
    storeData(userInfo)
  }

  const setLevelEasy =  () => {
     setUserInfo(obj => {
      return { ...obj, level: 1 }
    })
    //save level to AsyncStorage
    storeData(userInfo)
  }

  const storeDataInsure = () => {
     storeData(userInfo)
  }

  //TODO: onloading or foucs ACTIVATE
  const getDataInsure = () => {
     //getData()
 }

  return(
    <ScrollView style={styles.container}>
      <Animatable.View
          // onAnimationBiggen={() => getDataInsure()}
          onAnimationEnd={() => storeDataInsure()}
          easing="ease-in-out-quad"
          animation="slideInDown"
          iterationCount={1}
          duration={1000}
          direction="normal">
      <ImageBackground source={require("../assets/gallary/header.png")} style={styles.cover}>

      </ImageBackground>

      </Animatable.View>
      {isEditable ?
        <TextInput
        value={userInfo.userName}
        style={styles.userName}
        onChangeText={text=> handleUserName(text)}
        maxLength={15}
        selectionColor="orange"
        placeholderTextColor="#42435b"
        placeholder="name..."
        underlineColorAndroid='transparent'
        autoFocus = {true}
        />
        :
        <Text style={styles.title}>{userInfo.userName}</Text>
      }
      
    <View style={styles.editBtn}>
        <Button
          title={editSaveTxt}
          color="#007AFF"
          onPress={handleEditSave}
        />
    </View>
     
    <DropShadow style={styles.dropShadow}>
    <View style={styles.row}>
      <Text style={styles.title}>Highest score</Text>
      <Text style={styles.info}>999</Text>
    </View>
    </DropShadow>

    <DropShadow style={styles.dropShadow}>
      <View style={styles.row}>
        <Text style={styles.title}>Your score</Text>
        <Text style={{
          color : userInfo.currentScore >= 0 ? "#18A411" : "darkred",
          fontFamily:'Cheeky Bite Shine - AND',
          fontSize: 25,
          fontWeight: 'bold',
          padding: 5,
          marginTop:5,
          textAlign: 'center'
          }}>
            {userInfo.currentScore}
        </Text>
      </View>
    </DropShadow>

    <DropShadow style={styles.dropShadow}>
      <View style={styles.row}>
        <Text style={styles.title}>Level</Text>
        <Text style={styles.title}>{userInfo.currentScore < 30 ? 1 : 2 }</Text>
      </View>
    </DropShadow>

    <View style={styles.playBtn}>
        <Button
          title="Play Console"
          color="#007AFF"
          onPress={() => navigation.navigate('Console')}
        />
    </View>

    <BannerAd
          //unitId={TestIds.BANNER}
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop: 0,
      backgroundColor: "#6183B4",
      paddingTop: 0
    },
    cover:{
      resizeMode:'contain',
      marginTop: 0,
      height:210,
      width:"100%"
    },
    title: {
      fontFamily:'Cheeky Bite Shine - AND',
      fontSize: 25,
      marginTop:5,
      fontWeight: '100',
      padding: 5,
      textAlign: 'center',
      color:'white'
    },
    userName: {
      fontFamily:'Cheeky Bite Shine - AND',
      fontSize: 25,
      marginTop: 0,
      padding: 7,
      textAlign: 'center',
      color:'black',
      width:'50%',
      alignSelf:'center',
      backgroundColor:'white'
    },
    info: {
      fontFamily:'Cheeky Bite Shine - AND',
      fontSize: 25,
      fontWeight: 'bold',
      padding: 7,
      marginTop:10,
      textAlign: 'center',
      color:'#18A411'
    },
    editBtn: {
      fontFamily:'Cheeky Bite Shine - AND',
      fontSize: 20,
      padding: 5,
      marginTop:10,
      marginBottom: 10,
      textAlign: 'center',
      color:'white',
      alignSelf:'center',
      width:'60%',
      borderRadius:5
    },
    playBtn:{
      alignSelf:'center',
      margin:5,
      padding:15,
      width:'70%',
    },
    row: {
      flex: -1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems:"center",
      margin:10,
      borderWidth: 0,
      backgroundColor: '#145DA0'
    },
    divider: {
      width: '90%',
      marginTop:20,
      backgroundColor:'gray',
      alignSelf:'center',
    },
    ad: {
      alignSelf:'center',
      width: '90%',
      backgroundColor: '#61B1E6',
      height: 50, 
      borderRadius:10,
      marginTop: 10,
    },
    difficult:{
      fontFamily:'Cheeky Bite Shine - AND',
      fontSize: 20,
      padding: 5,
      marginTop:5,
      textAlign: 'center',
      color:'darkred',
      alignSelf:'center',
      borderRadius:5,
      borderWidth:1,
      borderColor:'darkred'
    },
    easy:{
      fontFamily:'Cheeky Bite Shine - AND',
      fontSize: 20,
      padding: 5,
      marginRight: 10,
      marginTop:5,
      textAlign: 'center',
      color:'darkgreen',
      borderRadius:5,
      borderWidth:1,
      borderColor:'darkgreen'
    },
    dropShadow: {
      shadowColor: '#171717',
      shadowOffset: {width: -5, height: 5},
      shadowOpacity: 0.5,
      shadowRadius: 2,
    }
  });

export default profile;