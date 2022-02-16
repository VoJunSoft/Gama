import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  BackHandler,
  Alert,
  Button
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const settings = () => {

  const handleSignOut =  () => {
    //AsyncStorage.removeItem('userInfoKey')
    AsyncStorage.clear()

    //TODO: remove exitApp()
    //set scoreback to zero or navigate back to profile page
    BackHandler.exitApp()
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert!",
      "Are you sure you want to clean your score and restart the game?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Confirm", onPress: () => handleSignOut() }
      ]
    );

  return(
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Gama: Cards is the 1st App in the Gama Apps series, educational and fun games. </Text>
      </View>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.body}>
        “...it’s just another one of those things I don’t understand: everyone impresses upon you how unique you are, encouraging you to cultivate your individuality while at the same time trying to squish you and everyone else into the same ridiculous mould. It’s an artist’s right to rebel against the world’s stupidity.”
        ― E.A. Bucchianeri, Brushstrokes of a Gadfly,
        </Text>
       
        <Text style={styles.title}>Start Over</Text>
        <Text style={styles.body}>If you click this button you will exit the App and your score will be back to ZERO</Text>
        <View style={styles.editBtn}>
          <Button
            title="Clear your score"
            onPress={() => createTwoButtonAlert()}
            type="outline"
          />
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:  "#6183B4",
  },
  logo: {
    width: 150,
    height: 150
  },
  header: {
    justifyContent: "center",
    alignItems:"center",
    borderWidth: 0,
    marginTop:20,
    padding:10
  },
  title: {
    fontFamily:'Cheeky Bite Shine - AND',
    fontSize: 37,
    marginTop:10,
    fontWeight: '100',
    padding: 7,
    textAlign: 'left',
    color:'white'
  },
  titleHeader: {
    fontFamily:'Cheeky Bite Shine - AND',
    fontSize: 20,
    textAlign: 'left',
    color:'white',
    width:'70%'
  },
  editBtn: {
    fontFamily:'Cheeky Bite Shine - AND',
    fontSize: 20,
    padding: 5,
    marginBottom: 10,
    textAlign: 'center',
    color:'white',
    alignSelf:'center',
    width:'60%',
    borderRadius:5
  },
  body:{
    marginLeft:20,
    padding:0,
    fontSize:17
  }
  });

export default settings;