import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    FlatList,
} from 'react-native';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);

    const addTodo = () => {
        if (todoText.trim() === '') {
            return; // Don't add empty todos
        }

        if (editingTodo) {
            // If editing a todo, update it instead of adding a new one
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === editingTodo.id
                        ? { ...todo, text: todoText }
                        : todo
                )
            );
            setEditingTodo(null);
        } else {
            // If not editing, add a new todo
            setTodos((prevTodos) => [
                ...prevTodos,
                { id: Math.random().toString(), text: todoText },
            ]);
        }

        setTodoText('');
    };

    const editTodo = (id) => {
        const todoToEdit = todos.find((todo) => todo.id === id);
        if (todoToEdit) {
            setEditingTodo(todoToEdit);
            setTodoText(todoToEdit.text);
        }
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todo List</Text>
            <TextInput
                style={styles.input}
                placeholder="Add or edit a task"
                value={todoText}
                onChangeText={(text) => setTodoText(text)}
            />
            <Button title={editingTodo ? 'Edit Task' : 'Add Task'} onPress={addTodo} />
            <FlatList
                style={styles.list}
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.todo}>
                        <Text style={styles.todoText}>{item.text}</Text>
                        <Button title="Edit" onPress={() => editTodo(item.id)} />
                        <Button title="Delete" onPress={() => deleteTodo(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 8,
    },
    list: {
        flex: 1,
        marginTop: 8,
    },
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 8,
    },
    todoText: {
        flex: 1,
    },
});

export default App;
