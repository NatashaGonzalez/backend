import Router from "express";
import ProductManager from "../managers/ProductManager.js";
import {__dirname} from "../utils.js";
import { io } from "../your_socket_io_instance.js";

const manager = new ProductManager(__dirname + "/files/products.json");
const router = Router();

io.on("connection", (socket) => {
    console.log("Cliente conectado");

    // Manejo del evento para agregar un producto
    socket.on("agregarProducto", async (producto) => {
        const newProduct = await manager.addProduct(producto);

        if (newProduct !== "El código ingresado ya existe" && newProduct !== "Se debe completar todos los campos") {
            io.emit("productoAgregado", newProduct);
        }
    });

    // Manejo del evento para eliminar un producto
    socket.on("eliminarProducto", async (productId) => {
        const deletedProduct = await manager.deleteProduct(productId);

        if (deletedProduct === "Producto eliminado") {
            io.emit("productoEliminado", productId);
        }
    });
});

router.get("/products", async (req, res) => {
    const {limit} = req.query;
    const products = await manager.getProducts();
    if (limit) {
        const limitproducts = products.slice(0, limit);
        res.json({status: "success", limitproducts})

    } else {
        res.json({status: "success", products})
    }
});

router.get("/products/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await manager.getProductsById(id);
    if (product === "Not Found") {
        res.status(400).json({
            message: "Producto no encontrado"
        });
    } else if (product) {
        res.status(200).json(product);
    } else {
        res.status(400).json({
            message: "Producto no encontrado"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const product = await manager.addProduct(req.body);
        if (product === "El código ingresado ya existe") {
            res.status(400).json({
                message: "Error al crear el producto",
                product
            });
        } else if (product === "Se debe completar todos los campos") {
            res.status(400).json({
                message: "Error al crear el producto",
                product
            });
        } else {
            res.status(201).json({
                message: "Producto creado",
                product
            });
        }
    } catch (error) {
        throw new Error("Error al crear el producto", Error);
    }
});
router.put("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await manager.updateProduct(id, req.body);
    if (product) {
        res.status(200).json({
            message: "Producto actualizado",
            product
})
        
    } else {
        res.status(400).json({
            message: "Error al actualizar el producto"
        });
    }
});

router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await manager.deleteProduct(id);
    if (product === "No se encuentra el producto con el id :" + id) {
        res.status(400).json({
            message: "Error al eliminar el producto",
            product
        });
    } else if (product === "Producto eliminado"){
    }  else {
        res.status(400).json({
            message: "Error interno del servidor al eliminar el producto"
        });
    }
});

export default router;