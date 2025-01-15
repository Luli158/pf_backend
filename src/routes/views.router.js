import { Router } from "express";
import ProductManager from "../managers/product-manager.js";
const router = Router();
const manager = new ProductManager("./src/data/productos.json");

router.get("/", (req, res) => {
    res.render("index");
})


router.get("/products", async (req, res) => {
    try {
        const products = await manager.getProducts(); 
        res.render("home", {products})
    } catch (error) {
        res.status(500).send("Error fatal");
    }
})


router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
})

export default router; 