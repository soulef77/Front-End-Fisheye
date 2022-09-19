//Mettre le code JavaScript lié à la page photographer.html


let idPhotograph;
// Je récupere l'url
let parsedUrl = new URL(window.location.href);
// Je récupere uniquement l'id et je la transfere dans une variable 
idPhotograph = parsedUrl.searchParams.get("id")

// Je convertis l'id en nombre
idPhotograph = Number(idPhotograph);
//  console.log("id du photographe : " + idPhotograph);
//  console.log("typeof"+ idPhotograph);
//  console.log(idPhotograph);
// alert(" PRESQUE BIEN "+ idPhotograph);




// function getDataPhotographer(id) {

//     console.log( "id " +id);
//     // récupère une liste de tous les éléments body (il n'y en aura qu'un),
//     // et sélectionne le premier (indice 0) de ces éléments
//     myBody = document.getElementsByClassName("article");

//     // à présent, trouve tous les éléments p enfants de cet élément body
//     myBodyElements = document.getElementsByTagName('h2');
//     console.log(" h2 " + JSON.parse(JSON.stringify(myBodyElements)));
//     // récupère le second élément de cette liste d'éléments p
//     myP = myBodyElements;
   

// }

let response= null;
let photographers= null;
let unPhotographer= null;
 async function getDataPhotographers()
{
    // va chercher l'api
    response = await fetch('./data/photographers.json');

    // lire le corps de réponse et analyser en JSON
    photographers = await response.json();

    // je vais chercher les infos de 1 photographe par son id passée en URL
    unPhotographer = photographers.photographers.find(x => x.id === idPhotograph);

    //  console.log(" PHOTO " + Object.values(unPhotographer));
    return unPhotographer;
}

let mediaPhoto;
let mediasOfPhotographers;
// Récuperer les images de 1 photographe
async function getPhotographeImage()
{
    // va chercher l'api
    let response = await fetch('./data/photographers.json');

    // lire le corps de réponse et analyser en JSON
    let photographerMedias = await response.json();


    mediaPhoto = photographerMedias.media;
    // affiche les medias en console
    // console.log("console du getPhotographeImage");
    // console.log("affiche tous les medias")
    // console.log(sammy);
    //  console.log(" TEST "+sammy[0]["photographerId"] +" AUTRE ID "+ idPhotograph);

    
    



    if(photographerMedias.media === undefined && mediaPhoto[0]["photographerId"] == undefined) {
    } else {
    // je vais chercher les infos de 1 photographe par son id passée en URL
    // console.log("affiche les medias de 1 photographe");
    mediasOfPhotographers = await mediaPhoto.filter( mediaPhoto => mediaPhoto.photographerId === idPhotograph);

     for(i= 0; i< mediasOfPhotographers.length ; i++){
        
     console.log(" ID "+ idPhotograph +" mediaPhoto "+ Object.values(mediaPhoto[i]) + " mediasofPhototographers " + (Object.values(mediasOfPhotographers[i])));
    }
    return mediasOfPhotographers;
    }
}





// Renvoie les données et les fait apparaitre dans le dom dans ".photograph-header"
async function displayDataOnePhotographer(onePhotographer)
{
    // je selectionne le bloc html ou je vais afficher les infos 
    const photographersSection = document.querySelector(".photograph-header");

    // console.log("console du display data ")
    // console.log(onePhotographer)
    if(onePhotographer != undefined) {
    // je prend la fonction pour afficher les infos et je lui passe les données du photographe
    const photographerModel = photographerFactorySingle(onePhotographer);

    const userCardDOM = photographerModel.getUserCardDOM();

    // j'insere le bloc dans la page html dans le bloc .photograph-header
    if((photographersSection === undefined)) {
        alert(" ERREUR");
    } else {
        photographersSection.insertAdjacentHTML("beforeend", userCardDOM);
    }
   }
}


async function displayMediaOnePhotographer(photographers, unPhotographer)
{
    const photographersSection = document.querySelector(".media_section");
		photographersSection.innerHTML = "";
    // console.log("console du display data ");
    // console.log(photographers);
    
    photographers.forEach((photographer) => {
    if(photographer != undefined) {
    const photographerModel = photographerFactoryMediaSingle(photographer, unPhotographer);
    // console.log(" okoko " + photographerModel);
        //    if(photographerModel != undefined) {
    const userMediaDOM = photographerModel.getMediasCardDOM();
    // console.log(" verification 2 "+ userMediaDOM);

    if((photographersSection === null)) {
        // alert(" ERREUR");
    } else {
        photographersSection.insertAdjacentHTML('beforeEnd', userMediaDOM);
    }
// }
}
});
}

async function displayDataEncart(photographers) {
    const photographersEncart = document.querySelector(".encart");
        photographers.forEach((photographer) => {
            if(photographer!= undefined) {
        const photoEncartModel = Encart(photographer);
       
        const encartMediaDOM = photoEncartModel.getEncart();
        // console.log(" TEST "+ photoEncartModel + " test2 "+ encartMediaDOM);

        photographersEncart.insertAdjacentHTML('beforeEnd',encartMediaDOM);
            }   
    });
    }





    async function init()
    {
    // Récupère les datas du photographe
        unPhotographer  = await getDataPhotographers();
        displayDataOnePhotographer(unPhotographer);
        let mediasOfPhotographer = await getPhotographeImage();
        // console.log("console du init");
        // console.log(mediasOfPhotographer);
        displayMediaOnePhotographer(mediasOfPhotographer, unPhotographer);
        displayDataEncart(mediasOfPhotographer);

    }
   
    init();
















