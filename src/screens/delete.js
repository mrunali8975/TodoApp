import { View, Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import React ,{useState,useEffect}from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';





const Task = (props) => {
const [title, setTitle] = useState('');
const [notes, setNotes] = useState([]);

const addTask =()=>
{if(title.length!==0)
  {
    var notecopy =notes;
    notecopy.push(title)
    setNotes(notecopy)
    setTitle('');
    console.log(notes)
  
  }
 
}




// useEffect(() => {
//   updateList();
  
// }, [])

// const updateList = async() =>{ 
//   let response = await AsyncStorage.getItem('listOfTasks'); 
//   let listOfTasks = await JSON.parse(response) || []; 

//   setTask(listOfTasks)
//   console.log(task);
//   setTitle('');
//   setDesc('');

// } 
// const  _addTask= async () =>{ 
//   const listOfTasks = [title]; 

//   await AsyncStorage.setItem('listOfTasks', 
//   JSON.stringify(listOfTasks)); 

// updateList()
// } 

 


  return (
    <View style={styles.container}>
 <TextInput
 value={title}
          style={styles.textinput}
          placeholder="Enter Title"
          onChangeText={value => setTitle(value)}
        />
        {/* <TextInput
        value={desc}
          style={styles.textinput}
          placeholder="Enter Description"
          multiline
          onChangeText={value => setDesc(value)}
        /> */}
        <TouchableOpacity style={styles.submit} onPress={()=>{addTask()}} >
          <Text style={styles.submittext}>Save Task</Text>
        </TouchableOpacity>
       
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height:'50%',
    alignItems:'center',
    padding:10,
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 15,
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
    backgroundColor: '#6a994e',
    borderRadius: 10,
    width: '50%',
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
    backgroundColor: '#b6a6ca',
    textAlign:'left',
    borderRadius:10,
    width: '100%',
    borderWidth:2,
    paddingHorizontal:10,
    margin:10,
    backgroundColor:'#ffff',
    borderColor:'#555555',
    justifyContent: 'center',
  },
});
export   default Task;