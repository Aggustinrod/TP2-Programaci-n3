import './style.css';

let todosLosPersonajes = [];


async function TraerInfo() {
    try {
        const respuesta = await fetch("https://rickandmortyapi.com/api/character");
        
        if (!respuesta.ok) throw new Error("Error en la respuesta");
        
        const data = await respuesta.json();
           
        todosLosPersonajes = data.results;
        mostrarPersonajes(todosLosPersonajes);
        
    } catch (error) {
        console.error("Hubo un problema:", error);
        const mensajeEstado = document.getElementById("mensaje-estado");
        if (mensajeEstado) {
            mensajeEstado.textContent = "Error al cargar los personajes.";
        }
    }
}


function mostrarPersonajes(personajes) {
    const $gridContainer = document.getElementById("grid-catalogo");
    const $mensajeEstado = document.getElementById("mensaje-estado");
    
    $gridContainer.innerHTML = "";

    if (personajes.length === 0) {
        if ($mensajeEstado) {
            $mensajeEstado.textContent = "No se encontraron personajes con ese nombre.";
        }
        return;
    }

    if ($mensajeEstado) {
        $mensajeEstado.style.display = "none";
    }

    personajes.forEach(personaje => {
        const $tarjeta = document.createElement("div");
        $tarjeta.classList.add("tarjeta");

        $tarjeta.innerHTML = `
            <img src="${personaje.image}" alt="${personaje.name}">
            <div class="tarjeta-info">
                <h3>${personaje.name}</h3>
                <p>Origen: ${personaje.origin.name}</p>
                <p>Estado: <strong>${personaje.status}</strong></p>
                <p>Visto en: ${personaje.location.name}</p>
                <p>Especie: ${personaje.species}</p>
            </div>
        `;

        $gridContainer.appendChild($tarjeta);
    });
}


const $inputBuscador = document.getElementById("buscador");
const $btnBuscar = document.getElementById("btn-buscar");

function ejecutarBusqueda() {
    if (!$inputBuscador) return;
    
    const $textoBusqueda = $inputBuscador.value.toLowerCase().trim();

    const $personajesFiltrados = todosLosPersonajes.filter(personaje => 
        personaje.name.toLowerCase().includes($textoBusqueda)
    );

    mostrarPersonajes($personajesFiltrados);
}

if ($btnBuscar) {
    $btnBuscar.addEventListener("click", ejecutarBusqueda);
}

  
TraerInfo();






    




        
    
    
