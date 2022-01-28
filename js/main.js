let carrito = [];
let arrayProductos = [];


const contenedorProductos = document.getElementById('contenedorProductos')
const contenedorCarrito = document.getElementById('carritoContenedor')
const botonComprar = document.getElementById('comprar');
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')
const buscador = document.getElementById('buscador');


// Buscador filtro de articulos en la web
buscador.addEventListener('change', (e) => {
    
    let valorCapturado = e.target.value.toLowerCase();
    console.log(valorCapturado)
    console.log(arrayProductos.filter(producto =>producto.tipo))
    if(valorCapturado == 'todos' || valorCapturado == ""){
        mostrarProductos(arrayProductos)
    }else{
        mostrarProductos(arrayProductos.filter(producto => producto.tipo.toLowerCase() == valorCapturado))
    }
})

buscador.addEventListener('keyup', (e)=>{
    if (e.key === "Escape") {
        e.target.value = ""
        mostrarProductos(arrayProductos)
    }                  
})
                    
                    
                    
///////////////////////////////metodo get ajax para mostrar productos desde un JSON local
$.getJSON('/stock.json', function (data) {
    data.forEach(element => arrayProductos.push(element))
    mostrarProductos(arrayProductos);
    recuperar()
})





////////////////////////////////// MUESTRA PRODUCTOS EN EL DOM

function mostrarProductos(array) {
    contenedorProductos.innerHTML = ''

    array.forEach(element => {
        let div = document.createElement('div')
        div.classList.add('col-12')
        div.classList.add('col-sm-6')
        div.classList.add('col-md-4')
        div.classList.add('col-lg-3')
        div.innerHTML += `
    
                <div class="card" style="width: 18rem;">
                    <img src="${element.img}" class="card-img-top" alt="${element.img}">
                    <div class="card-body">
                        <h5 class="card-title">${element.nombre}</h5>
                        <p class="card-text">Color: ${element.color}</p>
                        <p class="card-text">Tamaño: ${element.tamano}</p>
                        <p class="card-text">$${element.precio}</p>
                        <a href="#" id="boton${element.id}" class="btn btn-primary">Agregar al carrito</a>
                    </div>
                </div>
        `
        contenedorProductos.appendChild(div)

        let botonAgregar = document.getElementById(`boton${element.id}`)

        botonAgregar.addEventListener('click', () => {
            agregarAlCarro(element.id)
        })

    });

}

/////////////////////////////Agrega al carrito
function agregarAlCarro(id) {
    let verificar = carrito.find(element => element.id == id)
    if (verificar) {
        verificar.cantidad = verificar.cantidad + 1
        document.getElementById(`cantidad${verificar.id}`).innerHTML =
            `<p id="cantidad${verificar.id}">Cantidad:${verificar.cantidad}</p>`

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto se ha agregado al carrito',
            showConfirmButton: false,
            timer: 1500
        })

        actualizarCarrito()
    } else {

        let productoAgregar = arrayProductos.find(element => element.id == id) //busca el boton para agregar al carro y devuelve el obj de ese producto
        carrito.push(productoAgregar)

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto se ha agregado al carrito',
            showConfirmButton: false,
            timer: 1500
        })

        actualizarCarrito()
        mostrarelCarrito(productoAgregar)

    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

/////////////////////////////logica mostrar y eliminar producto del carrito separada

function mostrarelCarrito(productoAgregar) {

    let divCreado = document.createElement('div')
    divCreado.classList.add('productoEnCarrito')
    divCreado.innerHTML = `
                        <p>${productoAgregar.nombre}</p>
                        <p>Precio:$${productoAgregar.precio}</p>
                        <p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>
                        <button id="eliminar${productoAgregar.id}" type="button" class="btn btn-danger">Eliminar del carrito</button>
        `
    contenedorCarrito.appendChild(divCreado)

    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

    btnEliminar.addEventListener('click', () => {
        if (productoAgregar.cantidad == 1) {
            btnEliminar.parentElement.remove()
            carrito = carrito.filter(element => element.id != productoAgregar.id)
            localStorage.setItem('carrito', JSON.stringify(carrito))
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'El producto se ha eliminado del carrito',
                showConfirmButton: false,
                timer: 1500
            })
            actualizarCarrito()

        } else {
            productoAgregar.cantidad = productoAgregar.cantidad - 1
            document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `
                                    <p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p> 
                `
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'El producto se ha eliminado del carrito',
                showConfirmButton: false,
                timer: 1500
            })
            actualizarCarrito()
            localStorage.setItem('carrito', JSON.stringify(carrito))
        }

    })


}

// recupera los productos del carrito desde local storage
function recuperar() {
    let recuperoLS = JSON.parse(localStorage.getItem('carrito'))
    if (recuperoLS) {
        recuperoLS.forEach(item => {
            carrito.push(item)
            mostrarelCarrito(item)
            actualizarCarrito()
        })
    }
}



///////////////////////////// Actualiza cantidad y precio en el carrito
function actualizarCarrito() {
    contadorCarrito.innerText = carrito.reduce((acc, el) => acc + el.cantidad, 0) // incrementa la cantidad de productos seleccionados
    precioTotal.innerText = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0) // multipica el precio por la cantidad de productos seleccionados


    localStorage.setItem('carrito', JSON.stringify(carrito));

}

//////////////////////////// Simulacion de compra Ajax metodo POST
botonComprar.innerHTML = `<button id="btnComprar" class="btn btn-primary">Comprar</button>`

$('#btnComprar').on('click', () => {
    $.post("http://jsonplaceholder.typicode.com/posts", JSON.stringify(carrito), function (data, estado) {
        console.log(data)
        if (estado) {
            $('#carritoContenedor').empty()
            $('#carritoContenedor').append('<p>Su compra ha sido realizada</p>')

            carrito = []
            localStorage.clear()
            actualizarCarrito()

        }


    })
})
//funcion para que al comprar disminuya el numero de stock en el arrayProductos 