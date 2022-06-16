import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Button,
  FlatList
} from 'react-native';

import ReactNativeModal, {ModalProps} from 'react-native-modal';
import React, {useState, useEffect} from 'react';
import {Addtask, CreateTables} from './database';
import LinearGradient from 'react-native-linear-gradient';
import FontAsome5 from 'react-native-vector-icons/FontAwesome5'
import { IconButton } from 'react-native-paper';

import {useRoute} from '@react-navigation/native';
import Task from './delete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements';
export default function Add({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState([]);

  const addTask = () => {
    if (title.length !== 0) {
      var notecopy = notes;
      notecopy.push(title);
      setNotes(notecopy);
      setTitle('');
      console.log(notes);
    }
  };
const deleteTask =(index)=>
{
  // console.log("Item", item)
  // let newNotes = notes.filter((note) => note !=item);
  // setNotes(newNotes);
  // console.log("Filtered", newNotes);
  notes.splice(index, 1) 
  console.log(notes)
  setNotes([...notes]);
}
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

useEffect(() => {
  updateList();

}, [])


  const updateList = async() =>{ 
  let response = await AsyncStorage.getItem('listOfTasks'); 
  let listOfTasks = await JSON.parse(response) || []; 

  setNotes(listOfTasks)
  console.log(notes);
  setTitle('');
  

} 
const  _addTask= async () =>{ 
  const listOfTasks = [title]; 
  console.log('in add function')

  await AsyncStorage.setItem('listOfTasks', 
  JSON.stringify(listOfTasks)); 

} 

  return (
    <View style={styles.container}>
      <ReactNativeModal isVisible={isModalVisible}>
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
            ADD TASK{' '}
          </Text>
          <TextInput
            value={title}
            style={styles.textinput}
            placeholder="Enter Title"
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
      </ReactNativeModal>
      {
        notes.length === 0 ? ( <View style={{alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:20, }}>No tasks found!</Text>
        </View> ) : (<FlatList
          data={notes}
          renderItem={(item) => {
            return (
            
              <Card containerStyle={{borderRadius:10,elevation:15}}>
                <View style={{flex:1,flexDirection:'row' , justifyContent:'space-between'}}>
    
               
                    <Text style={{fontWeight:'800',fontSize:20}}>{item.item}</Text>
                    <View></View>
                     <TouchableOpacity style={{backgroundColor:'green',width:60,padding:10}} onPress={()=>deleteTask(item.index)}>
                      <Text style={{color:'white'}}>delete</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={{backgroundColor:'green',width:70,padding:10}}>
                      <Text style={{color:'white'}}>update</Text>
                     </TouchableOpacity>
                   
                </View>
                  
           
               
              </Card>
            );
          }}
        />)
      }
      


      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          toggleModal();
        }}>
        <Text style={{color: 'white', fontSize: 30}}>+</Text>
        {/* <FontAwosome
              name= 'plus'
              size={30}
              color='#ffff'
              /> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '50%',
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
    backgroundColor: '#008000',
    borderRadius: 10,
    width: '40%',
    height: 50,
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
    backgroundColor: '#e0fbfc',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    width: '80%',
    justifyContent: 'center',
  },
});
