import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button} from 'react-native-paper';

const AddTaskScreen = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim()) { 
      onAddTask(taskTitle); 
      setTaskTitle(''); 
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o título da nova tarefa"
        value={taskTitle}
        onChangeText={text => setTaskTitle(text)}
      />
      <Button icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
   Add new task
  </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddTaskScreen;
