// // autre méthode
// // je récupere la lightbox pour y inserer l'image

let lightboxcontainer;

let mediasOfLightbox = [];
let currentIndex;
let lightBoxMedias;


function show(id) {
    async function displayLightBox() {
        let mediasOfPhotographer = await getPhotographeImage();
        // const onePhotographer = await getDataPhotographers();

        if (mediasOfLightbox.length > 0) {
            mediasOfLightbox = mediasOfLightbox;
        }
        else {
            mediasOfLightbox = mediasOfPhotographer;
        }

        // je réinitialise les index des images
        for (let i = 0; i < mediasOfLightbox.length; i++) {
            mediasOfLightbox[i].index = i;
        }

        // je récupere l'image qui à été cliquée en retriant "mediasOfLightbox" par l'id de l'image
        lightBoxMedias = mediasOfLightbox.find(media => media.id == id);
        currentIndex = lightBoxMedias.index;
      
        displayMedia();
    }
    displayLightBox();
}



async function getData() {
    let response = await fetch('./data/photographers.json');
    let datas = await response.text();

    let obj = JSON.parse(datas);
    return obj;
}


getData()
    .then(result => {
        // let listCategory = Object.keys(result).map(category => new Category(category));

        document.querySelectorAll("#content").forEach(categoryDOM => {
            categoryDOM.addEventListener("click", (e) => {
                this.focus();
                this.manageEvent(e.currentTarget.dataset.id);
            });
        });
    });

function display() {
    document.getElementById("lightbox-container").style.display = "inline-block";
  }

async function displayMedia() {
    const onePhotographer = await getDataPhotographers();
    currentIndex = this.getelementById(this.id);
    console.log("current index "+ currentIndex);
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
        if (video !== undefined) {
            return `
            <div class="lightbox-image">
            <video src="${vid}" type="video/mp4" controls aria-label="${titre}" tabindex="8"></video>
            <div class="title-lightbox">${titre}</div>
            </div>
            `;
        }
        else {
            return `
            <div class="lightbox-image">
            <img src="${img}" alt="Photo de ${name}" aria-label="${titre}" tabindex="8">
            <div class="title-lightbox">${titre}</div>
            </div>
            `;
        }
    };
   

    const lighboxDOM = getLightBox();

    // j'insere le bloc html image ou vidéo dans la div de la lightbox
    lightboxcontainer = document.getElementById("content");
    //  lightboxcontainer.style.display= "block";

    lightboxcontainer.innerHTML = lighboxDOM;
    // lightboxcontainer.insertAdjacentHTML('beforeEnd',lighboxDOM);

    display();
  
}

function next(element) {
    if (currentIndex === mediasOfLightbox.length - 1) {
        currentIndex = 0;
    }
    else {
        currentIndex++;
    }

    displayMedia();
}

function previous(element) {
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

    // console.log("close ");

    document.getElementById('lightbox-container').style.display = 'none';
    document.querySelector("#content").classList.remove("show");

    // je vide la lightbox
    lightboxcontainer.innerHTML = "";

    // le ferme la lightbox
    document.getElementById("lightbox-container").style.display = "none";
}





function manageEvent() {
    document.querySelector("#lightbox-container .close").addEventListener("close", () => {
        this.close();
    });

}

document.addEventListener("keyup", (e) => {
    if (document.getElementById('lightbox-container').style.display == 'none') {
        return;
    }
    switch (e.key) {
        case "ArrowRight":
            this.next();
            break;

        case "ArrowLeft":
            this.previous();
            break;

        case "Escape":
            this.close();
            break;

       
    }
});


document.addEventListener("keyup", (e) => {
    switch (e.key) {
    case "Enter":
        const id= e.target.children[0].id.split("_")[1];
        this.show(id);
        break;
    }
});


function getelementById(id) {
    return currentIndex;
}

