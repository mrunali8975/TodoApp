import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import css from '../styles/Styles';
import Roundbtn from '../Component.js/Roundbtn';
import colors from '../utils/COLORS/colors';
import {Card, IconButton} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

const AddTask = props => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error,setError]=useState('Please enter Task or Description');
  const [notes, setNotes] = useState([]);
  const navigation=useNavigation();
  const db = openDatabase({ name: 'Taskdatabase.db' });

  // return to home
 const goBack=()=>
 {
  props.navigation.goBack('Home');
 }

//  add to sqLite
  const handlesubmit = () => {
    var now = new Date();
    now.setSeconds(0, 0);
    var isoNow = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000,
    ).toISOString();
    var stamp = isoNow.replace(/T/, ' ').replace(/:00.000Z/, '');

    if (title != '' && desc != '' && stamp != '') {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO notes_table (task_title, task_desc, task_time) VALUES (?,?,?)',
          [title, desc, stamp],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            setDesc('');
            setTitle('')
            navigation.push('Home')
            // if (results.rowsAffected > 0) {
            //   console.log("added")
            //   Alert.alert(
            //     'Success',
            //     'You are Registered Successfully',
            //     [
            //       {
            //         text: 'Ok',
            //         onPress: () => navigation.navigate('Home'),
            //       },
            //     ],
            //     { cancelable: false }
            //   );
            // } else alert('Registration Failed');
          }
        );
      });
    };
  };
const handleChangetext =(value,field)=>
{
if(field=='title' )
{
  setTitle(value);
  console.log('title ' , title)
}
if (field=='desc'){
setDesc(value)
console.log('desc ',desc)
  
}
}
 const isValid =()=>
 {
  if (!title.trim())
  {
    return setError('Enter Task');
  }
  if(!desc.trim())
  {
     return setError('Enter desc');
  }
  return true
 }

 const submitform =()=>
 {
  if (isValid())
  {
    return true;
  }
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
        <Text style={css.headingtext}>ADD TASK </Text>
        <TextInput
          value={title}
          style={css.input}
          placeholder="Enter Task"
          onChangeText={(value)=>handleChangetext(value,'title')}
        />
         {

(title==null)?  <Text style={{color:'red'}}>{error}</Text>  : null

}
 
        
        <TextInput
          value={desc}
          multiline
          style={[css.input]}
          placeholder="Enter Description"
          onChangeText={value => handleChangetext(value,'desc')}
        />
      {

        (!title)?  <Text style={{color:'red'}}>{error}</Text>  : null
      
        }
         
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              
                          handlesubmit()
          
            }}>
            <Text
              style={{
                backgroundColor: '#219ebc',
                width: '20%',
                margin: 20,
                padding: 12,
                borderRadius: 15,
                color: 'white',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              ADD
            </Text>
          </TouchableOpacity>
        
      </Card>
    </View>
  );
};

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

export default AddTask;
