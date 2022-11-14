import { useState, useEffect } from "react";
import "./Register.css";
// import styled from "styled-components";

const Register = () => {
  const [names, setNames] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/Register")
      .then((resp) => resp.json())
      .then((response) => {
        setUsers(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (names) {
      const newUser = {
        names,
        surname,
        email,
        age,
      };

      const option = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      };
      fetch("http://localhost:3001/Register", option)
        .then((resp) => resp.json())
        .then(() => {
          setUsers((prevUsers) => [...prevUsers, newUser]);
          setNames("");
          setSurname("");
          setEmail("");
          setAge("");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleDeleteUser = (user) => {
    setUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user));
  };

  const handleDeleteId = (id) => {
    fetch(`http://localhost:3001/Register/${id}`, {
      method: "DELETE"}),
      onClick={() => handleDeleteUser(id)}
  }

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

          <button type="submit">Add user</button>
        </form>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.names} {user.surname}, {user.email}, {user.age} metai
              <span onClick={() => handleDeleteUser(user)}> X</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Register;
