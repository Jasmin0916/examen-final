const express = require('express');
const { from } = require('rxjs');
const { filter, map } = require('rxjs/operators');

const app = express();
const port = 8080;

// Datos simulados de productos
const products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Celular', price: 500 },
  { id: 3, name: 'Tablet', price: 300 },
];

// Endpoint para obtener un producto por su ID
app.get('/api/products/:id', (req, res) => {
  console.log('Entrada', new Date());

  // ID del producto que se quiere obtener
  const productId = parseInt(req.params.id, 10);
  let processData = [];

  // Convertir los datos de productos en un Observable
  const observable = from(products);

  // Filtrar el producto por ID y mapear el resultado
  observable.pipe(
    filter(product => product.id === productId),
    map(product => ({ id: product.id, name: product.name, price: product.price, available: true }))
  )
  .subscribe({
    next: value => { processData.push(value); },
    complete: () => {
      console.log('Salida', new Date());
      res.json(processData); 
    }
  });
});

app.listen(port, () => {
  console.log(`Product service listening on ${port}`);
});
