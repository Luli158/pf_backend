import { Router } from "express";
const router = Router(); 

const carts = []; 

router.get("/", (req, res) => {
    res.send(carts); 
})

router.post("/", (req, res) => {
    const newCart = req.body; 
    products.push(newCart);
    res.send({status:"success", mensaje: "Tarjeta creada correctamente"}); 
})

export default router;