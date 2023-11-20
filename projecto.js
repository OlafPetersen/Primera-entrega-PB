class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error('Todos los campos son obligatorios');
        }
        if (this.products.some(p => p.code === product.code)) {
            throw new Error('El código del producto ya existe');
        }
        this.id++;
        this.products.push({ ...product, id: this.id });
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error('Not found');
            return;
        }
        return product;
    }
}

const pm = new ProductManager();
console.log(pm.getProducts()); // []

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
    console.error(e.message); //Todos los campos son obligatorios
}

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

console.log(pm.getProductById(1)); // {...}
console.log(pm.getProductById(999)); // Not found
