

function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price} = data;

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

return { name, id, picture, city, country, tagline, price, getUserCardDOM};
}






// Fonction pour afficher la page de 1 photographe
function photographerFactorySingle(data)
{
    

    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
    
    // Fonction de la création des cartes des photographes
    const getUserCardDOM = () => `
                <div class="single-photograph-text">
                    <h2>${name}</h2>
                    <h3>${city}, ${country}</h3>
                    <p class="tagline">${tagline}</p>
                </div>
                <div class="justify-center" >
                <button class="contact_button" onclick="displayModal()" aria-label="Contact Me" tabindex="4">Contactez-moi</button>
                     </div>                        
                <div class="justify-center">
                        <a class="single-photograph-img" href="photographer.html?id=${id}">
                            <img src="${picture}" alt="Photo de ${name}">
                        </a>
                </div>
                `;
    
    return { name, id, portrait , city, country, tagline, price, getUserCardDOM};
}


function photographerFactoryMediaSingle(dataMedias, dataPhotographer) {


const { name } = dataPhotographer;

const { date, id, photographerId, price, title, image, video, likes} = dataMedias;

const img = `assets/media/${name}/${image}`;

const vid = `assets/media/${name}/${video}`;



    // Fonction de la création des cartes des photographes
    const getMediasCardDOM = () => {
        if(video !== undefined){
            return ` 
            
            <div class="medias-cards"
               aria-label="Liliac Breasted roller, closeup view">
                    <div  onclick="show(${id})" class="vid cards">
                        <video src="${vid}" type="video/mp4"></video>
                    </div>
              
                <div class="name-likes">
                    <div class="title">
                        ${title}
                    </div>
                    <div class="likes" id="likes-${id}">
                        <span><p>${likes}</p></span> <i class="fas fa-heart addlike" id="heart-${id}" onclick="addordislike(${id})"  aria-label="likes"></i>
                    </div>
                </div>
                
            </div>`
    }
    else
    {
        return `
            <div class="medias-cards"
                aria-label="Liliac Breasted roller, closeup view">
                    <div onclick="show(${id})" class="img cards">
                        <img class="w-100 img-lightbox" src="${img}" alt="Photo de ${name}" >
                    </div>
             
                <div class="name-likes">
                    <div class="title">
                        ${title}
                    </div>
                    <div class="likes" id="likes-${id}">
                        <span><p>${likes}</p></span> 
                        <i class="fas fa-heart addlike" id="heart-${id}" onclick="addordislike(${id})"></i>
                    </div>
                </div>
                
            </div>`
        ;}
    }

    return { name, date, id, photographerId, price, title, image, video, likes, getMediasCardDOM };
}



let l;
function addordislike(id) {
  
    let p = document.getElementById("likes-" + id).children[0].children[0];
    l =  parseInt(p.innerText);
    
    //point de contrôle vérifier si on a déjà incrémenté le nombre de likes en récupérant
    
    let likesPhotographer = getLikesMedia(id);
     
    console.log(" Photographers ", likesPhotographer);

    if(likesPhotographer === l)  {
      p.innerText = l + 1;
      nbDeLikes = getUserReloadLikes();
      displayDataEncart(mediaPhotos);
      }
}

//Fonction qui permet de récupérer le nombre de likes dans le JSON
let mediaPhotos;
let mediaOfPhotographers;
 function getLikesMedia(id) {
   
    mediaPhotos = photographers.media;

    // .find renvoie une array de tous les éléments filtrées par la condition. 
    // On sait qu'il y a un seul média pour cet id donc on récupère le premier : [0]
    mediaOfPhotographers = mediaPhotos.find( media => media.id == id);
     console.log("media of id " + mediasOfPhotographers.id + " id "+ id);
    let nbreLikes = mediaOfPhotographers.likes; 
    return nbreLikes;
      
}
   

//Fonction qui permet de rajouter le nombre de likes dans l'encart.
let nbDeLikes;
function Encart(data) {
    nbDeLikes = getUserReloadLikes();
    const getEncart=() =>{
        return `
            <article class= "encart">
                <p>${nbDeLikes} <i class="fa-solid fa-heart"></i></p>
                <p class="price">${data.price}€ / jour</p>
            </article>
             `
           
    ;}
    // console.log(" CONTROLE DE NBDELIKES "+ nbDeLikes);
    return {data, nbDeLikes , getEncart};

}


function getUserReloadLikes() {
    let $totalLikesElements = document.querySelectorAll(".likes");
    let likeSum = 0;
    $totalLikesElements.forEach(function (likes) {
        let likeUnit = Number(likes.textContent)
        likeSum += likeUnit;
    });
   
    // console.log( " LIKES CONTROLE " + likeSum);
    return likeSum;
}





    // Partie des Filtres (Dropdown)
    /* When the user clicks on the button,
    toggle between hiding and showing the dropdown content */
    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }
    
    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
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

   

function triParTitre(a, b)
{
	if(a.title < b.title)
	{
		return(-1);
	}
	if(a.title > b.title)
	{
		return(1);
	}
	return(0);
}

function triTitre()
{
	mediasOfPhotographers.sort(triParTitre);
	displayMediaOnePhotographer(mediasOfPhotographers, unPhotographer);
}


function triParDate(a, b)
{
	if(a.date < b.date)
	{
		return(-1);
	}
	if(a.date > b.date)
	{
		return(1);
	}
	return(0);
}

function triDate()
{
	mediasOfPhotographers.sort(triParDate);
	displayMediaOnePhotographer(mediasOfPhotographers, unPhotographer);
}
      
 
function triParLikes(a, b)
{
	if(a.likes < b.likes)
	{
		return(-1);
	}
	if(a.likes > b.likes)
	{
		return(1);
	}
	return(0);
}

function triLikes()
{
	mediasOfPhotographers.sort(triParLikes);
	displayMediaOnePhotographer(mediasOfPhotographers, unPhotographer);
}





