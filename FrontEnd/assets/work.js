
import { afficherFiltre } from "./category.js";
import {} from "./login.js";


// Récupération des travaux depuis le fichier JSON
const reponse = await fetch('http://localhost:5678/api/works');
const travaux = await reponse.json();
const response = await fetch('http://localhost:5678/api/categories');
const categories = await response.json();


/*ajoutListenerEnvoyerUtilisateur()*/
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


const works = fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(data => {
    console.log('data', data);
    ajoutTravaux(data)
              
});
  async function ajoutTravaux(works) {
    const listOfWorks  = document.querySelector(".modify_action");
	listOfWorks .addEventListener("click", async function (event) {
		event.preventDefault();	            
        const aside = document.querySelector(".modal")
        aside.style.display="block";
                for (let i = 0; i < works.length; i++) {
              
                    const travail = works[i];
                    // Récupération de l'élément du DOM qui accueillera les travaux
                    
                    const sectionWorks = document.querySelector(".modal_gallery");
 
                    // Création d’une balise dédiée à un work
                    const workElement = document.createElement("figure");
                    // Création des balises 
                    workElement.classList.add('work-element');
    
                    const imageElement = document.createElement("img");
                    console.log(travail.imageUrl)
                    imageElement.src = travail.imageUrl;
                                    
                    imageElement.style.width = "76.86px";
                    imageElement.style.height = "102.57px";
        
                    const trashIcon = document.createElement("i");
                    trashIcon.classList.add('fa-regular', 'fa-trash-can', 'trash-icon');
        
                    const linkIcon = document.createElement("a");
                    linkIcon.classList.add('link-icon');
                    linkIcon.appendChild(trashIcon);
        
                    linkIcon.addEventListener("click", function (event) {
                        event.preventDefault(); // Empêche le rechargement de la page
                        deleteWork(travail.id); // Supprime le travail lors du clic
                      });
        
                    const figcaptionElement = document.createElement("figcaption");
                    console.log(travail.title)
                    figcaptionElement.innerText = travail.title;
                    figcaptionElement.style.fontSize = "14px";
                    
                     // On rattache la balise work a la section madal
                    sectionWorks.appendChild(workElement);
                    workElement.appendChild(imageElement);
                    workElement.appendChild(linkIcon);
                  //  workElement.appendChild(figcaptionElement);
                  const closedGallery = document.querySelector (".closed")                   
                  closedGallery .addEventListener("click", async function () {      
                    document.querySelector(".modal_gallery").innerHTML = "";
                    const aside = document.querySelector(".modal")
                    aside.style.display="none";
                  } )
          
                 }           
             
    })

}


////////////////////// FONCTION DELETE //////////////////////

// Fonction asynchrone pour supprimer un travail par son identifiant
async function deleteWork(workId) {
    try {
      // Envoie une requête DELETE à l'API pour supprimer le travail spécifié
      const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Utilise le token stocké pour l'authentification
        },
      });
  
      // Si la réponse n'est pas OK, lance une exception
      if (!response.ok) throw new Error("Failed to delete work"); // Gère les réponses non réussies
    /*  globalWorks = null; // Réinitialise le cache des travaux*/
    /*  await displayWorksInModal(); // Met à jour l'affichage sans rechargement de la page*/
    /*  await displayFilteredWorks(); // Rafraîchit l'affichage des travaux*/
    } catch (error) {
      console.error("Erreur lors de la suppression:", error); // Log en cas d'erreur
    }
  }
  
  // Rafraîchit l'affichage des travaux quand nécessaire
  const editWorksButton = document.getElementById("edit-works");
  if (editWorksButton) {
    editWorksButton.addEventListener("click", displayWorksInModal);
  }
  


   
