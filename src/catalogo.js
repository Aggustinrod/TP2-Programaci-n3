import './style.css';

let todosLosPersonajes = [];



async function TraerInfo() {
    try {
        let personajesTotales = [];

        for (let i = 1; i <= 2; i++) {
            const respuesta = await fetch(`https://rickandmortyapi.com/api/character/?page=${i}`);
            
            if (!respuesta.ok) throw new Error(`Error al cargar la página ${i}`);
            
            const data = await respuesta.json();
            personajesTotales = personajesTotales.concat(data.results);
        }
        
        todosLosPersonajes = personajesTotales;
        mostrarPersonajes(todosLosPersonajes);
        
    } catch (error) {
        console.error("Hubo un problema:", error);
        const $mensajeEstado = document.getElementById("mensaje-estado");
        if ($mensajeEstado) {
            $mensajeEstado.textContent = "Error al cargar los personajes.";
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
const $formBuscar = document.getElementById("form-buscar");

function ejecutarBusqueda() {
    if (!$inputBuscador) return;
    
    const $textoBusqueda = $inputBuscador.value.toLowerCase().trim();

    const $personajesFiltrados = todosLosPersonajes.filter(personaje => 
        personaje.name.toLowerCase().includes($textoBusqueda)
    );

    mostrarPersonajes($personajesFiltrados);
}

if ($formBuscar) {
        $formBuscar.addEventListener("submit", (e) => {
        
        e.preventDefault();

        if (!$inputBuscador) return;

        const $textoBusqueda = $inputBuscador.value.toLowerCase().trim();

        const $personajesFiltrados = todosLosPersonajes.filter(personaje => 
            personaje.name.toLowerCase().includes($textoBusqueda)
        );

        mostrarPersonajes($personajesFiltrados);
    });
}


  
TraerInfo();






    




        
    
    
