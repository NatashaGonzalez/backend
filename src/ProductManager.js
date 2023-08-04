import {promises as fs} from "fs";

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try {
            const products = await this.getProducts();
            const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            const newProduct = {
                id,
                ...product
            };
            products.push(newProduct);
            await this.saveProducts(products);
            return newProduct;
        } catch (error) {
            throw new Error(`Error al agregar: ${error}`);
        }
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            if (error.code === "ENOENT") {

                return [];
            } else {
                throw new Error(`Error al leer: ${error}`);
            }
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            return products.find((product) => product.id === id) || null;
        } catch (error) {
            throw new Error(`No se consigue el producto con el ID: ${error}`);
        }
    }

    async updateProduct(id, fieldsToUpdate) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((product) => product.id === id);
            if (index !== -1) {
                const updatedProduct = {
                    ...products[index],
                    ...fieldsToUpdate
                };
                products[index] = updatedProduct;
                await this.saveProducts(products);
                return updatedProduct;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error}`);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((product) => product.id === id);
            if (index !== -1) {
                products.splice(index, 1);
                await this.saveProducts(products);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(`No se puede borrar el producto: ${error}`);
        }
    }

    async saveProducts(products) {
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
        } catch (error) {
            throw new Error(`No se puede guardar el producto: ${error}`);
        }
    }
}

async function test() {
    const productManager = new ProductManager("products2.json");

    await productManager.addProduct({
        title: "Producto prueba1",
        description: "Este producto es una prueba",
        price: 100,
        thumbnail: "Sin img",
        code: "abc123",
        stock: 10,
    });

    await productManager.addProduct({
        title: "Producto prueba2",
        description: "Este producto es una prueba",
        price: 500,
        thumbnail: "Sin img",
        code: "abc129",
        stock: 25,
    });

    await productManager.addProduct({
        title: "Producto prueba3",
        description: "Este producto es una prueba",
        price: 550,
        thumbnail: "Sin img",
        code: "abc125",
        stock: 30,
    });

    await productManager.addProduct({
        title: "Producto prueba4",
        description: "Este producto es una prueba",
        price: 600,
        thumbnail: "Sin img",
        code: "abc126",
        stock: 40,
    });

    const allProducts = await productManager.getProducts();
    console.log("Todos los productos:", allProducts);

    const productId = 2;
    const productById = await productManager.getProductById(productId);
    console.log(`Producto con ID ${productId}:`, productById);

    const productToUpdate = await productManager.getProductById(productId);
    if (productToUpdate) {
        const updatedProduct = await productManager.updateProduct(productId, {
            price: 600,
            stock: 30,
        });
        console.log("El producto fue actualizado:", updatedProduct);
    }

    const productToDelete = await productManager.getProductById(productId);
    if (productToDelete) {
        const deleted = await productManager.deleteProduct(productId);
        if (deleted) {
            console.log(`Producto con el ID ${productId} se eliminó correctamente.`);
        } else {
            console.log(`No se encontró este producto ${productId}.`);
        }
    }
}

test().catch((error) => console.error(error));

export default ProductManager;