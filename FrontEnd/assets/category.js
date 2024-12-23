  async function afficherFiltre(categories) {
    const sectionFiltres = document.querySelector(".filtres");
    categories.forEach(category=>{
        const button = document.createElement("button")
        button.classList.add('filtre');
        button.textContent = category.name
        button.addEventListener("click", async function (){
            // Récupération des travaux depuis le fichier JSON
        const reponse = await fetch('http://localhost:5678/api/works');
        const travaux = await reponse.json();
            await genererTravaux(travaux)
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
               const travauxFiltrees = travaux.filter(function (work) {               
                 return work.categoryId === category.id              
                
            });
            document.querySelector(".gallery").innerHTML = "";
            genererTravaux(travauxFiltrees);
               
        })
        sectionFiltres.appendChild(button) 
   
    }

     )
}



 




    
  
    
    