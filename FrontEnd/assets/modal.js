const works = fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(data => {
    console.log('data', data);
    ajoutTravaux(data)
              
});
 function ajoutTravaux(works) {
    const listOfWorks  = document.querySelector(".modify_action");
	listOfWorks .addEventListener("click", async function (event) {
		event.preventDefault();	


       /* async function modalData(data) {
            data.forEach((item, i) => {
                const sectionWorks = document.querySelector(".modal_gallery");
                const workElement = document.createElement("figure");
                workElement.classList.add('work-element');
    
                const imageElement = document.createElement("img");
                imageElement.src = item.imageUrl;
                imageElement.style.width = "76.86px";
                imageElement.style.height = "102.57px";
    
                const trashIcon = document.createElement("i");
                trashIcon.classList.add('fa-regular', 'fa-trash-can', 'trash-icon');
    
                const linkIcon = document.createElement("a");
                linkIcon.classList.add('link-icon');
                linkIcon.appendChild(trashIcon);
    
                linkIcon.addEventListener('click', function(e) {
                    e.preventDefault();
                    deleteImage(item);
                });
    
                const figcaptionElement = document.createElement("figcaption");
                figcaptionElement.style.fontSize = "14px";
    
                sectionWorks.appendChild(workElement);
                workElement.appendChild(imageElement);
                workElement.appendChild(linkIcon);
                workElement.appendChild(figcaptionElement);
            }); */
            
        
                for (let i = 0; i < works.length; i++) {
              
                    const travail = works[i];
                    // Récupération de l'élément du DOM qui accueillera les travaux
                    const sectionWorks = document.querySelectorAll(".modal .modal_gallery");
                    
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
        
                    linkIcon.addEventListener('click', function(e) {
                        e.preventDefault();
                        deleteImage(item);
                    });
        
                    const figcaptionElement = document.createElement("figcaption");
                    console.log(travail.title)
                    figcaptionElement.innerText = travail.title;
                    figcaptionElement.style.fontSize = "14px";
                    
                     // On rattache la balise work a la section madal
                    sectionWorks.appendChild(workElement);
                    workElement.appendChild(imageElement);
                    workElement.appendChild(linkIcon);
                    workElement.appendChild(figcaptionElement);                   
                          
                  
          
                 }      
              
         
         

        

        
    })

}

function deleteImage(item) {
    console.log('item: ', item);
    token = window.localStorage.getItem("token")
    console.log(token)
    fetch(`http://localhost:5678/api/works/${item.id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}