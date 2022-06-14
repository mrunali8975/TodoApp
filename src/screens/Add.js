import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Addtask, CreateTables} from './database';
import LinearGradient from 'react-native-linear-gradient';
import FontAwosome5 from 'react-native-vector-icons/FontAwesome5';
import { useRoute } from '@react-navigation/native';
import {Task,Display} from './delete';
const Add = ({navigation}) => {
  const route=useRoute();



  return (
    <View style={styles.container}>
      
            <TouchableOpacity style={styles.btn} onPress={()=>{
              navigation.navigate('Task')
            }}>
              
              <FontAwosome5 
              name='plus'
              size={30}
              color='#ffff'
              />


            </TouchableOpacity>
<Display />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formcontainer: {
    marginTop: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop: 10,
  },

  submit: {
    backgroundColor: '#6a994e',
    borderRadius: 10,
    width: '50%',
    margin: 10,
    padding: 10,
  },
  submittext: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
  textinput: {
    fontSize: 20,
    backgroundColor: '#b6a6ca',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    justifyContent: 'center',
  },
});
export default Add;
