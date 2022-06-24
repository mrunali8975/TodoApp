import { Dimensions, StyleSheet } from "react-native";
import { View, Text } from 'react-native'
import React from 'react'
import colors from "../utils/COLORS/colors";

const width =Dimensions.get('window').width-40

const css = StyleSheet.create({
    body:{
        flex: 1,
        paddingHorizontal:5,
        // alignItems:'center',
        // justifyContent:'center',
         backgroundColor:colors.PRIMARY,

    },
    headingtext:
    {
      fontSize: 30,
      fontWeight: 'bold',
      color: colors.DARK,
      textAlign:'center',
      marginTop:20,
    
    },
    form:
    {
      backgroundColor:colors.LIGHT,
      justifyContent:'center',
      marginTop:100,
      borderRadius:15,
      paddingHorizontal:10,paddingVertical:10
    },
    title:
    {
      fontSize: 30,
      fontWeight: 'bold',
      color: colors.DARK,

    } ,
    image:
  {
width:300,
height:300,
alignItems:'center',

marginTop:100},

addbtn: {
  backgroundColor: '#8ac926',
  borderRadius: 10,
  width: '40%',
  height: 50,
  margin: 10,
  padding: 10,
},
icon:
{
  backgroundColor: colors.PRIMARY,
  padding: 15,
  borderRadius: 50,
  elevation: 5,
},

card:
{
  borderRadius:20,
  elevation:15,
  marginBottom:1

},
time:
{
fontStyle:'italic'
,fontSize:17,
color:colors.DARK
},

desc:
{
fontSize:20,
marginBottom:20,
color:colors.DARK
},
input:{
  fontSize:20,
  color:colors.DARK,
  paddingLeft:10,
borderBottomWidth:2,
marginLeft:10,
marginRight:10,

marginBottom:10,
marginTop:20,
borderBottomColor:colors.PRIMARY
},


logo: {
  width: 150,
  height: 150,
  marginBottom: 20,
  marginTop: 10,
},
})

export default  css;