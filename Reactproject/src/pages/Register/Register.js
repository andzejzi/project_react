import { useState, useEffect } from "react";
import "./Register.css";
import styled from "styled-components";

const List = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const Register = () => {
  const [names, setNames] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todos"));
    if (localTodos) {
      setTodos(localTodos);
    }
  }, []);

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (names) {
      setTodos((prevTodos) => [
        ...prevTodos,
        [`${names} ${surname} ${email} ${age}`],
      ]);
      setNames("");
      setSurname("");
      setEmail("");
      setAge("");
      localStorage.setItem(
        "todos",
        JSON.stringify([...todos, [`${names} ${surname} ${email} ${age}`]])
      );
      addUser();
    }
  };

  const addUser = (user) => {
    const option = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:3001/Register", option)
      .then((resp) => resp.json())
      .then((response) => {});
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={(e) => handleAddTodo(e)}>
          <label>names</label>
          <input
            type="text"
            value={names}
            onChange={(e) => setNames(e.target.value)}
          />
          <label>surname</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <label>email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <button type="submit">Add todo</button>
        </form>
        <List>
          {todos.map((todo, index) => (
            <div key={index}>
              <h3> {todo}</h3>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Register;
