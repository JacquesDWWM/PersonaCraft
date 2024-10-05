document.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Vérification basique des champs email et mot de passe
    if (!email || !password) {
        alert('Tous les champs doivent être remplis');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            localStorage.setItem('token', data.token, 'roles', data.role);

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
