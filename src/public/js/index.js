const socket = io();

socket.on("productos", (data) => {
    renderProducts(data);
})

const renderProducts = (productos) => {
    const contenedorProducts = document.getElementById("contenedorProducts")
    contenedorProducts.innerHTML = "";
    productos.forEach(item => {
        const card = document.createElement("div");

        card.innerHTML = `
                    <div class="col-md-4 product-card">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text">${item.description}</p>
                                <ul class="list-unstyled">
                                <li><strong>id:</strong> ${item.id}</li>
                                    <li><strong>Code:</strong> ${item.code}</li>
                                    <li><strong>Price:</strong> ${item.price}</li>
                                    <li><strong>Status:</strong> ${item.status}</li>
                                    <li><strong>Stock:</strong> ${item.stock}</li>
                                    <li><strong>Category:</strong> ${item.category}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button class="boton"> Eliminar </button>
                        `
        contenedorProducts.appendChild(card);
         
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