import express from "express"; 
import ProductManager from "./managers/product-manager.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
const app = express(); 
const PUERTO = 8080; 


const manager = new ProductManager(); 
app.use(express.json());  
app.use(express.urlencoded({extended: true})); 

//Rutas
app.use("/api/products", productsRouter); 
app.use("/api/carts", cartsRouter); 


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
