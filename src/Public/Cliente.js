const socket = io();

socket.on("productoAgregado", (producto) => {
    const listaProductos = document.getElementById("realTimeProducts");
    const nuevoProducto = document.createElement("li");
    nuevoProducto.textContent = producto.title;
    listaProductos.appendChild(nuevoProducto);
});

socket.on("productoEliminado", (productoId) => {
    const listaProductos = document.getElementById("realTimeProducts");
    const productoAEliminar = listaProductos.querySelector(`li[data-id="${productoId}"]`);
    if (productoAEliminar) {
        listaProductos.removeChild(productoAEliminar);
    }
});

