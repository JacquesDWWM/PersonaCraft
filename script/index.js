document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');

    if (token) {
        // Décoder le token JWT pour récupérer les infos
        const payloadBase64 = token.split('.')[1];  // La deuxième partie du JWT est le payload
        const decodedPayload = JSON.parse(atob(payloadBase64));  // Décoder en JSON

        // Récupérer le rôle de l'utilisateur à partir du token
        const userRole = decodedPayload.role;

        // Masquer les boutons d'authentification
        document.getElementById('auth-buttons').style.display = 'none';

        // Afficher le bouton approprié en fonction du rôle de l'utilisateur
        if (userRole === 'admin') {
            document.getElementById('admin-button').style.display = 'block';  // Afficher le bouton admin
        } else {
            document.getElementById('dashboard-button').style.display = 'block';  // Afficher le bouton dashboard pour les users normaux
        }
    }
});


const menuPopOver = document.getElementById('menuPopOver');
const burger = document.getElementById('burger');

// Afficher le menu déroulant
burger.addEventListener('click', () => {
    if (menuPopOver.style.display === 'none') {
    menuPopOver.style.display = 'flex';
    burger.innerHTML = 'close';
    burger.style.transform = 'rotate(180deg)';
    }else{
        menuPopOver.style.display = 'none';
        burger.innerHTML = 'menu';
        burger.style.transform = 'rotate(0deg)';
    }
}
);