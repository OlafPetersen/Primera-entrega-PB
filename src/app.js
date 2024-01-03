const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

let products = require('../productos.json');
let carts = require('../carrito.json');

// Rutas para productos
app.route('/api/products')
    .get((req, res) => {
        res.send(products);
    })
    .post((req, res) => {
        let newProduct = req.body;
        newProduct.id = generateId();
        products.push(newProduct);
        fs.writeFileSync('../productos.json', JSON.stringify(products));
        res.send(newProduct);
    });

app.route('/api/products/:pid')
    .get((req, res) => {
        let product = products.find(p => p.id == req.params.pid);
        res.send(product);
    })
    .put((req, res) => {
        let product = products.find(p => p.id == req.params.pid);
        Object.assign(product, req.body);
        fs.writeFileSync('../productos.json', JSON.stringify(products));
        res.send(product);
    })
    .delete((req, res) => {
        products = products.filter(p => p.id != req.params.pid);
        fs.writeFileSync('../productos.json', JSON.stringify(products));
        res.send(products);
    });

// Rutas para carritos
app.route('/api/carts')
    .post((req, res) => {
        let newCart = { id: generateId(), products: [] };
        carts.push(newCart);
        fs.writeFileSync('../carrito.json', JSON.stringify(carts));
        res.send(newCart);
    });

app.route('/api/carts/:cid')
    .get((req, res) => {
        let cart = carts.find(c => c.id == req.params.cid);
        res.send(cart);
    });

app.route('/api/carts/:cid/product/:pid')
    .post((req, res) => {
        let cart = carts.find(c => c.id == req.params.cid);
        let product = cart.products.find(p => p.product == req.params.pid);
        if (product) {
            product.quantity++;
        } else {
            cart.products.push({ product: req.params.pid, quantity: 1 });
        }
        fs.writeFileSync('../carrito.json', JSON.stringify(carts));
        res.send(cart);
    });

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

app.listen(8080, () => console.log('Servidor escuchando en el puerto 8080'));
