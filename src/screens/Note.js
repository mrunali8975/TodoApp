import {View, Text, ActivityIndicator, TouchableOpacity,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import css from '../styles/Styles';
import {Card} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import Roundbtn from '../Component.js/Roundbtn';
import colors from '../utils/COLORS/colors';
import {Button, IconButton} from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'Taskdatabase.db' });
// import { query,orderBy,onSnapshot } from '@firebase/firestore';
const Note = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [tasks, setTask] = useState([]);
  const navigation=useNavigation();

  const getTask = () => {
    
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM notes_table ORDER BY task_time',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              // temp.push(results.rows.item(i));
           
            setTask(temp);
            setLoading(false)
            console.log(temp)
          }
        );
      });
      
  };
 
  useEffect(() => {
   

    getTask();
  }, []);

  const delete_task =(task_id)=>
  {

console.log("task_id==>",task_id);
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'DELETE FROM  notes_table where task_id=?',
    //     [task_id],
    //     (tx, results) => {
    //       console.log('Results', results.rowsAffected);

    //       // if (results.rowsAffected > 0) {
    //       //   Alert.alert(
    //       //     'Success',
    //       //     'User deleted successfully',
    //       //     [
    //       //       {
    //       //         text: 'Ok',
    //       //         onPress: () => navigation.navigate('HomeScreen'),
    //       //       },
    //       //     ],
    //       //     { cancelable: false }
    //       //   );
    //       // } else {
    //       //   alert('Please insert a valid User Id');
    //       // }
    //     }
    //   );
    // });
  }


  return (
    <View style={css.body}>
      <Text style={css.headingtext}> TO DO LIST</Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <Card containerStyle={css.card}>
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    
                  <Text style={css.title}>{item.task_title}</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                      <TouchableOpacity onPress={()=>{
                        navigation.push('Delete',{data:item})
                      }}>

                      <IconButton
                      icon={'trash-can'}
                      size={27}
                      style={{marginTop: 3}}
                      color={'red'}
                    />
                      </TouchableOpacity>
                  
                    <TouchableOpacity>
                    <IconButton
                      icon={'pencil'}
                      size={27}
                      style={{marginTop: 3}}
                      color={'blue'}
                      
                     onPress={()=>{navigation.push('update',{data:item});}}
                    />
                    </TouchableOpacity>
                  
                  </View>
                </View>
                <Text style={css.desc}>{item.task_desc}</Text>

                <Text style={css.time}>Created at:{item.task_time}</Text>
              </View>
           
            </Card>
          )}

        
        />
      )}
    </View>
  );
};

export default Note;
