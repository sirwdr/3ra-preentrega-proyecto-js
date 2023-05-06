

let listaProductos = [];

function agregarProducto(event) {
  event.preventDefault();


  const nombre = document.getElementById("nombreProducto").value.trim();
  const precio = parseFloat(document.getElementById("precioProducto").value);
  const stock = parseInt(document.getElementById("stockProducto").value);

  
  if (isNaN(precio) || isNaN(stock) || nombre === "") {
    Swal.fire({
      title: "Error",
      text: "Datos incorrectos, por favor intenta nuevamente",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }


  const nuevoProducto = {
    nombre: nombre,
    precio: precio,
    stock: stock,
  };

  
  if (listaProductos.some((producto) => producto.nombre === nuevoProducto.nombre)) {
    Swal.fire({
      title: "Error",
      text: "El producto ya se encuentra en la lista",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }

  
  listaProductos.push(nuevoProducto);

  // Limpiar los inputs del formulario
  document.getElementById("nombreProducto").value = "";
  document.getElementById("precioProducto").value = "";
  document.getElementById("stockProducto").value = "";

  // Actualizar la tabla de productos
  actualizarTablaProductos();
}

function actualizarTablaProductos() {
  const filtroNombre = document.getElementById("filtroNombre").value.trim().toLowerCase();
  const tbody = document.getElementById("listaProductos");
  tbody.innerHTML = "";

  listaProductos.filter(producto => producto.nombre.toLowerCase().includes(filtroNombre)).forEach((producto) => {
    const tr = document.createElement("tr");
    const tdNombre = document.createElement("td");
    const tdPrecio = document.createElement("td");
    const tdStock = document.createElement("td");
    tdNombre.textContent = producto.nombre;
    tdPrecio.textContent = `$${producto.precio}`;
    tdStock.textContent = producto.stock;
    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdStock);
    tbody.appendChild(tr);
  });
}

const formulario = document.querySelector("form");
formulario.addEventListener("submit", agregarProducto);

const filtroNombre = document.getElementById("filtroNombre");
filtroNombre.addEventListener("input", actualizarTablaProductos);

