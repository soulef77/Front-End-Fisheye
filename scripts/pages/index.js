

async function getPhotographers() {

    // Penser à remplacer par les données récupérées dans le json
    const photographers = [
        {
            "name": "Mimi Keel",
            "id": 243,
            "city": "London",
            "country": "UK",
            "tagline": "Voir le beau dans le quotidien",
            "price": 400,
            "portrait": "\Front-End-Fisheye\assets\photographers\Photographers ID Photos\MimiKeel.jpg"
        },
        {
            "name": "Ellie-Rose Wilkens",
            "id": 930,
            "city": "Paris",
            "country": "France",
            "tagline": "Capturer des compositions complexes",
            "price": 250,
            "portrait": "\Front-End-Fisheye\assets\photographers\Photographers ID Photos\EllieRoseWilkens.jpg"
        },
        {
            "name": "Tracy Galindo",
            "id": 82,
            "city": "Montreal",
            "country": "Canada",
            "tagline": "Photographe freelance",
            "price": 500,
            "portrait": "\Front-End-Fisheye\assets\photographers\Photographers ID Photos\TracyGalindo.jpg"
        },
        {
            "name": "Nabeel Bradford",
            "id": 527,
            "city": "Mexico City",
            "country": "Mexico",
            "tagline": "Toujours aller de l'avant",
            "price": 350,
            "portrait": "\Front-End-Fisheye\assets\photographers\Photographers ID Photos\NabeelBradford.jpg"
        },
        {
            "name": "Rhode Dubois",
            "id": 925,
            "city": "Barcelona",
            "country": "Spain",
            "tagline": "Je crée des souvenirs",
            "price": 275,
            "portrait": "\Front-End-Fisheye\assets\photographers\Photographers ID Photos\RhodeDubois.jpg"
        },
        {
            "name": "Marcel Nikolic",
            "id": 195,
            "city": "Berlin",
            "country": "Germany",
            "tagline": "Toujours à la recherche de LA photo",
            "price": 300,
            "portrait": "\Front-End-Fisheye\assets\photographers\Photographers ID Photos\MarcelNikolic.jpg"
        }
    ]

    let response = await fetch('/Front-End-Fisheye/data/photographers.json');
    let datas = await response.text();
    fetch("/Front-End-Fisheye/data/photographers.json")
        .then(response => {
        })
    let obj = JSON.parse(datas);
    const arrays = [];

    for (var i in obj) {
        arrays.push([i, obj[i]]);
    }
    arrays.forEach(function (array) {
       
    });
    return obj;

   
    // et bien retourner le tableau photographers seulement une fois
    // return ({
    //     photographers: [...photographers, ...photographers, ...photographers]
    // });
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        
        if ((photographersSection != undefined)) {
            photographersSection.insertAdjacentHTML('beforeEnd', userCardDOM);
        }
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);

};

init();



