import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  CheckBox,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { AntDesign } from "@expo/vector-icons";

function Task(props) {
  const [isChecked, setChecked] = useState(false);
  const date = new Date();
  return (
    <Text>
      <CheckBox
        value={isChecked}
        style={styles.checkbox}
        onValueChange={() => {
          setChecked(!isChecked);
        }}
      />
      <Text style={isChecked ? styles.strikedTaskContent : styles.taskContent}>
        {" "}
        {props.name},{" "}
        {props.dueDate
          ? props.dueDate
          : date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear()}{" "}
      </Text>
      <AntDesign
        size={20}
        color="maroon"
        name="minuscircle"
        onPress={() => {
          props.onDeleteTask(props.id);
        }}
      />
    </Text>
  );
}

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { list: props.list };
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
  }

  handleDeleteTask(id) {
    this.state.list = this.state.list.filter((task) => {
      if (task.id != id) return task;
    });
    this.setState({ list: this.state.list });
  }

  handleAddTask = (task) => {
    this.state.list.push(task);
    this.setState({ list: this.state.list });
  };
  render() {
    return (
      <View>
        <Text style={styles.header}>TODO List</Text>
        <TaskNameForm onAddTask={this.handleAddTask} />
        <View style={styles.list}>
          <ScrollView>
            {this.state.list.map((t) => (
              <View style={styles.eachTask}>
                <Task
                  name={t.name}
                  dueDate={t.dueDate}
                  onDeleteTask={this.handleDeleteTask}
                  id={t.id}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

class TaskNameForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", date: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    const task = {
      id: Date.now(),
      name: this.state.value,
      dueDate: this.state.date,
    };
    this.setState({ value: "" });
    this.props.onAddTask(task);
  };

  handleChange = (text) => {
    this.setState({ value: text });
  };

  handleDateChange = (date) => {
    this.setState({ date: date });
  };

  render() {
    return (
      <View style={styles.form}>
        <TextInput
          style={styles.txtInput}
          onChangeText={this.handleChange}
          placeholder="New Task Name..."
          value={this.state.value}
        />
        <DatePicker
          date={this.state.date}
          placeHolder="Due Date:"
          mode="date"
          format="DD-MM-YYYY"
          minDate="01-01-2020"
          maxDate="01-01-2021"
          display="default"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={this.handleDateChange}
        />
        <Button title="Add" onPress={this.handleSubmit} />
      </View>
    );
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <TodoList list={[{ name: "Project", dueDate: "23-12-2020" }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 3,
    backgroundColor: "#fff",
  },
  formName: {
    fontSize: 20,
    backgroundColor: "lavenderblush",
    borderRadius: 100 / 12,
    color: "darkmagenta",

    marginBottom: 10,
  },
  del: {
    flexDirection: "row",
    justifyContent: "flex-end",
    color: "red",
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    padding: 20,
    height: 100,
    color: "darkmagenta",
  },
  form: {
    flexDirection: "row",
    fontSize: 10,
    justifyContent: "space-between",
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: "palevioletred",
  },
  txtInput: {
    width: 170,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "darkgrey",
  },
  checkbox: {
    paddingTop: 10,
    height: 20,
  },
  list: {
    marginTop: 20,
    backgroundColor: "mistyrose",
    borderRadius: 100 / 12,
  },
  eachTask: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "palevioletred",
  },
  taskContent: {
    fontSize: 18,
  },
  strikedTaskContent: {
    fontSize: 18,
    textDecorationLine: "line-through",
  },
});
