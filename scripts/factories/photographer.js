/* eslint-disable no-unused-vars */

// Cette fonction permet de définir la page d'accueil avec la photo du photographe et ses informartions.
function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
    // Fonction de la création des cartes des photographes
    const getUserCardDOM = () => `
 <article>
     <a href="photographer.html?id=${id}">
         <img src="${picture}" alt="Photo de ${name}">
     </a>
     <div class="info">
         <h2>${name}</h2>
         <h3>${city}, ${country}</h3>
         <p class="tagline">${tagline}</p>
         <p class="price">${price}€/jour</p>
     </div>
 </article>`;

    return { name, id, picture, city, country, tagline, price, getUserCardDOM };
}


// Fonction pour afficher la page d'un photographe
function photographerFactorySingle(data) {

    const { name, id, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    // Fonction de la création des cartes des photographes
    const getUserCardDOM = () => `
                <div class="single-photograph-text">
                    <h1>${name}</h1>
                    <h2>${city}, ${country}</h2>
                    <h3><p class="tagline">${tagline}</p></h3>
                </div>
                <div class="justify-center" >
                    <button class="contact_button" onclick="displayModal()" aria-label="Contact Me" tabindex="2">Contactez-moi</button>
                </div>                        
                <div class="justify-center">
                        <a class="single-photograph-img" href="photographer.html?id=${id}" tabindex="3">
                            <img src="${picture}" alt="Photo de ${name}">
                        </a>
                </div>
                `;

    return { name, id, portrait, city, country, tagline, price, getUserCardDOM };
}

// Cette fonction permet de créer les cartes des photographers. 
function photographerFactoryMediaSingle(dataMedias, dataPhotographer) {

    const { name } = dataPhotographer;
    const { date, id, photographerId, price, title, image, video, likes } = dataMedias;
 
    const img = `assets/media/${name}/${image}`;
    const vid = `assets/media/${name}/${video}`;

    // Fonction de la création des cartes des photographes
    const getMediasCardDOM = () => {
        if (video !== undefined) {
            return ` 
         <article>
            <div class="medias-cards"
               aria-label="Liliac Breasted roller, closeup view">
                    <div  onclick="show(${id})" class="vid cards">
                        <video src="${vid}" id="media_${id}" type="video/mp4"></video>
                    </div>
              
                <div class="name-likes">
                    <div class="title" aria-label="${title}">
                        ${title}
                    </div>
                    <div class="likes" id="likes-${id}" tabindex="16">
                        <span><p>${likes}</p></span> 
                        <div onKeyUp="likeKey(${id})">
                        <i class="fas fa-heart addlike" id="heart-${id}" onclick="addordislike(${id})"  aria-label="likes" tabindex="16"></i>
                        </div>
                    </div>
                </div>
                
            </div>
            </article>
            `
        }
        else {
            return `
            <article>
            <div class="medias-cards"
                aria-label="Liliac Breasted roller, closeup view">
                    <div onclick="show(${id})" class="img cards" tabindex="15">
                        <img class="w-100 img-lightbox" src="${img}" id="media_${id}" alt="Photo de ${name}" aria-label="${name}">
                    </div>
             
                <div class="name-likes">
                <div class="title" aria-label="${title}">
                ${title}
                </div>
                    <div class="likes" id="likes-${id}">
                         <span><p>${likes}</p></span>
                         <div onKeyUp="likeKey(${id})">
                        <i class="fas fa-heart addlike" id="heart-${id}" onclick="addordislike(${id})"  aria-label="likes" tabindex="15"></i>
                        </div>
                    </div>
                </div>
                
            </div>
            </article>
            `
                ;
        }
    }

    return { name, date, id, photographerId, price, title, image, video, likes, getMediasCardDOM };
}


let l;
// Fonction qui permet de rajouter un like 
function addordislike(id) {

    let p = document.getElementById("likes-" + id).children[0].children[0];
    l = parseInt(p.innerText);

    //point de contrôle vérifier si on a déjà incrémenté le nombre de likes en récupérant

    let likesPhotographer = getLikesMedia(id);
    if (likesPhotographer === l) {
        p.innerText = l + 1;
        nbDeLikes = getUserReloadLikes();
        // eslint-disable-next-line no-undef
        displayDataEncart(mediaPhotos);
    }
}


//Fonction qui permet de récupérer le nombre de likes dans le JSON
let mediaPhotos;
let mediaOfPhotographers;
let idPhotographer;
// Je récupere l'url
let parsedUrl = new URL(window.location.href);
// Je récupere uniquement l'id et je la transfere dans une variable 
idPhotographer = parsedUrl.searchParams.get("id")

// Je convertis l'id en nombre
idPhotographer = Number(idPhotographer);
function getLikesMedia(id) {

    // eslint-disable-next-line no-undef
    mediaPhotos = photographers.media;

    // .find renvoie une array de tous les éléments filtrées par la condition. 
    // On sait qu'il y a un seul média pour cet id donc on récupère le premier : [0]
    mediaOfPhotographers = mediaPhotos.find(media => (media.id == id) && (media.photographerId == idPhotographer));
    let nbreLikes = mediaOfPhotographers.likes;
    // console.log("nombre de likes ", nbreLikes);
    return nbreLikes;

}


// Fonction qui permet de rajouter un like au clavier
// eslint-disable-next-line no-unused-vars
function likeKey(id)
{
    let a = document.querySelector("#likes-"+ id )
    a.addEventListener('keyup', function(el)
    {
        if (el.key === "Enter")
        {
            el.stopImmediatePropagation() 
            addordislike(id)  
        }
    })
} 


//Fonction qui permet de rajouter le nombre de likes dans l'encart.
let nbDeLikes;
function Encart(data) {
    nbDeLikes = getUserReloadLikes();
    const getEncart = () => {
        return `
            <article class= "encart">
                <p>${nbDeLikes} <i class="fa-solid fa-heart"></i></p>
                <p class="price">${data.price}€ / jour</p>
            </article>
             `

            ;
    }
    return { data, nbDeLikes, getEncart };

}


function getUserReloadLikes() {
    let $totalLikesElements = document.querySelectorAll(".likes");
    let likeSum = 0;
    $totalLikesElements.forEach(function (likes) {
        let likeUnit = Number(likes.textContent)
        likeSum += likeUnit;
    });
    
    return likeSum;
}

// Partie des Filtres (Dropdown)
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}











