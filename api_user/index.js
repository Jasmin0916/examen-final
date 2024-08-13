const axios = require('axios');
const { Observable } = require('rxjs');
const { tap, catchError } = require('rxjs/operators');

const productServiceUrl = 'http://localhost:8080/api/products';
const salesServiceUrl = 'http://localhost:8081/api/sales';

// Función para obtener un producto de manera reactiva
function fetchProductReactive(productId) {
  return new Observable(observer => {
    axios.get(`${productServiceUrl}/${productId}`)
      .then(response => {
        observer.next(response); 
        observer.complete(); 
      })
      .catch(error => observer.error(error)); 
  });
}

// Función para realizar una venta de manera reactiva
function createSaleReactive(productId, quantity) {
  return new Observable(observer => {
    axios.post(salesServiceUrl, { productId, quantity })
      .then(response => {
        observer.next(response); 
        observer.complete();
      })
      .catch(error => observer.error(error)); 
  });
}

// Obtener información del producto
fetchProductReactive(1).pipe(
  tap(data => {
    console.log('Datos de Product recibido de manera reactiva:', data.data);
  }),
  catchError(error => {
    console.log('Error al consumir Product, datos:', error); 
    return []; 
  })
).subscribe();

// Realizar una venta
createSaleReactive(1, 2).pipe(
  tap(data => {
    console.log('Datos de Sale recividos reactivamente:', data.data); 
  }),
  catchError(error => {
    console.log('Error al crear venta:', error); // Manejar errores
    return []; // Retornar array vacío en caso de error
  })
).subscribe();
