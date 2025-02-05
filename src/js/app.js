// Configuracion inicial 

import { initRouter } from "./utils/router.js"

const initApp = ()=>{
    initRouter();
    console.log('Aplic inicializada');
}

document.addEventListener('DOMContentLoaded', initApp);