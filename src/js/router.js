import { MainLayout } from "../layouts/MainLayout.js";
import { HomePage } from "../pages/HomePage.js";
import { AboutPage } from "../pages/AboutPage.js";
import { NotFoundPage } from "../pages/NotFoundPage.js";
import { Login } from "../pages/Login.js";
let currentPage = null;

export const initRouter = () =>{
    const contentContainer = document.getElementById('dynamic-content');

    // Definimos las rutas disponibles
    const routes = {
        '/': HomePage,
        '/about': AboutPage,
        '/login': Login

    };

    // renderizamos la pagina segun la ruta
    const renderPage = (path) =>{
        const pageComponent = routes[path] || NotFoundPage;

        // limpiamos solo el contenido dinamico y mostramos la nueva pagina ("componete")
        currentPage = pageComponent();
        contentContainer.innerHTML = MainLayout(currentPage);
    }

    const navigate = (path) =>{
        window.history.pushState({}, '', path)// cambia la URL sin recargar la pagina
        renderPage(path); //Renderiza la nueva pagina
    }
    // agregamos un amnejador de eventos para los enlaces para los enlaces con [data-roouter]
    document.addEventListener('click', (e)=>{
        const link = e.target.closest('a[data-router]');
        if(link){
            e.preventDefault();
            navigate(link.pathname);
        };
    })
    // Manejamos el eventop 'popstate' para la navegacion hacia adelante y hacia atras
    window.addEventListener('popstate', () =>{
        renderPage(window.location.pathname)
    })
    // cargana inicial
    renderPage(window.location.pathname);
}