class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }

    getProducts() {
        return this.products;
    }

    addProduct(product) {
        if (this.products.some(p => p.code === product.code)) {
            throw new Error('El código del producto ya existe');
        }
        this.id++;
        this.products.push({ ...product, id: this.id });
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }
}

const pm = new ProductManager();
console.log(pm.getProducts()); // []

pm.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
});

console.log(pm.getProducts()); // [{...}]

try {
    pm.addProduct({
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25
    });
} catch (e) {
    console.error(e.message); // El código del producto ya existe
}

try {
    console.log(pm.getProductById(1)); // {...}
    console.log(pm.getProductById(999)); // Error
} catch (e) {
    console.error(e.message); // Producto no encontrado
}
