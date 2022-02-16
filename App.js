/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from './screens/settings'
import Splash from './screens/splash'
import Profile from './screens/profile'
import Console from './screens/console'
import HeaderMenu from './components/header'
import LevelOne from './screens/levelOne'
import LevelTwo from './screens/levelTwo'
import Spaceship from './screens/spaceship'

const Stack = createStackNavigator();
const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen 
          name="Splash" 
          component={Splash} 
          options={{ headerShown: false }}/>

          <Stack.Screen
            name='Profile'
            component={Profile}
            options={{
              headerTitle: props => <HeaderMenu {...props} />,
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#6183B4',
              }
            }} />

          <Stack.Screen
            name='Console'
            component={Console}
            options={{
              headerTitle: props => <HeaderMenu {...props} />,
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#6183B4',
              }
            }} />

          <Stack.Screen
            name='LevelOne'
            component={LevelOne}
            options={{
              headerTitle: props => <HeaderMenu {...props} />,
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#6183B4',
              }
            }} />

          <Stack.Screen
            name='LevelTwo'
            component={LevelTwo}
            options={{
              headerTitle: props => <HeaderMenu {...props} />,
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#6183B4',
              }
            }} />

          <Stack.Screen
            name='Spaceship'
            component={Spaceship}
            options={{
              headerTitle: props => <HeaderMenu {...props} />,
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#6183B4',
              }
            }} />

            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                headerTitle: props => <HeaderMenu {...props} />,
                headerLeft: null,
                headerStyle: {
                  backgroundColor: '#6183B4',
                }
              }} />
          </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;