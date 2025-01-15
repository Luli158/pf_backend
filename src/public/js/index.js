const socket = io();

socket.on("productos", (data) => {
    renderProducts(data);
})

const renderProducts = (productos) => {
    const contenedorProducts = document.getElementById("contenedorProducts")
    contenedorProductos.innerHTML = "";
    productos.forEach(item => {
        const card = document.createElement("div");

        card.innerHTML = `
                                <p> ${item.title} <p>
                                <p> ${item.price} <p>
                                <p> ${item.description} <p>
                                <button> Eliminar </button>
                        `
        contenedorProductos.appendChild(card);
         
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id); 
        })
    })
}

const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id); 
}

document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto(); 
})

const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        thumbnails: document.getElementById("thumbnails").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true",
    }

    socket.emit("agregarProducto", producto); 
}