import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function TodoScreen() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("Low");
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    };
    saveTasks();
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: editTaskId || Math.random().toString(),
        title: taskInput,
        completed: false,
        priority: selectedPriority,
        dueDate: null,
      };

      if (editTaskId) {
        setTasks(
          tasks.map((task) => (task.id === editTaskId ? newTask : task))
        );
        setEditTaskId(null);
      } else {
        setTasks([...tasks, newTask]);
      }

      setTaskInput("");
      setSelectedPriority("Low");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (task) => {
    setTaskInput(task.title);
    setSelectedPriority(task.priority);
    setEditTaskId(task.id);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const setDueDate = (taskId, date) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, dueDate: date } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      <TextInput
        style={styles.input}
        value={taskInput}
        onChangeText={setTaskInput}
        placeholder="Enter a task"
      />

      <View style={styles.pickerContainer}>
        <Text>Priority:</Text>
        <Picker
          selectedValue={selectedPriority}
          style={styles.picker}
          onValueChange={setSelectedPriority}
        >
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>

      <Button
        title={editTaskId ? "Update Task" : "Add Task"}
        onPress={addTask}
      />

      <Button title="Clear Completed" onPress={clearCompleted} color="red" />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <Text
                style={[styles.taskText, item.completed && styles.completed]}
              >
                {item.title} -{" "}
                <Text style={styles.priority}>{item.priority}</Text>
                {item.dueDate && ` (Due: ${item.dueDate})`}
              </Text>
            </TouchableOpacity>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => editTask(item)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDueDate(item.id, "2024-12-25")}
              >
                <Text style={styles.dueDateText}>Set Due Date</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    marginBottom: 10,
    paddingLeft: 10,
  },
  pickerContainer: {
    width: "80%",
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: "100%",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    width: "80%",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  taskText: {
    fontSize: 18,
    flex: 1,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  priority: {
    fontWeight: "bold",
    color: "green",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  editText: {
    color: "blue",
    marginRight: 10,
  },
  deleteText: {
    color: "red",
    marginRight: 10,
  },
  dueDateText: {
    color: "orange",
  },
});
