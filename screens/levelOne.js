import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import Gama from './gama'

const levelOne = () => {

  return(
    <SafeAreaView style={styles.container}>
        <Gama noCards={6} level={'Easy'}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:  "#6183B4",
  }
  });

export default levelOne;