import { View, Text,Image,StyleSheet } from 'react-native'
import React ,{useEffect}from 'react'

const Splash = ({navigation}) => {
  useEffect(() => {
   setTimeout(()=>
   {
navigation.replace('Home')
   },2000);
  }, [])
  
  return (
    <View style={styles.body}>
      <Image
       style={styles.image}
      source={require('/home/mambhore/React Native/TODOAPP/src/utils/assets/logo2.jpeg')}/>
        <Text style={styles.text}>TO-DO LIST</Text>
    </View>
  )
}
const styles=StyleSheet.create({
    image :
    {
        width:250,
        height:250,
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
        fontSize:45,
        color:'#ffff',
        marginBottom:100,
        fontWeight:'800'
    }
})

export default Splash