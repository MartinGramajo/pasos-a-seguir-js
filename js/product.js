import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { platos } from '../js/datos.js'

// inicializaciones 
const paramsId = new URL(
	window.location.href
).searchParams.get('id');

const product = platos.find(
	data => data.id === parseInt(paramsId)
);

// inicializo para guardar en local storage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// capturo el html 
const main = document.getElementById('main');

// trabajo la logica

// mostrar la cantidad de productos que agregue al carrito en el navbar 
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
						<button class="btn btn-outline-primary" id="sumar">+</button>
							<span class="px-2" id="cantidad">1</span>
						<button class="btn btn-outline-primary" id="restar">-</button>
				</div>
				<button class="btn btn-primary" id="addToCart">Agregar al carrito</button>
				</div>
			</div>
		</article>`;

	//IMPORTANTE: SI VOY A INYECTAR CÓDIGO HTML POR JS, TODAS MIS VARIABLES Y CAPTURA QUE HAGA DEL HTML
	// DEBEN SER POR DEBAJO DEL CODIGO INYECTADO PARA EVITAR INCONVENIENTES DEL LADO DEL USUARIO.
	// En este caso voy agregar un contador de productos y el agregar al carrito
	// por ende al estar mis id con los cuales voy a trabajar en js dentro del codigo inyectado
	// debo inicializarlo por debajo del codigo que voy a inyectar.

	// CONTADOR DE PRODUCTOS 
	// capturo html de mi codigo inyectado
	const cantidad = document.getElementById('cantidad');
	const sumar = document.getElementById('sumar');
	const restar = document.getElementById('restar');

	// trabajo su logica
	sumar.addEventListener('click', () =>
		(cantidad.innerText = parseInt(cantidad.innerText) + 1)
	)
	restar.addEventListener('click', () =>
		(cantidad.innerText > 1 && (cantidad.innerText = parseInt(cantidad.innerText) - 1))
	)

	// GUARDAR EN LOCAL STORAGE MEDIANTE LA FUNCTION ADD()
	const addToCart = document.getElementById('addToCart');
	addToCart.addEventListener('click', () => (
		// por medio de parámetros les mando los datos de mi producto. 
		add(
			product.id,
			product.title,
			product.precio,
			cantidad.innerHTML,
		)
	))

} else {
	main.innerHTML = `<h2>404 product not found</h2>`;
}


// Agregando local Storage
// function para guardar en local storage
const add = (id, titulo, precio, q) => {
	// Control de duplicado (para evitar que en local storage se llene del mismo elemento)
	let exists = -1; // no existe elemento.

	// reduce(): recorre un array y devuelve un valor unico.
	cart.forEach((item, i) => (
		item.id === id) && (exists = i));

	if (exists === -1) {
		// pusheamos items al cart 
		cart.push({
			id: id,
			titulo: titulo,
			price: precio,
			q: parseInt(q)
		})
	} else {
		cart[exists].q += parseInt(q)
		// guardamos en localstorage
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	//IMPORTANTE: tengo q volver a llamar la funcion para actualizar el carrito 
	// renderCart()
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





