import {
  View,
  FlatList,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {ListItem, Card} from 'react-native-elements';

// creating reference of database

const dref = firestore().collection('Task');

// const logoimage =
//   '/home/mambhore/React Native/RNnotificationdemo/src/assets/download.png';

// to add books details in cloud store
function TaskAdd(title,desc,time) {
  dref.add({
    Title: title,
    Desc: desc,
    Time: time,
  });
}

// To diplay the list of books from cloud firestore
function Display() {
  const [isLoading, setLoading] = useState(true);
  const [booksArr, setBookarr] = useState([]);
  const [books, setBook] = useState('');

  const renderItem = ({item}) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  useEffect(() => {
    return dref.onSnapshot(querySanpshot => {
      const list = [];
      querySanpshot.forEach(doc => {
        const {title, author, price} = doc.data();
        list.push({
          id: doc.id,
          title: doc.data().Title,
          author: doc.data().Author,
          price: doc.data().Price,
        });
      });

      setBookarr(list);
      console.log(booksArr);
      if (isLoading) {
        setLoading(false);
      }
    });
  }, []);
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <FlatList
        data={booksArr}
        renderItem={item => {
          return (
            <Card containerStyle={{borderRadius: 10, elevation: 15}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View>
                  {/* <Card.Image
                    style={{width: 100, height: 100, marginRight: 10}}
                    source={require(logoimage)}
                  /> */}
                </View>
                <View style={{marginTop: 20}}>
                  <Text>Title:{item.item.title}</Text>
                  <Text>Author:{item.item.author}</Text>
                  <Text>Price:{item.item.price}</Text>
                </View>
              </View>
            </Card>
          );
        }}
      />
    </View>
  );
}

const Delete = () => {};

export {TaskAdd, Display, Delete};
