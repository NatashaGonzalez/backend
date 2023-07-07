class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return console.log(this.products);
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        const codeProduct = this.products.some((product) => product.code === code);
        if (!codeProduct) {
            if (this.products.length === 0) {
                product.id = 1;
            } else {
                product.id = this.products[this.products.length - 1].id + 1;
            }
            this.products.push(product);
        } else {
            return console.log("No puede repetirse");
        }
    };

    getProductById = (productId) => {
        const idProduct = this.products.find((product) => product.id === productId);
        if (idProduct) {
            return console.log(idProduct);
        } else {
            return console.log("No encontrado");
        }
    };
}

const product = new ProductManager();
product.addProduct(
    "Producto prueba1",
    "Este producto es una prueba",
    200,
    "Sin img",
    "abc123",
    25
);
product.addProduct(
    "Producto prueba2",
    "Este producto es una prueba",
    200,
    "Sin img",
    "abc124",
    25
);
product.addProduct(
    "Producto prueba3",
    "Este producto es una prueba",
    200,
    "Sin img",
    "abc125",
    25
);
product.getProducts();
product.getProductById(1);
product.getProductById(4);