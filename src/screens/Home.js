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
  ActivityIndicator,
} from 'react-native';
import Note from './Note';
import ReactNativeModal, {ModalProps} from 'react-native-modal';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Roundbtn from '../Component.js/Roundbtn';
import {IconButton} from 'react-native-paper';
import Task from './delete';
import {Card} from 'react-native-elements';
import {set} from 'react-native-reanimated';
import { openDatabase } from 'react-native-sqlite-storage';

// import {createTable} from './database';
export default function Home(props) {
  // to save 
  const db = openDatabase({ name: 'Taskdatabase.db' });

  const [notes, setNotes] = useState([]);

  // navigate to add function
  const addtask = () => {
    props.navigation.navigate('AddTask');
  };
  const createTable =()=>{

    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='notes_table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS notes_table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS notes_table(task_id INTEGER PRIMARY KEY AUTOINCREMENT, task_title VARCHAR(20), task_desc VARCHAR(1000), task_time VARCHAR(50))',
              []
            );
          }
        }
      );
    });
  
  }
    

  useEffect(() => {
   createTable();
  
   
  }, [])
  
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {notes.length === null ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator/>
        </View>
      ) : (
        // display notes
        <Note />  
      )}

      <Roundbtn
        icon_name={'plus'}
        icon_size={30}
        icon_color={'white'}
        style={styles.btn}
        onPress={addtask}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '50%',
    backgroundColor: '#d8e2dc',
  },

  itemtext: {
    fontWeight: '800',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  },
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
  image: {
    width: 300,
    height: 300,
    alignItems: 'center',

    marginTop: 100,
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
