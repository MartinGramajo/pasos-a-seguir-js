import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { platos } from '../js/datos.js'

// inicio variables
const products = platos

// capturo el html 
const articulos = document.getElementById('articulos');


// trabajo la logica
export const renderProducts = (array, id) => {
  id.innerHTML = '',
    array.forEach(data => {
      // 1 Creo el contenedor o primer elemento
      const card = document.createElement('div');
      card.className = 'col';
      // 2 Inyecto a este elemento el resto del codigo
      card.innerHTML = `
        <article class="card h-100">
            <img src=${data.image} class="object-fit-contain pt-2 px-2" alt=${data.title} style="height: 150px">
          <div class="card-body">
            <h6 class="card-title text-center">${data.title}</h6>
            <p class="h5 text-center">$${data.precio}</p>
          </div>
          <div class="card-footer d-flex flex-column">
          <a href="/producto/index.html?id=${data.id}" class="btn btn-outline-primary">Ver</a>
          </div>
        </article>
    `;
      // 3 Anexo este objeto al div que esta en el html
      articulos.appendChild(card);
    });
}