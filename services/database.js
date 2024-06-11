import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todo.db');

export const setupDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INT)'
        );
    });
};

export const insertTask = (title, completed) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO tasks (title, completed) VALUES (?, ?)',
                [title, completed ? 1 : 0],
                (_, { insertId }) => {
                    resolve(insertId);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const getAllTasks = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tasks',
                [],
                (_, { rows }) => {
                    const tasks = rows._array.map(task => ({
                        id: task.id,
                        title: task.title,
                        completed: task.completed === 1,
                        isChecked: false 
                    }));
                    resolve(tasks);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const updateTask = (id, completed) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE tasks SET completed = ? WHERE id = ?',
                [completed ? 1 : 0, id],
                (_, { rowsAffected }) => {
                    resolve(rowsAffected);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};