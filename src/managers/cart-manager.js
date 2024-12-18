import { promises as fs } from "fs";

class CartManager {
    static ultId = 0; 
    constructor(path) {
        this.products = []; 
        this.path = path; 
}


    async getCarts() {
        const arrayCarts = await this.leerArchivo(); 
        return arrayCarts;
    }

    async createCart() {
        const carts = await this.leerArchivo();

        const newCart = {
            id: ++CartManager.ultId,
            products: [] // Array vacío al inicio
        };

        carts.push(newCart);
        await this.guardarArchivo(carts);

        return newCart;
    }

    async getCartById(cid) {
        const carts = await this.leerArchivo();
        const cart = carts.find(cart => cart.id === cid);

        if (!cart) {
            return("Carrito no encontrado");
        }

        return cart;
    }

    async addProductToCart(cid, pid) {
        const carts = await this.leerArchivo();

        const cartIndex = carts.findIndex(cart => cart.id === cid);
        if (cartIndex === -1){
            return ("Carrito no encontrado")
        }

        const productIndex = carts[cartIndex].products.findIndex(prod => prod.product === pid);

        if (productIndex === -1) {
            // Si el producto no esta en el carrito, lo agrega
            carts[cartIndex].products.push({ product: pid, quantity: 1 });
        } else {
            // Si ya existe, incrementa la cantidad
            carts[cartIndex].products[productIndex].quantity++;
        }

        await this.guardarArchivo(carts);
        return carts[cartIndex];
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            return JSON.parse(respuesta);
        } catch (error) {
            if (error.code === "ENOENT") {
                console.error("Archivo no encontrado, creando uno nuevo...");
                await this.guardarArchivo([]);
                return [];
            }
        }
    }
    async guardarArchivo(data) {
        try {
            await fs.writeFile(this.path, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("Error al guardar el archivo", error);
        }
    }

}

export default CartManager;