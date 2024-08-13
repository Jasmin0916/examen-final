const express = require('express');
const axios = require('axios');

const app = express();
const port = 8081;

app.use(express.json()); 

// Lista de pedidos simulados
const orders = [];

// Endpoint para crear una venta
app.post('/api/sales', (req, res) => {
  console.log('Entrada', new Date());

  const { productId, quantity } = req.body;

  // Obtener información del producto desde el Servicio de Productos
  axios.get(`http://localhost:8080/api/products/${productId}`)
    .then(response => {
      const product = response.data[0];
      if (product) {
        // Calcular el precio total de la venta
        const totalPrice = product.price * quantity;
        const order = { productId, quantity, totalPrice, date: new Date() };
        orders.push(order);
        res.json({ status: 'success', order }); 
      } else {
        res.status(404).json({ status: 'error', message: 'Product not found' });
      }
    })
    .catch(error => res.status(500).json({ status: 'error', message: error.message }));
});

app.listen(port, () => {
  console.log(`Sales service listening on ${port}`);
});
