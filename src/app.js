import express from "express"; 
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import ProductManager from "./managers/product-manager.js";

const app = express(); 
const PUERTO = 8080; 
const httpServer = app.listen(PUERTO, () => console.log(`Escuchando en el puerto: ${PUERTO}`)); 
const io = new Server(httpServer); 
const manager= new ProductManager("./src/data/productos.json");

app.use(express.json());  
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public"));

app.use("/api/products", productsRouter); 
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

io.on("connection", async(socket) =>{
    console.log("Un cliente se conecto");

    socket.emit("productos", await manager.getProducts());
    socket.on("agregarProducto", async (producto) => {
        await manager.addProduct(producto); 
        io.sockets.emit("productos", await manager.getProducts())

    })

    socket.on("eliminarProducto", async (id) => {
        await manager.deleteProduct(id);
        io.sockets.emit("productos", await manager.getProducts()); 

      })

})
