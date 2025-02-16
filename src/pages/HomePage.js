export const HomePage = () => {
    // Seleccionamos el contenedor con id dynamic-content
    const dynamicContent = document.getElementById('dynamic-content');

    // validamos si el contenedor exuste
    if(!dynamicContent){
        console.error('El contenedor dynamic-content no se encontro');
        return;
    }

    /* Contenido inicial de la pagina */
    const content = `
    <section class="home-page">
        <h1>Welcomo to HomePage</h1>
        <!--Lista Vacia donde se Realizara la insercion de homs-->
        <div id="homs-list"></div>
    </section>`

// insertamos el contenido en el cuaropo del documento
    dynamicContent.innerHTML = content;
    //realizamos la peticion a nuestra api para poder obtener la info
    fetch('http://localhost:3002/api/homes')
    .then(response => {
    // Verificamos si la respuesta es valida
        if(!response.ok){
            throw new Error('Network res was not OK');
        }
    // si es valida el reponse convertimos el res a JSON
        return response.json()
    })
    .then(data => {
        const homsList = document.getElementById('homs-list');
        
        homsList.innerHTML = ''; //Limpiamos el contenido previo
        
        // Iteramos sobre los datos recibidos y creamos los elementos de la lista
        data.forEach(home => {
            // Creamos in elemento <li> por cada home
            const homeItem = document.createElement('div');
            homeItem.className = 'home-item'; // clase para los estilos

            // Usamos innerHtml para insertar texto y la img
            homeItem.innerHTML = `
            <div class="home-image"> 
                <img src="${home.image}" alt="${home.title}"/>
            </div>
            <div class="home-info">
                <h3>${home.title}</h3>
                 <p>${home.price}</p>
            </div>
                `;
            // Agregamos el elemento a la lista
            homsList.appendChild(homeItem)
        })
    })
    .catch(error => {
        // Mostramos el error en la consola
        console.error('Error', error);
        document.querySelector('p').textContent = 'Failes to load Homes'
    })    
    return content;
};