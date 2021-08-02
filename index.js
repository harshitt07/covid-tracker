const { urlencoded } = require('body-parser');
const { Client } = require('pg');

var express = require('express');
var app = express();

app.use(urlencoded({extended: true}));

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'covid',
    password: "",
    port: 5432,
});

app.get("/abc", (req, res) => {
    console.log("Harshit Jaiswal!!!");
    res.send("<h1>Covid Tracker</h1>");
});

app.post("/abc/registerUsers", async (req, res) => {
    console.log(req.body);
    try {
        await client.connect();
        let insertQuery = `INSERT INTO users(name, contact, pin-code) VALUES (? ? ?);`;
        let arr = [req.body.name, req.body.contact, parseInt(req.body.pinCode)];
        const result = await client.query(insertQuery, arr);
        console.log(result.rows);
        client.end();
        res.send(result.rows['id']);
    } catch (e) {
        console.log("Error Occurred!!!");
        client.end();
    }
    res.send("<h1>Submitted Successfully!</h1>");
});

app.post("/registerAdmin", async (req, res) => {
    console.log(req.body);
    try {
        await client.connect();
        let insertQuery = `INSERT INTO adminuser(name, contact, pin-code) VALUES (? ? ?);`;
        let arr = [req.body.name, req.body.contact, parseInt(req.body.pinCode)];
        const result = await client.query(insertQuery, arr);
        console.log(result.rows);
        client.end();
        res.send(result.rows['id']);
    } catch (e) {
        console.log("Error Occurred!!!");
        client.end();
    }
    res.send("<h1>Submitted Successfully!</h1>");
});

app.post("/updateCovidResult", async (req, res) => {
    try {
        await client.query();
        let updateResultQuery = `UPDATE `
    } catch (e) {

    }
});

app.listen(3000, () => {
    console.log("Server is listening on port!!!");
});