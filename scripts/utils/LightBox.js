
// // Je récupere la lightbox pour y inserer l'image

let lightboxcontainer;

let currentIndex;
let lightBoxMedias;
let mediasOfLightbox = [];

function show(id) {
    async function displayLightBox() {
        let mediasOfPhotographer = await getPhotographeImage();
         
        if ( mediasSorteds.length > 0 )
        {
            mediasOfLightbox = mediasSorteds;
        }
        else
        {
            mediasOfLightbox = mediasOfPhotographer;
        }
        
        // je réinitialise les index des images
        for (let i = 0; i< mediasOfLightbox.length; i++)
        {
            mediasOfLightbox[i].index = i;
        }


        // je récupere l'image qui à été cliquée en retriant "mediasOfLightbox" par l'id de l'image
        lightBoxMedias = mediasOfLightbox.find(media => media.id == id);
        currentIndex = lightBoxMedias.index;
      
        displayMedia();
    }
    displayLightBox();
}


//permet de lire les données JSON
async function getData() {
    let response = await fetch('./data/photographers.json');
    let datas = await response.text();
    let obj = JSON.parse(datas);
    return obj;
}


// Permet de rajouter un listener au document.
getData()
    .then(() => {
            document.querySelectorAll("#content").forEach(categoryDOM => {
            categoryDOM.addEventListener("click", (e) => {
                this.focus();
                manageEvent(e.currentTarget.dataset.id);
            });
        });
    });

// Cette fonction permet d'ouvrir la lightbox
function display() {
    document.getElementById("lightbox-container").style.display = "inline-block";
  }

// Fonction qui permet de définir la lightBox
async function displayMedia() {
    const onePhotographer = await getDataPhotographers();
    lightBoxMedias = mediasOfLightbox[currentIndex];

    // titre
    let titre = lightBoxMedias.title;

    // titre de l'image
    let image = lightBoxMedias.image;

    // titre de la video
    let video = lightBoxMedias.video;

    // nom du photographe
    let name = onePhotographer.name;

    // Je récupere le nom du photographe et le nom de l'image pour créer le chemin
    const img = `assets/media/${name}/${image}`;
    const vid = `assets/media/${name}/${video}`;

    const getLightBox = () => {
        const d= document.createElement("div");
        d.className= "lightBox-image";

        if (video !== undefined) {
            const v= document.createElement("video");
            v.src= vid;
            v.type= "video/mp4";
            v.setAttribute("controls","controls");
            v.ariaLabel= titre;
            v.tabIndex= "8";
            d.appendChild(v);
        }
           
        else {
            const i= document.createElement("img");
            i.src= img;
            i.alt= `Photo de ${name}`;
            i.ariaLabel= titre;
            i.tabIndex= "8";
            d.appendChild(i);
            
        }
        const t= document.createElement("div");
        t.className= "title-lightbox";
        t.innerText= titre;
        d.appendChild(t);
        return d;
    };
   

  

    // j'insere le bloc html image ou vidéo dans la div de la lightbox
    lightboxcontainer = document.getElementById("content");
    lightboxcontainer.innerHTML= "";
    lightboxcontainer.appendChild(getLightBox());
       
    display();
  
}

//fonction pour afficher la prochaine photographie
function next() {
    if (currentIndex === mediasOfLightbox.length - 1) {
        currentIndex = 0;
    }
    else {
        currentIndex++;
    }

    displayMedia();
}


//fonction pour afficher la précédente photographie
function previous() {
    if (currentIndex === 0) {
        currentIndex = mediasOfLightbox.length - 1;
    }
    else {
        currentIndex--;
    }

    displayMedia();
}

lightboxcontainer;
function close() {

  

    document.getElementById('lightbox-container').style.display = 'none';
    document.querySelector("#content").classList.remove("show");

    // je vide la lightbox
    lightboxcontainer.innerHTML = "";

    // le ferme la lightbox
    document.getElementById("lightbox-container").style.display = "none";
}




//fonction pour faire appel au bonton close
function manageEvent() {
    document.querySelector("#lightbox-container .close").addEventListener("close", () => {
        this.close();
    });

}

// permet d'écouter le clavier en faisant appel aux fonctions précédentes.
document.addEventListener("keyup", (e) => {
    if (document.getElementById('lightbox-container').style.display == 'none') {
        return;
    }
    switch (e.key) {
        case "ArrowRight":
            next();
            break;

        case "ArrowLeft":
            previous();
            break;

        case "Escape":
            close();
            break;

       
    }
});

// Pour écouter le document lorsqu'on clique sur la touche entrée.
document.addEventListener("keyup", (e) => {
    switch (e.key) {
    case "Enter":
        
        show(e.target.children[0].id.split("_")[1]);
        break;
    }
});


