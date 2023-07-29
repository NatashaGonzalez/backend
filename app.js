//falta agregar la importación a productmanager

import express from "express";
//import ProductManager from "./ProductManager.js";
//const manager = new ProductManager ("../files/products.json") dónde está?

const app = express ()
const PORT = 8080;

app.get("/products", async (req, res) => {
    const {limit} = req.query
    const products = await manager.getproducts()
    if(limit) {
        const limitproducts = products.slice (0,limit)
        res.json({status:"success",limitproducts})
    }
    else{
        res.json({status:"success",products})
    }
    
})

app.get ("/products/:pid", async (req, res) => {
    const {pid} = req.params

    const products =await manager.getproducts()
    const productfind = products.find(e => e.id === parseInt(pid))
    console.log(productfind);
    res.send ({status:"success", productfind})
})

app.listen (PORT,() => {
    console.log ("Está funcionando")
});