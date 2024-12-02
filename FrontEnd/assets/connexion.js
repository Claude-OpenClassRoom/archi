
export function ajoutListenerEnvoyerUtilisateur() {
	const formulaireUtilisateur = document.querySelector(".formulaire-connexion");
	formulaireUtilisateur.addEventListener("submit", function (event) {
		event.preventDefault();		


        // Création de l’objet du nouveau utilsateur.
		const utilsateur = { 
			email: event.target.querySelector("[name=email-user]").value,
			password: event.target.querySelector("[name=mdp-user]").value,
		
		};
		// Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(utilsateur);
        console.log(chargeUtile)
		// Appel de la fonction fetch avec toutes les informations nécessaires
		fetch("http://localhost:5678/api/users/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: chargeUtile
		})
        .then (response => response.json())
        .then(data => {
            if(data.token) {
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem("auth", chargeUtile);
                window.location.href = "../index.html"; // Redirige vers la page d'accueil
            } else {
                console.log('Erreur de connexion');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
	});
        
}

