import  { photographerFactory } from './scripts/pages/photographers.js';

// Cette fonction permet de récupérer les données JSON des photographes. 
async function getPhotographers() {


    let response = await fetch('/Front-End-Fisheye/data/photographers.json');
    
    // lire le corps de réponse et analyser en JSON
     let photographers = await response.json(); 

     return photographers
  
}

// Cette fonction permet de faire appel à la fonction pour définir la page d'accueil des photographes. 
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        
        if ((photographersSection != undefined)) {
            photographersSection.insertAdjacentHTML('beforeEnd', userCardDOM);
        }
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);

}

init();



