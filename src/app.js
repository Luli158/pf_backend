import express from "express"; 
import ProductManager from "./managers/product-manager.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
const app = express(); 
const PUERTO = 3000; 


const manager = new ProductManager("./src/data/productos.json"); 
app.use(express.json());  
app.use(express.urlencoded({extended: true})); 


app.use("/api/products", productsRouter); 
app.use("/api/carts", cartsRouter); 


app.get("/", (req, res) => {
    res.send("Hola mundo!"); 
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`); 
})

// app.put("/products/:id", (req, res) => {
//     let id = req.params.id; 
//     const { title, description, code, price, status, stock, category, thumbnails } = req.body; 

//     const productIndex = products.findIndex(products => products.id === id);
//     //Si lo encuentra me retorna el numero del indice del cliente buscado.
//     //Y si no lo encuentra? Me retorna un indice que no es posible: -1

//     if(productIndex !== -1) {
//         products[productIndex].title = title;
//         products[productIndex].description = description; 
//         products[productIndex].code = code; 
//         products[productIndex].price = price; 
//         products[productIndex].status = status; 
//         products[productIndex].stock = stock; 
//         products[productIndex].category = category; 
//         products[productIndex].thumbnails = thumbnails; 


//         //Verificamos por consola que todo se actualizo. 
//         console.log(products); 
//         res.send({status: "success", mensaje: "Producto actualizado"}); 
//     } else {
//         res.status(404).send({status: "error", mensaje: "Producto no encontrado"}); 
//     }
// })

// //5) DELETE: 

// app.delete("/products/:id", (req, res) => {
//     let id = req.params.id; 

//     const productIndex = products.findIndex(product => product.id === id); 

//     if(productIndex !== -1) {
//         product.splice(productIndex, 1); 
//         console.log(products);

//         res.send({status: "success", mensaje: "Producto eliminado"});
//     } else {
//         res.status(404).send({status: "error", mensaje: "El producto no existe"}); 
//     }
// })
