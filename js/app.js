let carrito = []

const contenedorProductos = document.getElementById('contenedorProductos')
const contenedorCarrito = document.getElementById('carritoContenedor')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')



///////////////////////////////


//////////////////////////////////
mostrarProductos(arrayProductos);


function mostrarProductos(array){
    contenedorProductos.innerHTML = ''

    array.forEach(element => {
        let div = document.createElement('div')
        div.classList.add('element')
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

        botonAgregar.addEventListener('click', () =>{
         agregarAlCarro(element.id)
       })

    });

}

/////////////////////////////
function agregarAlCarro(id){
    let verificar = carrito.find(element => element.id == id)
    if(verificar){
        verificar.cantidad = verificar.cantidad + 1
        document.getElementById(`cantidad${verificar.id}`).innerHTML = 
                `<p id="cantidad${verificar.id}">Cantidad:${verificar.cantidad}</p>`
        actualizarCarrito()
        
    }else{
        
        let productoAgregar = arrayProductos.find(element => element.id == id)
        carrito.push(productoAgregar)
        ///
        
        actualizarCarrito()

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

        btnEliminar.addEventListener('click', () =>{
            if(productoAgregar.cantidad ==1){
                btnEliminar.parentElement.remove()
                carrito = carrito.filter(element => element.id != productoAgregar.id)
                
                actualizarCarrito()

            }else{
                productoAgregar.cantidad = productoAgregar.cantidad - 1
                document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `
                                    <p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p> 
                `
                actualizarCarrito()
            }

        })

    }
    
}

/////////////////////////////
function actualizarCarrito(){
    contadorCarrito.innerText = carrito.reduce((acc, el)=> acc + el.cantidad, 0)
    precioTotal.innerText = carrito.reduce((acc, el)=> acc + (el.precio * el.cantidad), 0 )


    localStorage.setItem('carrito', JSON.stringify(carrito));

}


//funcion para que al comprar disminuya el numero de stock en el arrayProductos 
//que en el modal de carrito se muestre lo ya almacenado en el storage///// carrito = JSON.parse(localStorage.getItem('carrito'))



