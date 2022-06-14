import { View, Text } from 'react-native'
import React from 'react'


const CreateTables = () => {

  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))`,
      [],
      (sqlTxn, res) => {
        console.log("table created successfully");
      },
      error => {
        console.log("error on creating table " + error.message);
      },
    );
  });
};


const Databse = () => {
  return (
    <View>
      <Text>Databse</Text>
    </View>
  )
}

export  {CreateTables,Addtask}