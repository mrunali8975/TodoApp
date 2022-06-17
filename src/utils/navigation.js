import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Update from '../screens/update';
import Task from '../screens/delete'
import Add from '../screens/Add';
import Splash from '../screens/splash';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Add' component={ Add}/>
            <Stack.Screen name='update' component={Update}/>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Splash' component={Splash}/>
            <Stack.Screen name='Task' component={Task}/>
           

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
