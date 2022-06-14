import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Card} from 'react-native-elements';
import FontAwosome5 from 'react-native-vector-icons/FontAwesome5';
const Home = () => {
  // const [taskarr,settaskarr]=useState([route.params])
  return (
    <View>
      <TouchableOpacity style={styles.btn}></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
