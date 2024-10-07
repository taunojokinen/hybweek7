

import { StatusBar,Text,Pressable,} from 'react-native';
import { FlatList, SafeAreaView, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState, useReducer } from 'react';
import Row from './Components/Row.js';
import styles from './Styles/Styles.js';
import Add from './Components/Add.js';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoList from './Components/TodoList.js';

const STORAGE_KEY = '@items_key'



export default function App() {
  const [data, setData] = useState([ ])
  const [selectedId, setSelectedId] = useState(null)




  const add = useCallback((name) => {
    const newItem = {
      id: uuid.v4(),
      name: name,
      strikeThrough: false
    }
    const tempData = [...data, newItem]
    console.log('Adding new item:', newItem);
    console.log('Updated data:', tempData);
    setData(tempData)
  }, [data])

  const select = useCallback((id) => {
    setSelectedId(id);
  }, []);



  return (
    
    <SafeAreaView style={styles.view}>
      <Text style={styles.header}>New Todo List</Text>
      <TodoList /> 
      <Text style={styles.header}>Todo List</Text>  
      <Add  add={add} setData ={setData} />

    
      <FlatList style={styles.flatlist}
        data={data}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        renderItem={({ item }) => (
          <Row 
          style={styles.rowText}
            item={item} 
            selectedId ={selectedId}
            select={select}
            data={data}
            setData={setData} 
            />
        )}
      />
    </SafeAreaView>
  );
}
