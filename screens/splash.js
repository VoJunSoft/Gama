import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {Divider} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

const splash = () => {
  const navigation = useNavigation();
  
  const jumpTo = () => {
    navigation.navigate("Profile")
  }

  return (
    <View style={styles.container}>
    <Animatable.View
        onAnimationEnd={jumpTo}
        easing="ease"
        animation="slideInDown"
        iterationCount={3}
        direction="alternate-reverse">
        <Image style={styles.logo} source={require('../assets/gallary/Gama.png')} />
    </Animatable.View>
    <Divider style={styles.divider} />
    <Text style={styles.title}>Gama: Mind Games</Text>
    <Text style={styles.title}>Introduces Gama: Cards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6183B4'
  },
  logo: {
    flex: 0,
    width: 250,
    height: 250,
    borderRadius: 20,
  },
  title: {
    color: 'white',
    alignContent: 'center',
    textAlign: 'center',
  },
  divider: {
    backgroundColor: 'white',
    width: 100,
    shadowColor: 'white',
    shadowOpacity: 1,
    shadowRadius: 5,
  }
});

export default splash;