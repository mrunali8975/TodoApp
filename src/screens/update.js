import { View, Text,StyleSheet,TextInput,TouchableOpacity,StatusBar } from 'react-native'
import React ,{useState}from 'react'
import firestore from '@react-native-firebase/firestore';

import { Card } from 'react-native-paper';
import css from '../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import colors from '../utils/COLORS/colors';
import Roundbtn from '../Component.js/Roundbtn';
import { openDatabase } from 'react-native-sqlite-storage';
 
var db = openDatabase({ name: 'Taskdatabase.db' });
const Update = (props) => {
  const goBack=()=>
  {
   navigation.goBack('Home');
  }
  const tasks=props?.route?.params?.data;
  const [title, setTitle] = useState(tasks.task_title);
  const [desc, setDesc] = useState(tasks.task_desc);
  const navigation=useNavigation();
// console.log("task list  ==> ", tasks)
  // useEffect(() => {
  //   console.log("id-->",id)
  
   
  // }, [])


  const handlesubmit=()=>
  {
    console.log
    var now = new Date();
    now.setSeconds(0, 0);
    var isoNow = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000,
    ).toISOString();
    var stamp = isoNow.replace(/T/, ' ').replace(/:00.000Z/, '');
   
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE notes_table set task_title=?, task_desc=? , task_time=? where task_id=?',
        [title, desc, stamp, tasks.task_id],
        (tx, results) => {
          console.log('Resultsv-->', results.rowsAffected);
          navigation.push('Home')

          // if (results.rowsAffected > 0) {
          //   Alert.alert(
          //     'Success',
          //     'User updated successfully',
          //     [
          //       {
          //         text: 'Ok',
          //         onPress: () => navigation.navigate('HomeScreen'),
          //       },
          //     ],
          //     { cancelable: false }
          //   );
          // } else alert('Updation Failed');
        }
      );
    });
    
  }
  
  return (
    <View style={css.body}>
    <StatusBar hidden />
    <Roundbtn
      icon_color={colors.LIGHT}
      icon_name={'arrow-left'}
      icon_size={25}
      style={styles.btn}
      onPress={goBack}
      
    />

    <Card style={[css.form]}>
      <Text style={css.headingtext}>UPDATE TASK </Text>
      <TextInput
        value={title}
        style={css.input}
        placeholder="Enter Task"
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        value={desc}
        multiline
        style={[css.input]}
        placeholder="Enter Description"
        onChangeText={value => setDesc(value)}
      />

      {title == '' ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              backgroundColor: '#023047',
              opacity: 0.1,
              width: '30%',
              margin: 20,
              padding: 12,
              borderRadius: 20,
              color: 'black',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            UPDATE
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => {
            handlesubmit()
          }}>
          <Text
            style={{
              backgroundColor: '#219ebc',
              width: '30%',
              margin: 20,
              padding: 12,
              borderRadius: 15,
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            UPDATE
          </Text>
        </TouchableOpacity>
      )}
    </Card>
  </View>
  )
}
const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6a4c93',

    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Update