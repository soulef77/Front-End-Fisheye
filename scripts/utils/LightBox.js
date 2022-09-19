


// // autre méthode
// // je récupere la lightbox pour y inserer l'image
// const lightboxcontainer = document.querySelector(".lightbox-content");

// console.log(lightboxcontainer)

let lightboxcontainer;



class LightBox{
    constructor(listElement){
        this.currentElement= null;
        this.listElement= listElement;
        this.show;
        this.manageEvent;
  }
}
   let mediasOfLightbox = [];
   let currentIndex;
       
   function show(id){
        // console.log("ID " +id);
        

        async function displayLightBox()
        {
            let mediasOfPhotographer = await getPhotographeImage();
            const onePhotographer  = await getDataPhotographers();
           
            if ( mediasOfLightbox.length > 0 )
            {
                mediasOfLightbox = mediasOfLightbox;
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
            let lightBoxMedias = mediasOfLightbox.find(media => media.id === id);
           
            currentIndex = lightBoxMedias.index;
               displayMedia();
           
           
        }
        displayLightBox();
    }
              
   
   
     async function getData(){
        // let result= await fetch('/Front-End-Fisheye/data/photographers.json');
        // console.log(" test2 "+ result.json);
        // return result.json();
    
    
        let response = await fetch('/Front-End-Fisheye/data/photographers.json');
            let datas = await response.text();
                fetch("/Front-End-Fisheye/data/photographers.json")
            .then(response => {
            //   return response.json();
            })
            // .then(jsondata => console.log(jsondata))
            let obj = JSON.parse(datas);
            // console.log(datas+ "longuer  " + datas.length+ " name " + obj.city);
                // console.log("DATA "+ obj);
             return obj;
    }
    

        getData().then(result => {
        let listCategory = Object.keys(result).map(category => new Category(category));
        let lightBox = new LightBox(listCategory);
        // console.log("lightBox "+ lightBox);
        document.querySelectorAll("#content").forEach(categoryDOM => {
        categoryDOM.addEventListener("click", (e) => {
         this.focus();
         this.manageEvent(e.currentTarget.dataset.id);
        // console.log("categoryDOM "+ categoryDOM);
        })
    })
});

       
function  display(){
    //  document.querySelectorAll("#lightbox-container #content").src= img;
    // document.querySelector("#lightbox-container").classList.add("show");
    document.getElementById("lightbox-container").style.display = "inline-block";
}


async function displayMedia()
{
    const onePhotographer  = await getDataPhotographers();
    // console.log(" currentIndex "+currentIndex);
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

    // console.log(" OK "+ img+ "video "+ vid);

    // Fonction de la création des cartes des photographes
    const getLightBox = () => {
        if(video !== undefined)
        {
            return `<video src="${vid}" type="video/mp4" controls aria-label="${titre}" tabindex="2"></video>
                    <div class="title-lightbox">${titre}</div>`;
        }
        else
        {
            return `<img src="${img}" alt="Photo de ${name}" aria-label="${titre}" tabindex="2">
                    <div class="title-lightbox">${titre}</div>`;
        }
    }

    const getLightBox2 =() => {
        if(video !== undefined)
        {                    
            return ` <div class= "card" data-id = ${id}>
            <div class= "title"> ${titre} </div>
            <div class= "picture">
            <img src= ${vid}>
            </div> 
            </div>`;
        }
        else
        {
            return  ` <div class= "card" data-id = ${id}>
            <div class= "title"> ${name} </div>
            <div class= "picture">
            <img src= ${img}>
            </div> 
            </div>`;
        }

    }
  
    const lighboxDOM = getLightBox();
   
    // j'insere le bloc html image ou vidéo dans la div de la lightbox
    lightboxcontainer = document.getElementById("content");
    //  lightboxcontainer.style.display= "block";

    lightboxcontainer.innerHTML = lighboxDOM;
    // lightboxcontainer.insertAdjacentHTML('beforeEnd',lighboxDOM);
    

display();
}

function next(element){
    if (currentIndex === mediasOfLightbox.length -1)
        {
            currentIndex = 0;
        }
        else
        {
            currentIndex++;
        }
    
        displayMedia();
}

function previous(element){
    if (currentIndex === 0)
    {
        currentIndex = mediasOfLightbox.length - 1;
    }
    else
    {
        currentIndex--;
    }

    displayMedia();
}

lightboxcontainer;
function close(){
    
    console.log( "close ");

    document.getElementById('lightbox-container').style.display= 'none';

    document.querySelector("#content").classList.remove("show");
    
    // je vide la lightbox
    lightboxcontainer.innerHTML="";

    // le ferme la lightbox
    document.getElementById("lightbox-container").style.display = "none";
}





   function manageEvent() {
      
        document.querySelector("#lightbox-container .close").addEventListener("close", ()=> {
        this.close();
        });

        document.addEventListener("keyup", (e) => {
            switch(e.key) {
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
        })

    }



   function getelementById(id)
    {
       
        return currentIndex;
    }

 



// j'ouvre le lightbox
// function openLightBox(id)
// {
   

    // je change la class en d-block pour ouvrir la modale
    
    // lightboxcontainer.style.display= "block";
    // lightboxcontent.style.display= "block";

//     // affichage du contenu de la lightbox
//     async function displayLightBox()
//     {
//         let mediasOfPhotographer = await getPhotographeImage();
//         const onePhotographer  = await getDataPhotographers();
//         let mediasOfLightbox = [];
   
//         if ( mediasOfLightbox.length > 0 )
//         {
//             mediasOfLightbox = mediasSorteds;
//         }
//         else
//         {
//             mediasOfLightbox = mediasOfPhotographer;
//         }
        
//         // je réinitialise les index des images
//         for (let i = 0; i< mediasOfLightbox.length; i++)
//         {
//             mediasOfLightbox[i].index = i;
//         }

//         // je récupere l'image qui à été cliquée en retriant "mediasOfLightbox" par l'id de l'image
//         let lightBoxMedias = mediasOfLightbox.find(media => media.id === id);

//         let currentIndex = lightBoxMedias.index;


//     function displayMedia()
//         {
//             lightBoxMedias = mediasOfLightbox[currentIndex];

//             // titre
//             let titre = lightBoxMedias.title;

//             // titre de l'image
//             let image = lightBoxMedias.image;

//             // titre de la video
//             let video = lightBoxMedias.video;

//             // nom du photographe
//             let name = onePhotographer.name;

//             // Je récupere le nom du photographe et le nom de l'image pour créer le chemin
//             const img = `assets/media/${name}/${image}`;
//             const vid = `assets/media/${name}/${video}`;

//             // console.log(" OK "+ img+ "video "+ vid);

//             // Fonction de la création des cartes des photographes
//             const getLightBox = () => {
//                 if(video !== undefined)
//                 {
//                     return `<video src="${vid}" type="video/mp4" controls aria-label="${titre}" tabindex="2"></video>
//                             <div class="title-lightbox">${titre}</div>`;
//                 }
//                 else
//                 {
//                     return `<img src="${img}" alt="Photo de ${name}" aria-label="${titre}" tabindex="2">
//                             <div class="title-lightbox">${titre}</div>`;
//                 }
//             }

          
//             const lighboxDOM = getLightBox();
//             // console.log(" LIGHTBOXDOM " + lighboxDOM);
//             // j'insere le bloc html image ou vidéo dans la div de la lightbox
//             lightboxcontainer = document.getElementById("lightbox-container");
//             //  lightboxcontainer.style.display= "block";

//             lightboxcontainer.innerHTML = lighboxDOM;
//             // lightboxcontainer.insertAdjacentHTML('beforeEnd',lighboxDOM);
//         }
//         displayMedia();
//         listener();
  
//         function listener()
//         {
//             let prevbut1 = document.getElementById(".previous");
//             if(prevbut1){
//                 console.log("CLAVIER  previous" + el.key);
//             prevbut1.addEventListener("click", () => {
//                 previous();
//             });
//         }

//             let nextbut1 = document.getElementById(".next");
//             if(nextbut1){
//                 console.log(" CLAVIER  next " + el.key);
//             document.querySelector(".next").addEventListener("click", () => {
//                 next();
//             });
//         }

//             document.addEventListener('keyup', (el) =>{
//                 console.log("test CLAVIER ");
//                 switch(el.key)
//                 {
//                     case "ArrowLeft" :
//                         this.previous(); 
//                         console.log("CLAVIER  previous" + el.key);
//                         break; 
//                     case "ArrowRight": 
//                         this.next();
//                         console.log(" CLAVIER  next " + el.key);
//                         break; 
//                     case "Escape" : 
//                         this.close(); 
//                         console.log(" CLAVIER  close " + el.key);
//                         break; 
//                 }
               
//             })
//         }
       
//      listener();    
//     }
//    this.listener();
//     displayLightBox();
    
// }




