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

// GET /customer/:id (obtener cliente por id)
app.get("/customer/:id", (req, res) => {
    const customers = readData(); 
    const customer = customers.find((c) => c.id === parseInt(req.params.id)); 
    if(!customer) return res.status(404).send("Customer not found."); 
    res.json(customer); 
})