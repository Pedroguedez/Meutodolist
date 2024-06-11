import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

// Função temporária para simular tarefas
const getTasksFromAPI = async () => {
  // Implemente a lógica para obter as tarefas do banco de dados SQLite
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
  // Especificando a tipagem do estado
  const [tasks, setTasks] = useState<{ id: number; title: string; completed: boolean; isChecked: boolean; }[]>([]);
  const [ativo, setAtivo] = useState('unchecked');

  /*function check(){
    if(ativo === 'checked'){
    setAtivo('unchecked')
    }else{
    setAtivo('checked') 
    }
  }*/
function check(id){
    tasks.map((task)=>{
      if(id === task.id){
        task.isChecked = !task.isChecked 
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const tasksFromAPI = await getTasksFromAPI();
      setTasks(tasksFromAPI);
    };

    fetchData();
  }, []);

  const handleTaskCompletion = (taskId: number) => {
    // Implemente a lógica para atualizar a tarefa como concluída no banco de dados
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
                <Checkbox.Item label="Item" status={ativo} onPress={()=>check(item.id)}/>
            <Text style={styles.taskTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    marginLeft: 8,
  },
});

export default TaskListScreen;