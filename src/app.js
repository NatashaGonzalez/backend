import express from "express";
import http from "http";
import { Server } from "socket.io";
import exphbs from "express-handlebars";
import routes from "./routes/viewsRouter.js"
import ProductsRouter from "./routes/ProductsRouter.js";
import CartsRouter from "./routes/CartsRouter.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 2023;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);

io.on("connection", (socket) => {
    console.log("Cliente conectado");

    socket.on("agregarProducto", (producto) => {
        io.emit("productoAgregado", producto);
    });

    socket.on("eliminarProducto", (productoId) => {
        io.emit("productoEliminado", productoId);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor está en el puerto ${PORT}`);
});


