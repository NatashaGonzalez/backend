import express from "express";
import ProductsRouter from "./routes/ProductsRouter.js";
import CartsRouter from "./routes/CartsRouter.js";

const app = express ()

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor está en el puerto ${PORT}`);
});