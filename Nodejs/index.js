const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());

const mysqlConfig = {
  host: "mysql-egzas-do-user-12331930-0.b.db.ondigitalocean.com",
  user: "doadmin",
  password: "AVNS_ZhHABZR3r5IQFmMP0KR",
  database: "defaultdb",
  port: "25060",
};

app.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    // "CREATE TABLE Register(PersonID int, names varchar(255),surname varchar(255),email varchar(255), age varchar(255), PRIMARY KEY(PersonID))"
    res.send("Success");
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.get("/Register", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const register = req.body;
    const response = await con.execute(
      "SELECT * FROM defaultdb.Register ORDER BY PersonID"
    );

    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.post("/Register", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    // {names: "", surname: "", email: "", age: ""}
    console.log(req.body);
    const response = await con.execute(
      `INSERT INTO defaultdb.Register (names, surname, email, age) values ('${req.body.names}', '${req.body.surname}', '${req.body.email}', ${req.body.age});`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.delete("/Register/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const response = await con.execute(
      `DELETE FROM Register WHERE PersonID=${req.params.id}`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found:(");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
