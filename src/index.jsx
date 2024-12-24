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
}); 

// POST /customer (crear un nuevo cliente)
app.post("/customer", (req, res) => {
    const newCustomer = {
        id: cuustomers.length + 1, 
        ...req.body
    }; 
    customers.push(newCustomer); 
    res.status(201).json(newCustomer)
}); 

// PUT /customer/:id (actualizar cliente)
app.put("/customer/:id", (req, res) => {
    const customers = readData();
    const customerIndex = customers.findIndex((c) => c.id === parseInt(req.params.id));
    if (customerIndex === -1) return res.status(404).send("Customer not found.");
    customers[customerIndex] = { ...customers[customerIndex], ...req.body };
    writeData(customers);
    res.json(customers[customerIndex]);
}); 

app.delete("/customer/:id", (req, res) => {
    let customers = readData(); 
    customers = customers.filter((c) => c.id !== parseInt(req.params.id)); 
    writeData(customers); 
    res.status(204).send(); 
}); 

const PORT = 5000; 
app.listen (PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

