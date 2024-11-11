document.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !password) {
        alert('Tous les champs doivent être remplis');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message || 'Erreur de connexion');
            return;
        }
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            if (data.role === 'admin') {
                window.location.href = './admin.html';
            } else if (data.role === 'user') {
                window.location.href = './userinterface-tw.html';
            } else {
                alert("Compte utilisateur inconnu. Contactez l'administrateur.");
            }
        } else {
            alert(data.message || 'Erreur de connexion');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la connexion au serveur');
    }
});
