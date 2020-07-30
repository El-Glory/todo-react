/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from "react";
//import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map(task => {
      //if this task has the same Id as the edited task
      if(id === task.id) {
        //use object spread to make a new object
        //whose `completed` prop has been inverted
        return {...tasks, completed: !task.completed}
      }
      return task;
    })
    setTasks(updatedTasks)
    
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName){
    const editedTaskList = tasks.map(task => {
      //if this task has the same ID as the edited task
      if(id === task.id){
        return {...tasks, name: newName}
      }
      return task;
    })
    setTasks(editedTaskList);
  }
    //handling form submission via callbacks
  function addTask(name) {
    //adding new task with the spread syntax
    const newTask = { id: "id", name: name, completed: false };
    //setTask joins the new task with the existing tasks
    setTasks([...tasks, newTask])
  }
  const taskNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${taskNoun} remaining`;
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ))
  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;