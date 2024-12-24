const express = require('express'); 
const fs = require('fs'); 
const path = require('path'); 
const app = express(); 

app.use(express.json()); 

const dataFilePath = path.join(__dirname, "data.json"); 

const readData = () => {
    const data = fs.readFileSync(dataFilePath, "utf-8"); 
    return JSON.parse(data); 
};

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2)); 
}; 

// GET /customer/ (lista de clientes)
app.get("/customer", (req, res) => {
    const customer = readData(); 
    res.json(customer); 
});