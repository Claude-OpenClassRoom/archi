export function selectionListenersObjet() {


const boutonFiltrerObjet = document.querySelector(".filtres button #objet");

    boutonFiltrerObjet.addEventListener("click",async function () {
        for (let i = 0; i < travaux.length; i++) {
        const id = event.target.dataset.id;    
        const reponse = await fetch("http://localhost:5678/api/works" );
        const category = await reponse.json(); 

        const objetFiltrees = category.filter(function (work) {
            return work.category.name= "Objets";
            
        });

        }
    }) 
    
} ;  
    
    