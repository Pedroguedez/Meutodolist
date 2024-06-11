import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';

// Função temporária para simular tarefas
const getTasksFromAPI = async () => {
  return [
    { id: 1, title: 'Fazer compras', completed: false, isChecked: false },
    { id: 2, title: 'Estudar para a prova', completed: true,  isChecked: false },
    { id: 3, title: 'Estudar para a prova', completed: true,  isChecked: false },
    { id: 4, title: 'Estudar para a prova', completed: true,  isChecked: false },
    { id: 5, title: 'Estudar para a prova', completed: true,  isChecked: false },
    { id: 6, title: 'Estudar para a prova', completed: true,  isChecked: false },
    // Mais tarefas...
  ];
};

const TaskListScreen = () => {
  const [tasks, setTasks] = useState<{ id: number; title: string; completed: boolean; isChecked: boolean; }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tasksFromAPI = await getTasksFromAPI();
      setTasks(tasksFromAPI);
    };

    fetchData();
  }, []);

  const checkTask = (id:number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, isChecked: !task.isChecked };
      }
      return task;
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>A fazer</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => checkTask(item.id)}>
            <View style={styles.taskItem}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Checkbox.Item 
                label="" 
                status={item.isChecked ? 'checked' : 'unchecked'} 
                onPress={() => checkTask(item.id)}
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
    justifyContent: 'space-between', // Alinha os itens à direita
    marginBottom: 8,
  },
  taskTitle: {
    flex: 1, // Para o título ocupar o espaço restante
  },
  checkbox: {
    alignSelf: 'flex-end', // Alinha o checkbox à direita
  },
});

export default TaskListScreen;