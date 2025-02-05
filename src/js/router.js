import { HomePage } from "./components/pages/HomePage";

let currentPage = null;

export const initRouter = () =>{
    const contentContainer = document.getElementById('dynamic-content');

    // Definimos las rutas disponibles
    const routes = {
        '/': HomePage,
        '/about': AboutPage
    };

    // funcion que nos permitira navegar a una nueva pagina
    const navigate = (path) =>{
        window.history.pushState({}, path, window.location.origin + path);
        renderPage(path);
    }
    // renderizamos la pagina segun la ruta
    const renderPage = (path) =>{
        const pageComponent = routes[path] || NotFoundPage;

        // limpiamos solo el contenido dinamico y mostramos la nueva pagina ("componete")
        currentPage = pageComponent();
        contentContainer.innerHTML = currentPage;
    }
    // agregamos un amnejador de eventos para los enlaces para los enlaces con [data-roouter]
    document.addEventListener('click', (e)=>{
        const link = e.target.closest('a[data-router]');
        if(link){
            e.preventDefault();
            navigate(link.getAttribute('href'));
        };
    })
    // Manejamos el eventop 'popstate' para la navegacion hacia adelante y hacia atras
    window.addEventListener('popstate', () =>{
        renderPage(window.location.pathname)
    })
    // cargana inicial
    renderPage(window.location.pathname);
}