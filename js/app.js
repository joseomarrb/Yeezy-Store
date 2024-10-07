document.addEventListener("DOMContentLoaded", () => {

    //Variables:
    const productos = document.querySelector("#products");
    const listaCarrito = document.querySelector("#lista-carrito");
    const contenedorProductos = document.querySelector("tbody");
    const vaciarCarrito = document.querySelector("#vaciar-carrito");
    let articulosCarrito = [];
    
    //Contenedor de los eventos:
    contenedorEventos();
    function contenedorEventos() {
    
        productos.addEventListener("click", agregarAlCarrito);
    
        vaciarCarrito.addEventListener("click", (e) => {
            e.preventDefault();
            articulosCarrito = [];
            limpiarHTML();
        });
    }
    
    //Funciones
    function agregarAlCarrito(e) {
        e.preventDefault();
        if (e.target.classList.contains("agregar-carrito")) {
            const datos = e.target.parentElement;
            mostrarDatos(datos);
        }
    }
    
    function mostrarDatos(producto) {
        const datosProducto = {
            imagen: producto.querySelector("img").src,
            nombre: producto.querySelector(".product__name").textContent,
            precio: parseFloat(producto.querySelector(".precio-num").textContent), // Asegúrate de que el precio sea un número
            cantidad: 1,
            id: producto.querySelector("button").getAttribute("data-id"),
        };
    
        const existe = articulosCarrito.some(articulo => articulo.id === datosProducto.id);
    
        if (existe) {
            // Actualizamos la cantidad del producto existente
            articulosCarrito = articulosCarrito.map(articulo => {
                if (articulo.id === datosProducto.id) {
                    articulo.cantidad++;
                }
                return articulo;
            });
        } else {
            // Agregamos el producto nuevo al carrito
            articulosCarrito = [...articulosCarrito, datosProducto];
        }
    
        mostrarHTML();
    }
    
    function mostrarHTML() {
        limpiarHTML();
    
        articulosCarrito.forEach(producto => {
            const { imagen, nombre, precio, cantidad } = producto;
            const row = document.createElement("TR");
            row.innerHTML = `
            <td>
                <img src="${imagen}" width="90">
            </td>
            <td>${nombre}</td>
            <td style="color:red;">${cantidad}</td>
            <td>${precio * cantidad}</td> <!-- Precio total por cantidad -->
            `;
    
            contenedorProductos.appendChild(row);
        });
    }
    
    function limpiarHTML() {
        while (contenedorProductos.firstChild) {
            contenedorProductos.removeChild(contenedorProductos.firstChild);
        }
    }
    });
    