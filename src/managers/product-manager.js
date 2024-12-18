import { promises as fs } from "fs";

class ProductManager {
    static ultId = 0; 
    constructor(path) {
        this.products = []; 
        this.path = path; 
}

    async addProduct({title, description, code, price, status, stock, category, thumbnails}) {

        const arrayProductos = await this.leerArchivo(); 

        if(!title || !description || !code || !price || !status || !stock || !category) {
            console.log("Todos los campos son obligatorios, excepto thumbnails."); 
            return; 
        }

        const nuevoProducto = {
            id: ++ProductManager.ultId,
            title, 
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        }

        arrayProductos.push(nuevoProducto);
        await this.guardarArchivo(arrayProductos); 
    }

    async deleteProduct(id) {

        const arrayProductos = await this.leerArchivo(); 
        const index = arrayProductos.findIndex(product => product.id === id);
    
        if (index === -1) {
            return("Producto no encontrado"); 
        }
    
        arrayProductos.splice(index, 1);
        await this.guardarArchivo(arrayProductos);
        return "Producto eliminado correctamente";
    }

    async getProducts() {
        const arrayProductos = await this.leerArchivo(); 
        return arrayProductos;
    }

    async getProductById(id) {
        const arrayProductos = await this.leerArchivo();
        const producto = arrayProductos.find(item => item.id === id);

        if(!producto) {
            return "Producto no encontrado"; 
        } else {
            return producto; 
        }
    }

    async updateProduct(id, updatedFields) {
        const arrayProductos = await this.leerArchivo(); 
        const index = arrayProductos.findIndex(item => item.id === id);
    
        if (index === -1) {
            return { error: "Producto no encontrado" };
        }

        delete updatedFields.id;  // no modifica el id
        arrayProductos[index] = { ...arrayProductos[index], ...updatedFields };
        await this.guardarArchivo(arrayProductos);
        return arrayProductos[index];
    }


    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))
        } catch (error) {
            console.log("Error al guardar el archivo"); 
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta); 
            return arrayProductos; 
        } catch (error) {
            if (error.code === "ENOENT") {
                console.error("Archivo no encontrado, creando uno nuevo...");
                await this.guardarArchivo([]); // Crea el archivo si no existe
                return [];
            }

            //console.log("Error al leer el archivo"); 
        }
    }
}

export default ProductManager;