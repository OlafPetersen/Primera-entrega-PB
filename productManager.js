const fs = require('fs');
const express = require('express');
const app = express();
const port = 8080;

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

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
}

const pm = new ProductManager('./products.json');

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        res.send(pm.getProducts().slice(0, limit));
    } else {
        res.send(pm.getProducts());
    }
});

app.get('/products/:id', (req, res) => {
    const product = pm.getProductById(Number(req.params.id));
    if (!product) {
        res.status(404).send({ error: 'Producto no encontrado' });
    } else {
        res.send(product);
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
