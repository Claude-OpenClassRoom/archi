
import { afficherFiltre } from "./category.js";
import {} from "./modal.js"
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
     globalWorks = null; // Réinitialise le cache des travaux
     await displayWorksInModal(); // Met à jour l'affichage sans rechargement de la page
     await displayFilteredWorks(); // Rafraîchit l'affichage des travaux
    } catch (error) {
      console.error("Erreur lors de la suppression:", error); // Log en cas d'erreur
    }
  }
  
  // Rafraîchit l'affichage des travaux quand nécessaire
  const editWorksButton = document.getElementById("edit-works");
  if (editWorksButton) {
    editWorksButton.addEventListener("click", displayWorksInModal);
  }

  // Variable globale pour stocker les travaux afin d'éviter des requêtes API multiples inutiles.
let globalWorks = null;

// Fonction asynchrone pour récupérer les travaux depuis l'API.
async function getWorks() {
  // Vérifie si les travaux ont déjà été récupérés et stockés dans la variable globale.
  if (!globalWorks) {
    try {
      // Effectue la requête à l'API.
      const response = await fetch("http://localhost:5678/api/works");
      // Vérifie si la réponse est valide.
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Convertit la réponse en JSON et la stocke dans la variable globale.
      globalWorks = await response.json();
      console.log("Works fetched:", globalWorks);
    } catch (error) {
      console.error("Failed to fetch works:", error.message);
      // Assigner un tableau vide en cas d'échec de la récupération des données.
      globalWorks = [];
    }
  }
  // Retourne les travaux stockés.
  return globalWorks;
}

// Fonction asynchrone pour récupérer les catégories depuis l'API.
async function getCategories() {
  // Requête pour récupérer les catégories.
  const categories = await fetch("http://localhost:5678/api/categories");
  console.log(categories);
  const categoriesJson = await categories.json();
  console.log(categoriesJson);
  return categoriesJson;
}
// Fonction pour afficher les catégories dans l'interface utilisateur.
async function displayCategories() {
  const categories = await getCategories();
  // Ajoute une option "Tous" pour permettre l'affichage de tous les travaux.
  categories.unshift({ id: 0, name: "Tous" });
  const filtersContainer = document.querySelector("#filter-container");
  /*filtersContainer.innerHTML = ""; // Vide les filtres existants pour éviter les duplications lors de l'affichage*/

  categories.forEach((cat) => {
    const filterElement = document.createElement("div");
    filterElement.classList.add("filter-item");
    filterElement.innerText = cat.name;
    filterElement.addEventListener("click", () => {
      // Supprime la classe 'selected' de tous les éléments pour s'assurer que seul l'élément actif l'ait
      document
        .querySelectorAll(".filter-item")
        .forEach((item) => item.classList.remove("selected"));
      filterElement.classList.add("selected"); // Ajoute la classe 'selected' à l'élément cliqué
      filterWorks(cat.id); // Filtre les travaux en fonction de la catégorie sélectionnée
    });
   /* filtersContainer.appendChild(filterElement);*/
  });

  // Sélectionne par défaut le premier élément 'Tous'
 /*filtersContainer.firstChild.classList.add("selected"); */
}

// Fonction pour filtrer les travaux par catégorie.
async function filterWorks(categoryId) {
}

// Affiche les travaux filtrés dans la galerie
async function displayFilteredWorks(filteredWorks = null) {
  const galleryElement = document.querySelector(".gallery");
  // Vide la galerie avant d'ajouter les nouveaux éléments pour éviter les duplications
  galleryElement.innerHTML = "";

  // Si aucun travail filtré n'est fourni, récupère tous les travaux
  if (filteredWorks == null) {
    filteredWorks = await getWorks();
  }

  // Crée et ajoute chaque élément de travail à la galerie
  for (let travail of filteredWorks) {
    const figureElement = document.createElement("figure");
    const figcaptionElement = document.createElement("figcaption");
    const imgElement = document.createElement("img");
    imgElement.src = travail.imageUrl;
    figcaptionElement.innerText = travail.title;
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
    galleryElement.appendChild(figureElement);
  }
}

// Vérifie si l'utilisateur est connecté
function isConnected() {
  // Retourne vrai si le token existe dans le sessionStorage, faux sinon
  return sessionStorage.getItem("token") !== null;
}

// Gère le bouton de connexion/déconnexion en fonction de l'état de connexion
function handleLoginButton() {
  const loginButton = document.querySelector("#login-button");
  if (isConnected()) {
    loginButton.innerText = "logout";
    loginButton.addEventListener("click", () => {
      sessionStorage.removeItem("token");
      window.location.href = "./index.html"; // Redirige vers l'accueil après déconnexion
    });
  } else {
    loginButton.innerText = "login";
    loginButton.addEventListener("click", () => {
      window.location.href = "./login.html"; // Redirige vers la page de connexion
    });
  }
}

// Affiche ou cache les éléments administratifs en fonction de l'état de connexion
function handleAdminElements() {
  const adminElements = document.querySelectorAll(".admin-element");
  if (isConnected()) {
    adminElements.forEach((element) => {
      element.classList.remove("hidden"); // Affiche les éléments
    });
  } else {
    adminElements.forEach((element) => {
      element.classList.add("hidden"); // Cache les éléments
    });
  }
}

// Ajuste l'affichage de certains éléments du DOM en fonction de l'état de connexion
function adjustDisplayBasedOnLogin() {
  const loggedIn = isConnected();
  const headerEdit = document.getElementById("header-edit");
  const editWorks = document.getElementById("edit-works");
  const filterContainer = document.getElementById("filter-container");

  // Si l'utilisateur est connecté, affiche les éléments d'édition et masque le conteneur de filtres
  if (loggedIn) {
    headerEdit.style.display = "flex";
    editWorks.style.display = "block";
    filterContainer.style.display = "none";
  } else {
    // Sinon, masque les éléments d'édition et affiche le conteneur de filtres
    headerEdit.style.display = "none";
    editWorks.style.display = "none";
    filterContainer.style.display = "flex";
  }
}

// Initialisation des fonctions liées à la connexion et l'affichage lors du chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  adjustDisplayBasedOnLogin();
  handleLoginButton();
});

// Fonction principale qui initialise toutes les autres au chargement de la page
(function main() {
  handleLoginButton();
  displayFilteredWorks();
  displayCategories();
  handleAdminElements();
})();
  


   
