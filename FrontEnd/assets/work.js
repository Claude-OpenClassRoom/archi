
import { afficherFiltre } from "./category.js";
// Récupération des travaux depuis le fichier JSON
const reponse = await fetch('http://localhost:5678/api/works');
const travaux = await reponse.json();
const response = await fetch('http://localhost:5678/api/categories');
const categories = await response.json();


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
    
    buttonElementTous.innerHTML="<button id='tous'>Tous</button>"
    
    // On rattache la balise navigation à la section gallery
    sectionFiltres.appendChild(buttonElementTous);

  
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

afficherFiltre(categories)



   
