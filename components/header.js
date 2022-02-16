import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.title}>

      <Icon
        name='home'
        type='font-awesome'
        size={35}
        color='black'
        onPress={() => navigation.navigate('Profile')
      }/>

      <TouchableOpacity 
            onPress={() => navigation.navigate('Console')}>
      <Image style={styles.headIcon} source={require("../assets/gallary/Play2.png")} /> 
      </TouchableOpacity>

      <Icon
        // reverse
        name='gear'
        type='font-awesome'
        size={35}
        color='black'
        onPress={() => navigation.navigate('Settings')
      }/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    flex: -1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    fontFamily: 'Cheeky Bite Shine - AND',
    fontSize: 30,
    padding: 0,
    width: '100%'
  },
  headIcon: {
    height:80,
    width: 80,
    marginTop:19
  }

});
export default header;    