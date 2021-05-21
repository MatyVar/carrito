//variables

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

        //Vaciar el carrito
        vaciarCarritoBtn.addEventListener('click',()=>{
            articulosCarrito = []; //reseteamos el arreglo
            limpiarHtml();
    
        })

  
}
  //Elimina cursos del carrito
  function eliminarCurso(e){
      console.log(e.target.classList)
      if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter (curso => curso.id !== cursoId);

        carritoHTML(); //iterar sobre el carrito y mostrar su html

      };

  }
//funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        carritoHTML();
    }
}

//lee el contenido del html al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso) {

    //crea un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;//retorna el objeto actualiazado
                return curso; //retorna los objetos que no son duplicados
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    console.log(articulosCarrito);
}

//Muestra el carrito de compras en el Html
function carritoHTML() {
    //limpiar el Html
    limpiarHtml();
    //Recorre el carrito y genera el Html
    articulosCarrito.forEach(curso => {
        //utiliza distructure
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src = "${imagen}" width="100">
        </td>
        <td>
        ${titulo}
        </td>
        <td>
        ${precio}
        </td>
            <td>
               ${cantidad}
            </td>
            <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
         </td>
            `;
        //Agrega el Html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}
//elimina los cursos del tbody
function limpiarHtml() {
    //forma lenta
    contenedorCarrito.innerHTML = '';
    //forma rapida:
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}