import React, { useCallback, useReducer, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Dialog from 'react-native-dialog';
import uuid from 'react-native-uuid';
import Add from './Add';
import Row from './Row';
import styles from '../Styles/Styles.js';

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        index === action.index ? { ...todo, completed: !todo.completed } : todo
      );
    case 'REMOVE_TODO':
      return state.filter((todo, index) => index !== action.index);
    default:
      throw new Error();
  }
}

export default function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');

  const [data, setData] = useState([ ])

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

  function handleAddTodo() {


    setDialogVisible(true);
  }
  function handleCancel() {
    setDialogVisible(false);
  }
  function handleSave() {
    dispatch({ type: 'ADD_TODO', text: newTodoText });
    setDialogVisible(false);
    setNewTodoText('');
  }

  function handleToggleTodo(index) {
    dispatch({ type: 'TOGGLE_TODO', index });
  }

  function handleRemoveTodo(index) {
    dispatch({ type: 'REMOVE_TODO', index });
  }

  return (
    <SafeAreaView style={styles.container}>
        <Add  add={add} setData ={setData} />
        <Text style= {styles.row}>This is a new line</Text> 
      <TouchableOpacity onPress={handleAddTodo} style={{ padding: 10, backgroundColor: 'blue', marginBottom: 10 }}>
        <Text style={{ color: 'white' }}>Add Todo</Text>
      </TouchableOpacity>
      <FlatList style={styles.flatlist}
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleToggleTodo(index)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
                {item.text}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveTodo(index)} style={{ padding: 10, backgroundColor: 'red' }}>
                <Text style={{ color: 'white' }}>X</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
            <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Add New Todo</Dialog.Title>
        <Dialog.Input
          placeholder="Enter new todo"
          value={newTodoText}
          onChangeText={setNewTodoText}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Save" onPress={handleSave} />
      </Dialog.Container>
    </SafeAreaView>
  );
}