import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { setupDatabase, getAllTasks, updateTask } from '../../services/database'; // Importa as funções do banco de dados


setupDatabase();


const TaskListScreen = () => {
  const [tasks, setTasks] = useState<{ id: number; title: string; completed: boolean; isChecked: boolean; }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksFromDB = await getAllTasks(); 
        setTasks(tasksFromDB);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);

  const checkTask = async (id: number, completed: boolean) => {
    try {
      await updateTask(id, !completed); 
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: !completed, isChecked: !completed };
        }
        return task;
      }));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.appName}>A fazer</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => checkTask(item.id, item.completed)}>
            <View style={styles.taskItem}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Checkbox.Item 
                label="" 
                status={item.completed ? 'checked' : 'unchecked'} 
                onPress={() => checkTask(item.id, item.completed)}
                style={styles.checkbox}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  appName: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  taskTitle: {
    flex: 1, 
  },
  checkbox: {
    alignSelf: 'flex-end', 
  },
});

export default TaskListScreen;