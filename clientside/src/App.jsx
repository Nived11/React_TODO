import { useEffect, useState } from "react";
import './App.css';
import ApiPath from "./ApiPath";
import axios from "axios";

function App() {
  const [data, setData] = useState({ task:""});
  const [todo, setTodo] = useState([]);
  const [count, setCount] = useState(0);
  const [editStates, setEditStates] = useState({});

  useEffect(() => {
    getTask();
  }, [count]);

  const addTask = async () => {
    try {
      const res = await axios.post(`${ApiPath()}/addtodo`, data);
      if (res.status === 201) {
        alert(res.data.msg);
        setData({ task: "" });
        setCount(count + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const getTask = async () => {
    try {
      const res = await axios.get(`${ApiPath()}/gettodo`);
      if (res.status === 200) {
        setTodo(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = (_id) => {
    setEditStates((prevStates) => ({...prevStates,[_id]: true,}));
  };

  const EditInputChange = (id, name, value) => {
    setTodo((prevTodo) =>
      prevTodo.map((task) =>task._id === id ? { ...task, [name]: value } : task ));
  };

  const updateTask = async (_id) => {
    try {
      const Todo = todo.find((task) => task._id === _id);
      const res = await axios.put(`${ApiPath()}/updatetodo/${_id}`, Todo);
      if (res.status === 200) {
        alert(res.data.msg);
        setEditStates((prevStates) => ({...prevStates,[_id]: false,}));
        getTask();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (_id) => {
    try {
      const res = await axios.delete(`${ApiPath()}/deletetodo/${_id}`);
      if (res.status === 200) {
        alert(res.data.msg);
        getTask();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <div>
        <input className="taskinput" type="text" placeholder="Task" name="task" value={data.task}
          onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}/>
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {todo   
        
        
        
        .map((item) => (
          <li key={item._id}>
            <div className="task-content">
              <input className="tasks" type="text" value={item.task} disabled={!editStates[item._id]} 
                onChange={(e) => EditInputChange(item._id, "task", e.target.value)}/>
            </div>
              <button className="edit" onClick={() => editTask(item._id)}> Edit</button>
              <button className="update" onClick={() => updateTask(item._id)}> Update</button>
            <button className="delete" onClick={() => deleteTask(item._id)}> Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
