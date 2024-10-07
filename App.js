

import { Text,TextInput, TouchableOpacity} from 'react-native';
import { FlatList, SafeAreaView, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState, useReducer } from 'react';
import styles from './Styles/Styles.js';
import uuid from 'react-native-uuid';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state,  {id: uuid.v4(), name: action.name} ]
    case 'REMOVE':
      return state.filter(item => item.id !== action.id)
    default:
      return state
  }
}

export default function App() {
  const [data, setData] = useState([ ])
  const [selectedId, setSelectedId] = useState(null)
  const [name, setName] = useState("");


  const [todos, dispatch] = useReducer(reducer, [])
  
    function handleAddTodo() {
   
      dispatch({ type: 'ADD', name});
      setName("");
    }

    function handleRemoveTodo(id) {
      dispatch({ type: 'REMOVE', id });
    }


  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleRemoveTodo(item.id)}
      style={[styles.item, { backgroundColor: item.id === selectedId ? '#add8e6' : '#fff' }]}>
      <Text style={styles.flatlistText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    
    <SafeAreaView style={styles.view}>
      <Text style={styles.header}>Todo List</Text>
      <View style={styles.container}>
            <TextInput
                style={styles.form}
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Item name ..."
            />
           <TouchableOpacity style={styles.button} onPress={() => handleAddTodo(name)}>
           <Text style={styles.buttonText}>Save</Text>
           </TouchableOpacity>
        </View>
        <View style={styles.flatlist}>
           <FlatList
              data={todos}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
              
        />

        </View>
  
    </SafeAreaView>
  );
}
