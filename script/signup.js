document.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Vérification des champs pour s'assurer qu'ils ne sont pas vides
    if (!username || !email || !password) {
        alert('Tous les champs doivent être remplis');
        return;
    }

    // Vérification basique de la longueur du mot de passe
    if (password.length < 8) {
        alert('Le mot de passe doit contenir au moins 8 caractères');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        console.log(response);  

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur dans la requête');
        }

        const data = await response.json();

        console.log(data);

        // Vérifie que le message de succès est bien reçu du backend
        if (data.message === 'Utilisateur créé avec succès') {
            // Si un token est renvoyé, on le stocke
            localStorage.setItem('token', data.token); 
            window.location.href = './index.html';  // Redirection après succès
        } else {
            alert('Erreur lors de l\'inscription');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'inscription 2');
    }
});
