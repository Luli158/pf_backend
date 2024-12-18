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

router.put("/:pid", async (req, res) => {
    const { pid } = req.params; 
    const updatedFields = req.body; 

    if (Object.keys(updatedFields).length === 0) {
        return res.status(400).send({ status: "error", message: "No se enviaron campos para actualizar" });
    }

    try {
        const updatedProduct = await manager.updateProduct(parseInt(pid), updatedFields);

        if (updatedProduct.error) {
            return res.status(404).send({ status: "error", message: updatedProduct.error });
        }

        res.send({ status: "success", message: "Producto actualizado correctamente", product: updatedProduct });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al actualizar el producto" });
    }
});

router.delete("/:pid", async(req, res) => {
    const pid = parseInt(req.params.pid);
    try {
        const deletedProduct = await manager.deleteProduct(parseInt(pid));
        res.send({ status: "success", message: deletedProduct });
    } catch (error){
        if (error.message === "Producto no encontrado") {
            res.status(404).send({ status: "error", message: error.message });
        } else {
            res.status(500).send({ status: "error", message: "Error al eliminar el producto" });
        }
    }
});

export default router;
