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
import {Button, Card, IconButton} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import PushNotification from 'react-native-push-notification'

const AddTask = props => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [notes, setNotes] = useState([]);
  const [open,setOpen]=useState(false);
  const [date,setDate]=useState(new Date())
  const navigation = useNavigation();

  const db = openDatabase({name: 'Taskdatabase.db'});
 const [error,setError]=useState('');
  // return to home
  const goBack = () => {
    props.navigation.goBack('Home');
  };
  useEffect(() => {
    console.log("date-->",date)
  PushNotification.configure({
    onRegister: (token)=>
    {
console.log("token -->",token);
    },
    onNotification: (notification)=>
    {
        console.log('Notification -->', notification)
        

    },
    popInitialNotification:false,
    requestPermissions:false,
    
  
  });
  PushNotification.createChannel(
    {
        channelId:'reminders',
        channelName :'Task reminders notifications',
        channelDescription:'Reminders for any tasks',
        
    }

  );
  PushNotification.getScheduledLocalNotifications(rn=>{
    console.log('SN --->',rn);
    
  }
  
  
  )
  console.log('channel created ', )


}, [])

const sheduleNotification=()=>
{
  // console.log();
    PushNotification.localNotificationSchedule(
        {
            channelId:'reminders',
            title:'New Task Added',
            message:'You have added new task',
            date:date,
            allowWhileIdle:false
        }
    )
}

  //  add to sqLite
  const handlesubmit = () => {
    var now = new Date();
    now.setSeconds(0, 0);
    var isoNow = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000,
    ).toISOString();
    var stamp = isoNow.replace(/T/, ' ').replace(/:00.000Z/, '');
    if (title === '') {

      setError('Enter Title')
}
  if (desc == '') {
setError('Enter description')
 
  }

    
        else {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO notes_table (task_title, task_desc, task_time) VALUES (?,?,?)',
          [title, desc, stamp],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            setDesc('');
            setTitle('');
            navigation.push('Home');
          },
        );
      });
    }
  };
  const handleChangetext = (value, field) => {
    if (field == 'title') {
      setTitle(value);
      setError('')
      // console.log('title ', title);
    }
    if (field == 'desc') {
      setDesc(value);
      setError('')
      // console.log('desc ', desc);
    }
  };
  const isValid = () => {
    if (!title.trim().length==0) {
      return setError('Enter Task');
    }
    if (!desc.trim()) {
      return setError('Enter desc');
    }
    return true;
  };

  const submitform = () => {
    if (isValid()) {
      return true;
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
          onChangeText={value => handleChangetext(value, 'title')}
        />
        {error ? <Text style={{color: 'red'}}>{error}</Text> : null}

        <TextInput

          value={desc}
          multiline
          style={[css.input]}
          placeholder="Enter Description"
          onChangeText={value => handleChangetext(value, 'desc')}
        />
        {error ? <Text style={{color: 'red'}}>{error}</Text> : null}

          <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={
            (date)=>
            {
              setOpen(false)
               setDate(date)
              console.log(date);
            }
            
          }
          onCancel={()=>
          {
            setOpen(false)
          }}
          
          />
          <TouchableOpacity  style={{justifyContent:'center',alignItems:'center',marginTop:10}} onPress={()=>{ setOpen(true)}}>
            <Text style={{borderRadius:15 ,fontWeight:'800' ,backgroundColor:'#9f86c0',width:'35%',fontSize:18,padding:15,}}>Select Date</Text>
          </TouchableOpacity>

        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => {
            sheduleNotification(),
            handlesubmit();
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
