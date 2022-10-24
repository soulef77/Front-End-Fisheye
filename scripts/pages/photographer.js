//Code JavaScript lié à la page photographer.html

// import{ photographerFactorySingle, photographerFactoryMediaSingle, Encart} from "/scripts/pages/photographers.js";

let idPhotograph;
// Je récupere l'url
let parseUrl = new URL(window.location.href);
// Je récupere uniquement l'id et je la transfere dans une variable 
idPhotograph = parseUrl.searchParams.get("id")

// Je convertis l'id en nombre
idPhotograph = Number(idPhotograph);

let response = null;
let photographers = null;
let unPhotographer = null;
async function getDataPhotographers() {
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
// Récuperer les images d'un photographe
async function getPhotographeImage() {
    // va chercher l'api
    let response = await fetch('./data/photographers.json');

    // lire le corps de réponse et analyser en JSON
    let photographerMedias = await response.json();


    mediaPhoto = photographerMedias.media;
    
    if (photographerMedias.media === undefined && mediaPhoto[0]["photographerId"] == undefined) {
        return;
    } else {
        // je vais chercher les infos de 1 photographe par son id passée en URL
        // console.log("affiche les medias de 1 photographe");
        mediasOfPhotographers = await mediaPhoto.filter(mediaPhoto => mediaPhoto.photographerId === idPhotograph);

        for (let i = 0; i < mediasOfPhotographers.length; i++) {

            //  console.log(" ID "+ idPhotograph +" mediaPhoto "+ Object.values(mediaPhoto[i]) + " mediasofPhototographers " + (Object.values(mediasOfPhotographers[i])));
        }
        return mediasOfPhotographers;
    }
}

// Renvoie les données et les fait apparaitre dans le dom dans ".photograph-header"
async function displayDataOnePhotographer(onePhotographer) {
    // je selectionne le bloc html ou je vais afficher les infos 
    const photographersSection = document.querySelector(".photograph-header");
    if (onePhotographer != undefined) {
        // je prend la fonction pour afficher les infos et je lui passe les données du photographe
        const photographerModel = photographerFactorySingle(onePhotographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        // j'insere le bloc dans la page html dans le bloc .photograph-header
        if ((photographersSection === undefined)) {
            alert(" ERREUR");
        } else {
            photographersSection.insertAdjacentHTML("beforeend", userCardDOM);
        }
    }
}

//Renvoie les données et les fait apparaître dans le dom dans ".media_section"
async function displayMediaOnePhotographer(photographers, unPhotographer) {
    const photographersSection = document.querySelector(".media_section");
    photographersSection.innerHTML = "";
    photographers.forEach((photographer) => {
        if (photographer != undefined) {
            const photographerModel = photographerFactoryMediaSingle(photographer, unPhotographer);
            const userMediaDOM = photographerModel.getMediasCardDOM();

            if ((photographersSection === null)) {
                return;

            } else {
                photographersSection.insertAdjacentHTML('beforeEnd', userMediaDOM);
            }

        }
    });
}

// Cette fonction permet de définir l'encart
async function displayDataEncart(photographers) {
    const photographersEncart = document.querySelector(".encart");
    photographers.forEach((photographer) => {
        if (photographer != undefined) {
            const photoEncartModel = Encart(photographer);

            const encartMediaDOM = photoEncartModel.getEncart();
            photographersEncart.insertAdjacentHTML('beforeEnd', encartMediaDOM);
        }
    });
}


// eslint-disable-next-line no-unused-vars
let mediasSorteds = [];

   // eslint-disable-next-line no-unused-vars
   function triBy(value) {
    
        if(value == "Titre") {

         
       // eslint-disable-next-line no-inner-declarations
       function triParTitre(a, b) {
                if (a.title < b.title) {
                    return (-1);
                }
                if (a.title > b.title) {
                    return (1);
                }
                return (0);
            }
        
        
                mediasSorteds = mediasOfPhotographers.sort(triParTitre);
                displayMediaOnePhotographer(mediasOfPhotographers, unPhotographer);
        }
        


        if(value == "Date") {

            // eslint-disable-next-line no-inner-declarations
            function triParDate(a, b) {
                if (a.date < b.date) {
                    return (-1);
                }
                if (a.date > b.date) {
                    return (1);
                }
                return (0);
            }
        
        
                mediasSorteds=  mediasOfPhotographers.sort(triParDate);
                displayMediaOnePhotographer(mediasOfPhotographers, unPhotographer);
            
        }

        if(value == "Popularité") {

            // eslint-disable-next-line no-inner-declarations
            function triParLikes(a, b) {
                if (a.likes > b.likes) {
                    return (-1);
                }
                if (a.likes < b.likes) {
                    return (1);
                }
                return (0);
            }
        
        
                mediasSorteds= mediasOfPhotographers.sort(triParLikes);
                displayMediaOnePhotographer(mediasOfPhotographers, unPhotographer);
            
        }
            
    }


    

function toggleList()
{
	const list = document.getElementById("list");
	const listIcon = document.getElementById("listIcon");
	const listDropDown = document.getElementById("listDropDown");

	if(list.style.display == "none")
	{
		list.style.display = "";
		listIcon.classList.add("dropbtn-flip");
		listDropDown.classList.add("dropdown-open");
	}
	else
	{
		list.style.display = "none";
		listIcon.classList.remove("dropbtn-flip");
		listDropDown.classList.remove("dropdown-open");
	}
}

const listOptions = ["Popularité", "Date", "Titre"];

function setOption(list)
{
	const value = list.value;
	document.getElementById("listDisplay").innerText = value;

	// vider la liste d'options
	while(list.options.length > 0)
	{
		list.options[0].remove();
	}

	// mettre les deux autres options dans la liste
	listOptions.forEach(option =>
		{
			if(option != value)
			{
				const _option = new Option(option, option);
				_option.className = "listOption";
				list.options.add(_option);
			}
		});

	const listIcon = document.getElementById("listIcon");
	const listDropDown = document.getElementById("listDropDown");

	list.style.display = "none";
	listIcon.classList.remove("dropbtn-flip");
	listDropDown.classList.remove("dropdown-open");

	triBy(value);

	listIcon.focus();

}

async function init() {
    // Récupère les datas du photographe
    unPhotographer = await getDataPhotographers();
    displayDataOnePhotographer(unPhotographer);
    let mediasOfPhotographer = await getPhotographeImage();
    displayMediaOnePhotographer(mediasOfPhotographer, unPhotographer);
    displayDataEncart(mediasOfPhotographer);
    setOption(document.getElementById("list"));

}

init();
















