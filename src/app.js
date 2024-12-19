import express from "express"; 
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
const app = express(); 
const PUERTO = 8080; 

app.use(express.json());  
app.use(express.urlencoded({extended: true})); 


app.use("/api/products", productsRouter); 
app.use("/api/carts", cartsRouter); 

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`); 
})
