import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import APP from '../../App.js'
import Liao from './liao.js'
import React from 'react';

const Stack = createStackNavigator();

function root() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="APP" component={APP} options={{headerShown: false}} />
          <Stack.Screen name="Liao" component={Liao} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

export default root