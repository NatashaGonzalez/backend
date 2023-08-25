import express from "express";
import { Server } from "socket.io";
import Handlebars from "express-handlebars";
import routes from "./routes/viewsRouter.js"
import ProductsRouter from "./routes/ProductsRouter.js";
import CartsRouter from "./routes/CartsRouter.js";

import { __dirname } from "./utils.js";

const app = express();
const io = new Server(server);

const PORT = process.env.PORT ||8080;

const server = app.listen(PORT, () => 
    console.log(`Servidor está en el puerto ${PORT}`));

app.engine("handlebars", Handlebars.engine());
app.set("view engine", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);

io.on("connection", (socket) => {
    console.log("Cliente conectado");

    socket.on("ProductoAgregado", (producto) => {
        io.emit("productoAgregado", producto);
    });

    socket.on("eliminarProducto", (productoId) => {
        io.emit("eliminarProducto", productoId);
    });
});




