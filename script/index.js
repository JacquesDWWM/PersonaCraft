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

// --------------------------------------------------------------------------------
// Rajout d'animations sur les sections avec Observer API

// Sélectionne tous les éléments à observer (par exemple, des sections avec une classe spécifique)
const elements = document.querySelectorAll('.animatable');

// Crée un nouvel IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Ajoute une classe pour animer l'élément
      entry.target.classList.add('visible');
      // Optionnel : arrête d'observer une fois l'animation lancée
      observer.unobserve(entry.target);
    }
  });
}, {
  // Paramètres de l'observation
  root: null, // Observe par rapport à la fenêtre
  rootMargin: '0px',
  threshold: 0.3 // Déclenche à 30% de visibilité
});

// Applique l'observateur à chaque élément
elements.forEach(element => observer.observe(element));









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