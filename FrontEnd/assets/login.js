// Executing JS code when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('user-login-form').addEventListener('submit',async function(event) {
		event.preventDefault();
		// Gathering data from form
		const user = {
			email: document.querySelector('#email').value,
			password: document.querySelector('#password').value,
		};
		// Sending request in order to authentificate
		fetch('http://localhost:5678/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user),
		})
		.then(function(response) {
			switch(response.status) {
				case 500:
				case 503:
					alert("Erreur côté serveur!");
				break;
				case 401:
				case 404:
					alert("Email ou mot de passe incorrect!");
				break;
				case 200:
					console.log("Authentification réussie.");
					return response.json();
				break;
				default:
					alert("Erreur inconnue!");
				break;
			}
		})
		.then(function(data) {
			console.log(data);
			localStorage.setItem('token', data.token);
			localStorage.setItem('userId', data.userId);
			// Redirect to 'index.html'
			location.href = 'index.html';
		})
		.catch(function(err) {
			console.log(err);
		});
	});
});