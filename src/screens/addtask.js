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
// import { db } from './config';
// import { collection } from '@firebase/firestore';
// import { addDoc } from '@firebase/firestore';
// import { Timestamp } from '@firebase/firestore';
// import { async } from '@firebase/util';

const AddTask = props => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [notes, setNotes] = useState([]);
 const goBack=()=>
 {
  props.navigation.goBack('Home');
 }
  const handlesubmit = () => {
    // e.preventDefault()
    // try {
    //   await addDoc(collection(db, 'Tasks'), {
    //     title: title,
    //     description: desc,
    //     // completed: false,
    //     created: Timestamp.now()
    //   })
    //   // onClose()
    // } catch (err) {
    //   alert(err)
    // }
    var now = new Date();
    now.setSeconds(0, 0);
    var isoNow = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000,
    ).toISOString();
    var stamp = isoNow.replace(/T/, ' ').replace(/:00.000Z/, '');

    if (title != '' && desc != '' && stamp != '') {
      firestore()
        .collection('Tasks')
        .add({
          Title: title,
          Desc: desc,
          Time: stamp,
         
        })
        .then(() => {
          console.log('Task added!');
          setTitle('');
          setDesc('');
        });
    } else {
      console.log('error');
      ToastAndroid.show('Required all field !!', ToastAndroid.LONG);
    }
  };

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
                width: '20%',
                margin: 20,
                padding: 12,
                borderRadius: 20,
                color: 'white',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              ADD
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              handlesubmit(), props.navigation.push('Home');
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
        )}
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
