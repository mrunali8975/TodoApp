import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  FlatList,
} from 'react-native';

import ReactNativeModal, {ModalProps} from 'react-native-modal';
import React, {useState, useEffect} from 'react';
import {Addtask, CreateTables} from './database';
import LinearGradient from 'react-native-linear-gradient';
import FontAsome5 from 'react-native-vector-icons/FontAwesome5';
import {Appbar} from 'react-native-paper';
import {Button} from 'react-native-paper';

import {useRoute} from '@react-navigation/native';
import Task from './delete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-elements';
export default function Add({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState([]);
  //const  taskcopy=[];
  // const addTask = () => {
  //   if (title.length !== 0) {
  //     var notecopy = notes;
  //     notecopy.push(title);
  //     setNotes(notecopy);
  //     setTitle('');
  //     console.log(notes);
  //   }
  // };
  // const [taskTobeEdited,settaskTobeEdited]=useState(null)
  //   const handleTriggerEdit=(item)=>
  //   {
  //     console.log(item)
  //     settaskTobeEdited(item)

  //   }
  const deleteTask = rowKey => {
    // console.log("Item", item)
    // let newNotes = notes.filter((note) => note !=item);
    // setNotes(newNotes);
    // console.log("Filtered", newNotes);
    console.log('Rowkey', rowKey);
    const newNotes = [...notes];

    console.log('new notes ', notes);
    // const notesIndex = notes.findIndex((task)=>task.key === rowKey)
    // console.log("Notes index",notesIndex)
    newNotes.splice(rowKey, 1);
    AsyncStorage.setItem('list', JSON.stringify(newNotes));
    setNotes(newNotes);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //   const updateList = async() =>{
  //   let response = await AsyncStorage.getItem('listOfTasks');
  //   let listOfTasks = await JSON.parse(response) || [];

  //   setNotes(listOfTasks)
  //   console.log(notes);
  //   setTitle('');

  // }
  useEffect(() => {
    getData();
  }, [title]);

  const getData = () => {
    try {
      AsyncStorage.getItem('list')
      .then(value => {
        if (value != null) {
          let user = JSON.parse(value);

          setNotes(user);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const _addTask = async () => {
    notes.push(title);
    await AsyncStorage.setItem('list', JSON.stringify(notes));
    setTitle('');
  };

  return (
    <View style={styles.container}>
      <Appbar>
        <Appbar.Header>
          <Text style={{fontSize:20,color:'white'}}>TO DO APP</Text>
        </Appbar.Header>
      </Appbar>
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
      {notes.length === 0 ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>No tasks found!</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={item => {
            return (
              <Card containerStyle={{borderRadius: 10, elevation: 15}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: '800', fontSize: 20}}>
                    {item.item}
                  </Text>
                  <TouchableOpacity
                    style={{backgroundColor: 'green', width: 60, padding: 10}}
                    onPress={() => deleteTask(item.index)}>
                    <Text style={{color: 'white'}}>delete</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{backgroundColor: 'green', width: 70, padding: 10}}>
                    <Text style={{color: 'white'}}>update</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            );
          }}
        />
      )}

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
