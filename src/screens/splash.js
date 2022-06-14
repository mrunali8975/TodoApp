import { View, Text,Image,StyleSheet } from 'react-native'
import React ,{useEffect}from 'react'

const Splash = ({navigation}) => {
  useEffect(() => {
   setTimeout(()=>
   {
navigation.replace('Add')
   },2000);
  }, [])
  
  return (
    <View style={styles.body}>
      <Image
       style={styles.image}
      source={require('/home/mambhore/React Native/TODOAPP/src/utils/assets/images.jpeg')}/>
        <Text style={styles.text}>TO-DO List</Text>
    </View>
  )
}
const styles=StyleSheet.create({
    image :
    {
        width:150,
        height:150,
        margin:20
    },
    body:
    {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#0080ff'
    },
    text:
    {
        fontSize:40,
        color:'#ffff',
        marginBottom:100,
    }
})

export default Splash