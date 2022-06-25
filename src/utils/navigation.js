import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Update from '../screens/update';
import Delete from '../screens/delete';
import Splash from '../screens/splash';
import Home from '../screens/Home';
import AddTask from '../screens/addtask';
import Asynctask from '../screens/Asynctask';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Splash' component={Splash}/>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='update' component={Update}/>

            <Stack.Screen name='AddTask' component={AddTask}/>
            <Stack.Screen name='Delete' component={Delete}/>


           

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
