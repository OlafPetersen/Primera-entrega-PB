const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = this.getProducts();
        this.id = this.products.length;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    addProduct(product) {
        this.id++;
        this.products.push({ ...product, id: this.id });
        this.saveProducts();
    }

    getProductById(id) {
        return this.products.find(p => p.id === id);
    }

    updateProduct(id, updatedProduct) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        this.products[productIndex] = { ...updatedProduct, id };
        this.saveProducts();
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        this.products.splice(productIndex, 1);
        this.saveProducts();
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
}

const pm = new ProductManager('./products.json');
pm.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
});
console.log(pm.getProducts()); 
console.log(pm.getProductById(1)); 
pm.updateProduct(1, {
    title: 'producto prueba actualizado',
    description: 'Este es un producto prueba actualizado',
    price: 300,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 30
});
console.log(pm.getProductById(1)); 
pm.deleteProduct(1);
console.log(pm.getProducts()); 
