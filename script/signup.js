document.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (!email || !password) {
        alert('Tous les champs doivent être remplis');
        return;
    }

    if (password.length < 10) {
        alert('Le mot de passe doit contenir au moins 10 caractères');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok && data.message === 'Utilisateur créé avec succès') {
            localStorage.setItem('token', data.token);
            alert('Inscription réussie ! Vous allez être redirigé vers la page de connexion.');
            window.location.href = './index.html';
        } else {
            alert(data.message || 'Erreur lors de l\'inscription');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'inscription');
    }
});
