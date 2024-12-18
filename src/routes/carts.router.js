import { Router } from "express";
import CartManager from "../managers/cart-manager.js";
import ProductManager from "../managers/product-manager.js";

const router = Router();
const manager = new CartManager("./src/data/carts.json");
const productManager = new ProductManager("./src/data/productos.json");


router.get("/", async (req, res) => {

    let limit = req.query.limit; 

    const carts = await manager.getCarts(); 
    
    if(limit) {
        res.send(carts.slice(0, limit)); 
    } else {
        res.send(carts); 
    }
})

router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);

    try {
        const cart = await manager.getCartById(cartId);
        res.send(cart.products);
    } catch (error) {
        res.status(404).send({ status: "error", message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const newCart = await manager.createCart();
        res.send({ status: "success", message: "Carrito creado correctamente", cart: newCart });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al crear el carrito" });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    try {
        // Validar que el producto existe antes de agregarlo al carrito
        const product = await productManager.getProductById(productId);
        if (!product) {
            return res.status(404).send({ status: "error", message: "Producto no encontrado" });
        }

        const updatedCart = await manager.addProductToCart(cartId, productId);
        res.send({ status: "success", message: "Producto agregado al carrito", cart: updatedCart });
    } catch (error) {
        res.status(404).send({ status: "error", message: error.message });
    }
});

export default router;