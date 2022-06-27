import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'Taskdatabase.db' });
const Delete = (props) => {
  const notes=props?.route?.params?.data;
  const navigation=useNavigation();
  const [key,setKey]=useState('')


  useEffect(() => {
  console.log("task_id==>",notes.task_id);
  
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM  notes_table where task_id=?',
          [notes.task_id],
          (tx, results) => {
            // console.log('Results', results.rowsAffected);
            navigation.push('Home')
            alert(' Deleted Successfully ');

           
          }
        );
      });
    
    
  }, [])
  
  return (
    <View>
    </View>
  )
}

export default Delete