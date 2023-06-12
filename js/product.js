import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { platos } from '../js/datos.js'

// inicializaciones 
const paramsId = new URL(
  window.location.href
).searchParams.get('id');

const product = platos.find(
  data => data.id === parseInt(paramsId)
);

// capturo el html 
const main = document.getElementById('main');

// trabajo la logica
if (product) {
  main.innerHTML = `<article class="card border-0 py-5">
			<img src=${product.image} class="object-fit-contain pt-2 px-2" style="height: 250px" id="image">
			<div class="card-body">
				<h4 class="card-title" id="title">${product.title}</h4>
				<p class="pt-2">${product.description}</p>
			</div>
			<div class="card-footer d-flex flex-column pt-4 pb-3">
				<p class="h5 text-end pe-1" id="price">$${product.precio}</p>
				<div class="d-flex justify-content-between">
				<div>
						<button class="btn btn-outline-primary">+</button>
							<span class="px-2">1</span>
						<button class="btn btn-outline-primary">-</button>
				</div>
				<button class="btn btn-outline-primary">Agregar al carrito</button>
				</div>
			</div>
		</article>`;
} else {
  main.innerHTML = `<h2>404 product not found</h2>`;
}



// Pasos del creado del detallado
// 1- importo los datos del array
// 2- Importo los estilos de bootstrap desde el node.
// 3- inicializar variables:
// a- paramsId lo que hace es tomar el id de cada uno de los elementos del array desde su URL conforme su posición.
// b- hago un find() de mi array de productos para extraer su id y lo guardo en una variable.
// c- con esa dos lineas lo que hice fue tomar el id de la url y de cada producto y transformarlo en mi nueva url.
// 4- selecciono el html, es decir, donde voy a trabajar, en este caso main.
// 5- trabajo la logica para insertar el codigo html, mediante innerHtml para inyectar codigo,
// y con una simple logica creo un error 404 si es q el id de la url no coincide con algun id de mis productos.