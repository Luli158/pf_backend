const express = require("express"); 
const app = express(); 
const PUERTO = 8080; 

const ProductManager = require("./managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json"); 

app.get("/", (req, res) => {
    res.send("Hola mundo!"); 
})


app.get("/products", async (req, res) => {

    let limit = req.query.limit; 

    const productos = await manager.getProducts(); 
    
    if(limit) {
        res.send(productos.slice(0, limit)); 
    } else {
        res.send(productos); 
    }
})

app.get("/products/:pid",  async (req, res) => {
    let id = req.params.pid; 
    const productoBuscado = await manager.getProductById(parseInt(id)); 
    res.send(productoBuscado); 
})


app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto: ${PUERTO}`);
})