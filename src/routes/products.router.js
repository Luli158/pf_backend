import { Router } from "express";
import ProductManager from "../managers/product-manager.js";

const router = Router();
const manager = new ProductManager("./src/data/productos.json");

router.get("/", async (req, res) => {

    let limit = req.query.limit; 

    const productos = await manager.getProducts(); 
    
    if(limit) {
        res.send(productos.slice(0, limit)); 
    } else {
        res.send(productos); 
    }
})

router.post("/", async (req, res) => {
    const newProduct = req.body;

    if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.status || !newProduct.stock || !newProduct.category) {
        return res.status(400).send({ status: "error", message: "Todos los campos son obligatorios." });
    }

    try {
        await manager.addProduct(newProduct);
        res.send({ status: "success", message: "Producto creado correctamente", product: newProduct });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al guardar el producto" });
    }
});


export default router;
