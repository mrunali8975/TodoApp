import { View, Text ,ActivityIndicator, TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import css from '../styles/Styles';
import {Card} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import Roundbtn from '../Component.js/Roundbtn';
import colors from '../utils/COLORS/colors';
import { Button, IconButton } from 'react-native-paper';
// import { query,orderBy,onSnapshot } from '@firebase/firestore';
const Note = ({item}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [tasks, setTask] = useState([]); 
  // const todosref = firestore().collection('Tasks')


  const getTask =  () => {
    const subscriber = firestore()
    .collection('Tasks')
    .onSnapshot(querySnapshot => {
      const users = [];

      querySnapshot.forEach(documentSnapshot => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setTask(users);
      setLoading(false);
    });

  // Unsubscribe from events when no longer in use
  return () => subscriber();
  };
  // const delete_task=(key)=>
  // {
  //   console.log("key",key)
  // }



 
  useEffect(() => {
    // const getData = async () => {
    //   const q = await query(todosref, where('uid', '==', uid), orderBy("createdAt"))
    //   onSnapshot(q, (snapshot) => {
    //     // Includes the document's ID.
    //     const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //     setProjects(documents)
    //   })
    // }
    // getData()
  
  getTask();
    // Unsubscribe from events when no longer in use
  
  }, [tasks]);


  return (
   <View style={css.body}>
    <Text style={css.headingtext}> TO DO LIST</Text>

{
loading ? <ActivityIndicator/>: 
 <FlatList
 data={tasks}
 
 renderItem={({item})=>
(

  <Card containerStyle={css.card}>

            

               <View>
               <View style={{flex:1,flexDirection:'row', justifyContent:'space-between'}}>
               <Text style={css.title}>{item.Title}</Text>
<View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>

<IconButton icon={'trash-can'} size={27}  style={{marginTop:3}} color={'red'} />
                  <IconButton icon={'pencil'} size={27}  style={{marginTop:3}} color={'blue'}/>

</View>
                  
                </View>
                <Text style={css.desc}>{item.Desc}</Text>
                
                <Text style={css.time}>Created at:{item.Time}</Text>
                


                </View>  
                {/* <View>
                  <Roundbtn icon_name={'trash-can'} icon_size={40} icon_color={colors.LIGHT}  onPress={delet_task(item.key)}/>
                </View> */}

              
       
           
          </Card>
)}
  
  //  <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //    {/* <Text>Task ID: {item.Title}</Text>
  //    <Text>Task Name: {item.Desc}</Text>
  //    <Text>Task Name: {item.Desc}</Text> */}

  //    <Card>

  //    </Card>

  //  </View>
 
/>
}

   </View>

      

     
   
  )
}

export default Note