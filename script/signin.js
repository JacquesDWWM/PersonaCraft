// Fonction pour récupérer la valeur d'un cookie
// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }

document.querySelector('#form').addEventListener('submit', async (e) => {
   e.preventDefault(); 

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Regex pour valider le format de l'email
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;


    
    // Vérification basique des champs email et mot de passe
    // if (!email || !password) {
    //     alert('Tous les champs doivent être remplis');
    //     return;
    // }

    // Validation du format de l'email
    // if (!emailRegex.test(email)) {
    //     alert('Veuillez entrer une adresse email valide');
    //     return;
    // }

    // Validation du format du mot de passe
    // if (!passwordRegex.test(password)) { alert('Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
    //     return;
    // }

    // Récupération du token CSRF depuis le cookie
    // const csrfToken = getCookie('XSRF-TOKEN');

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'CSRF-Token': csrfToken // Envoie le token CSRF dans les en-têtes
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }

        const data = await response.json();

        if (data.token) {
            localStorage.setItem('token', data.token);

            // Vérifier le rôle de l'utilisateur et rediriger en conséquence
            if (data.role === 'admin') {
                window.location.href = './admin.html'; // Redirection vers la page admin
            } else if (data.role === 'user') {
                window.location.href = './userinterface.html'; // Redirection vers la page utilisateur
            }
        } else {
            alert('Erreur de connexion');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la connexion au serveur');
    }
});
