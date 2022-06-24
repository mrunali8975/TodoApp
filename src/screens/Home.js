import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator
} from 'react-native';
import Note from './Note';
import ReactNativeModal, {ModalProps} from 'react-native-modal';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Roundbtn from '../Component.js/Roundbtn';
import {IconButton} from 'react-native-paper';
import Task from './delete';
import {Card} from 'react-native-elements';
import { set } from 'react-native-reanimated';
export default function Home(props) {
 
  const [notes, setNotes] = useState([]);

  



  

  

  const addtask =  ()=>
  {
    props.navigation.navigate('AddTask')
  
  }

  


  return (
    <View style={styles.container}>
     
     <StatusBar hidden />

      {/* <ReactNativeModal isVisible={isEditModalVisible}>
        <View
          style={{
            backgroundColor: '#d9ed92',
            height: '60%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 50,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '800',
              marginBottom: 10,
              color: 'black',
            }}>
            UPDATE TASK{' '}

          </Text>
          <TextInput
            value={title}
            style={styles.textinput}
            placeholder="Enter Task"
            onChangeText={value => setTitle(value)}
          />

          {title == '' ? null : (
            <TouchableOpacity
              style={styles.submit}
              onPress={() => {
                update(),EdiittoggleModal();
              }}>
              <Text style={styles.submittext}>UPDATE</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.submit}
            onPress={() => {
              EdiittoggleModal();
            }}>
            <Text style={styles.submittext}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
      <ReactNativeModal isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: '#9c7ec6',
            height: '60%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 50,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '800',
              marginBottom: 10,
              color: 'black',
            }}>
            ADD TASK{' '}
          </Text>
          <TextInput
            value={title}
            style={styles.textinput}
            placeholder="Enter Task"
            onChangeText={value => setTitle(value)}
          />

          {title == '' ? null : (
            <TouchableOpacity
              style={styles.submit}
              onPress={() => {
                _addTask(), toggleModal();
              }}>
              <Text style={styles.submittext}>ADD</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.submit}
            onPress={() => {
              toggleModal();
            }}>
            <Text style={styles.submittext}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal> */}
      {( notes.length===null) ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image
    
    style={styles.image}
      source={require('/home/mambhore/React Native/TODOAPP/src/utils/assets/notask.png')}/>      
        </View>
      ) : 
        <Note/>
      }
    

    <Roundbtn  icon_name={'plus'} icon_size={30} icon_color={'white'} style={styles.btn} onPress={addtask}/>
       
            {/* <IconButton icon="plus" size ={30} color='white' style={styles.btn} onPress={()=>{props.navigation.navigate('AddTask')}} /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '50%',
    backgroundColor:'#d8e2dc'
  },

itemtext:
{
  fontWeight: '800', fontSize: 25,color:'black',
  textAlign:'center',
 
}
,
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6a4c93',
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
    backgroundColor: '#8ac926',
    borderRadius: 10,
    width: '40%',
    height: 50,
    margin: 10,
    padding: 10,
  },
  image:
  {
width:300,
height:300,
alignItems:'center',

marginTop:100},
  submittext: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
  textinput: {
    fontSize: 20,
    backgroundColor: '#e0fbfc',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    width: '80%',
    justifyContent: 'center',
  },
});
