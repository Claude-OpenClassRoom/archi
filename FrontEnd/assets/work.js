
// Récupération des travaux depuis le fichier JSON
const reponse = await fetch('http://localhost:5678/api/works');
const travaux = await reponse.json();
console.log(travaux);

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
                  imageElement.src = travail.imageUrl;                                 
                     
                  const trashIcon = document.createElement("i");
                  trashIcon.classList.add('fa-regular', 'fa-trash-can', 'trash-icon');
      
                  const linkIcon = document.createElement("a");
                  linkIcon.classList.add('link-icon');
                  linkIcon.appendChild(trashIcon);
      
                  linkIcon.addEventListener("click", function (event) {
                      event.preventDefault(); // Empêche le rechargement de la page
                      deleteWork(travail.id); // Supprime le travail lors du clic
                    });                
                  
                   // On rattache la balise work a la section madal
                  sectionWorks.appendChild(workElement);
                  workElement.appendChild(imageElement);
                  workElement.appendChild(linkIcon);
       
                const closedGallery = document.querySelector (".closed")                   
                closedGallery .addEventListener("click", async function () {      
                  document.querySelector(".modal_gallery").innerHTML = "";
                  const aside = document.querySelector(".modal")
                  aside.style.display="none";
                } )
        
               }           
           
  })

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
    boutonFiltrerTous.classList.add('filtre');
    boutonFiltrerTous.addEventListener("click", async function () {     
        await genererTravaux(travaux)
        document.querySelector(".gallery").innerHTML = "";
        genererTravaux(travaux);
    });

afficherFiltre(categories)

 
// Fonction pour afficher les catégories dans l'interface utilisateur.


// Fonction pour filtrer les travaux par catégorie.
async function filterWorks(categoryId) {
}

// Vérifie si l'utilisateur est connecté
function isConnected() {
  // Retourne vrai si le token existe dans le localStorage, faux sinon
  return localStorage.getItem("token") !== null;
}

// Gère le bouton de connexion/déconnexion en fonction de l'état de connexion
function handleLoginButton() {
  const loginButton = document.querySelector("#login-button");
  const bandeau_mode_edition = document.querySelector("#header-edit")
  const pop_up_modif = document.querySelector(".popup_edit")
  const filtreCategorie= document.querySelector(".filtre")
  if (isConnected()) {
    loginButton.innerText = "logout";
    bandeau_mode_edition.style.display="block";
    pop_up_modif.style.display="block";
    pop_up_modif.style.display="flex";
    document.querySelector(".filtres").innerHTML = "";
    loginButton.addEventListener("click", () => {
      localStorage.removeItem("token");
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
   // filterContainer.style.display = "none";
  } else {
    // Sinon, masque les éléments d'édition et affiche le conteneur de filtres
    headerEdit.style.display = "none";
    editWorks.style.display = "none";
   // filterContainer.style.display = "flex";
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
  handleAdminElements();
})();



  


   