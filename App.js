import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView, CheckBox } from 'react-native';
// import {DatePicker, Container, Content} from 'native-base';
import DatePicker from 'react-native-datepicker'
// import DateTimePicker from '@react-native-community/datetimepicker';

function Task(props) {
  // const [text, setText] = useState('');
  console.log(props.dueDate);
  return (<Text> {props.name}, {props.dueDate},
      <Button title="Delete Task" onPress={() => { props.onDeleteTask(props.id) }} />
  </Text>);
}

class TodoList extends Component {
  constructor(props) {
      super(props);
      this.state = { list: props.list };
      this.handleDeleteTask = this.handleDeleteTask.bind(this);
      this.handleAddTask = this.handleAddTask.bind(this);
  }

  handleDeleteTask(id) {
      console.log("Delete task clicked", id);
      // let list = this.state.list;
      this.state.list = this.state.list.filter(task => {
          if (task.id != id)
              return task;

      })
      this.setState({ list: this.state.list })
  }

  handleAddTask(task) {
      console.log("add task clicked");
      this.state.list.push(task);
      this.setState({ list: this.state.list })
  }
  render() {
      return (
          <View>
              <Text>TODO List</Text>
              <TaskNameForm onAddTask={this.handleAddTask} />
              <ScrollView>
                  {this.state.list.map((t) =>
                  <Task key={t.id} name={t.name} dueDate={t.dueDate} onDeleteTask={this.handleDeleteTask} id={t.id} />)}
              </ScrollView>
              {/* {console.log(this.state.list)} */}
          </View>
      );
  }
}

class TaskNameForm extends Component {
  constructor(props) {
      super(props);
      this.state = { value: '', date: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  handleSubmit(event) {
      // const taskList = this.props.taskList;
      // create a task object
      event.preventDefault();
      console.log("handleSubmit");
      console.log(this.state.date);
      const task = {
          id: Date.now(), name: this.state.value,
          dueDate: this.state.date
      };
      //clearing the input after submit
      this.setState({ value: ''})
      // add the task object to the task list
      this.props.onAddTask(task);
  }

  handleChange(event) {
      // code to set the state of the component
      console.log("Handle change");
      this.setState({ value: event.target.value });
  }

  handleDateChange = (date) => {
    // code to set the state of the component
    console.log(date);
    this.setState({date: date})
}

  render() {
      return (
          <View >
              {/* <View> */}
              <TextInput onChange={this.handleChange} placeholder="Write the task.." value={this.state.value} />
            <DatePicker
            date= {this.state.date}
            placeHolder="Due Date:"
            mode="date"
            format="DD-MM-YYYY"
            minDate="01-01-2020"
            maxDate="01-01-2021"
            display="default"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange= {this.handleDateChange}
            />
              <Button title="Add Task" onPress={this.handleSubmit}/>
          </View>
      );
  }
}

export default function App() {
    
  return (
    <View style={styles.container}>
      <TodoList list={[]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      padding:20,
    flex: 3,
    backgroundColor: '#fff',

    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
