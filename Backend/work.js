import { selectionListenersObjet } from "./category.js";
// Récupération des travaux depuis le fichier JSON
const reponse = await fetch('http://localhost:5678/api/works');
const travaux = await reponse.json();

function genererTravaux(travaux){
  for (let i = 0; i < travaux.length; i++) {

      const work = travaux[i];
      // Récupération de l'élément du DOM qui accueillera les travaux
      const sectionGallery = document.querySelector(".gallery");
      // Création d’une balise dédiée à une pièce automobile
      const workElement = document.createElement("figure");
      // Création des balises 
      const imageElement = document.createElement("img");
      imageElement.src = work.imageUrl;
      const titleElement = document.createElement("figcaption");
      titleElement.innerText = work.title;
     
      // On rattache la balise work a la section gallery
      sectionGallery.appendChild(workElement);
      workElement.appendChild(imageElement);
      workElement.appendChild(titleElement);   
    
   }

}

function genererFiltres(){
    const sectionFiltres = document.querySelector(".filtres");
 
    const buttonElementTous = document.createElement("div");
    const buttonElementObjets = document.createElement("div");
    const buttonElementAppartements = document.createElement("div");
    const buttonElementHotelsRestaurants = document.createElement("div");
    buttonElementTous.innerHTML="<button id='tous'>Tous</button>"
    buttonElementObjets.innerHTML="<button id='objet'>Objets</button>"
    buttonElementAppartements.innerHTML="<button id='appartements'>Appartements</button>"
    buttonElementHotelsRestaurants.innerHTML="<button id='hotelsRestaurants'>Hotels & Restaurants</button>"  
    // On rattache la balise navigation à la section gallery
    sectionFiltres.appendChild(buttonElementTous);
    sectionFiltres.appendChild(buttonElementObjets);
    sectionFiltres.appendChild(buttonElementAppartements);
    sectionFiltres.appendChild(buttonElementHotelsRestaurants);
  
     }
  
  

genererTravaux(travaux);
genererFiltres()

const boutonFiltrerTous = document.querySelector("#tous");

    boutonFiltrerTous.addEventListener("click", async function () {
         function genererTravaux(travaux){
            for (let i = 0; i < travaux.length; i++) {
          
                const work = travaux[i];
                // Récupération de l'élément du DOM qui accueillera les travaux
                const sectionGallery = document.querySelector(".gallery");
                // Création d’une balise dédiée à une pièce automobile
                const workElement = document.createElement("figure");
                // Création des balises 
                const imageElement = document.createElement("img");
                imageElement.src = work.imageUrl;
                const titleElement = document.createElement("figcaption");
                titleElement.innerText = work.title;
               
                // On rattache la balise work a la section gallery
                sectionGallery.appendChild(workElement);
                workElement.appendChild(imageElement);
                workElement.appendChild(titleElement);              
             }
          
          }
       
    document.querySelector(".gallery").innerHTML = "";
    genererTravaux(travaux);
});


    const boutonFiltrerObjet = document.querySelector("#objet");
   

    boutonFiltrerObjet.addEventListener("click", async function () {
        for (let i = 0; i < travaux.length; i++) {
            const travauxFiltrees = travaux.filter(function (work) {
                return work.categoryId = 1;
            });
            document.querySelector(".gallery").innerHTML = "";
            genererTravaux(travauxFiltrees);
        }

    });

    const boutonFiltrerAppartement = document.querySelector("#appartements");
   

    boutonFiltrerAppartement.addEventListener("click",async function () {
        for (let i = 0; i < travaux.length; i++) {
            const travauxFiltrees = travaux.filter(function (work) {
                return work.categoryId = 2;
            });
            document.querySelector(".gallery").innerHTML = "";
            genererTravaux(travauxFiltrees);
        }

    });

    const boutonFiltrerHotelRestaurant = document.querySelector("#hotelsRestaurants");

    boutonFiltrerHotelRestaurant.addEventListener("click",async function () {
        for (let i = 0; i < travaux.length; i++) {
            const travauxFiltrees = travaux.filter(function (work) {
                return work.categoryId = 3;
            });
            document.querySelector(".gallery").innerHTML = "";
            genererTravaux(travauxFiltrees);
        }

    });
