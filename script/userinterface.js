// Récupérer le token JWT depuis localStorage
const token = localStorage.getItem('token');


// Vérifier si le token existe
if (!token) {
  alert('Vous devez être connecté pour accéder à cette page.');
  window.location.href = './signin.html'; // Redirection vers la page de login si pas de token
} else {
  // Faire une requête GET pour accéder aux informations de l'utilisateur
  fetch('http://localhost:3000/userinterface', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors de l\'accès aux données');
    }
    return response.json(); // Retourner la réponse JSON correctement
  })
  .then(data => {
    // Récupérer le nom d'utilisateur et l'afficher dans le header
    const username = data.user.username;
    document.getElementById('connected-user').textContent = `Salut ${username} 👋 !`;
  })
  .catch(error => {
    console.error('Erreur:', error);
    alert('Erreur lors de l\'accès aux données, veuillez vous reconnecter.');
    window.location.href = './signin.html'; // Redirection en cas d'erreur d'accès
  });
}

// --------------------------------------------------------------------------------

// Fonction pour masquer toutes les sections
function hideAllSections() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
}

// Fonction pour afficher la section correspondante
function showSection(sectionId) {
    hideAllSections();
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
}

// Ajouter un écouteur d'événements sur chaque élément du menu
const menuItems = document.querySelectorAll('.left-pannel ul li');
menuItems.forEach(item => {
    item.addEventListener('click', (event) => {
        const target = item.getAttribute('data-target');
        showSection(target);
    });
});
showSection('content-sites');


// supprime le token et redirige vers l'index
document.getElementById('logout').addEventListener('click', (e) => {
    localStorage.removeItem('token');
    window.location.href = './index.html';
});


// récup les infos des users
async function fetchProfileData() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/profile', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
  });
  if (response.ok) {
    const profile = await response.json();    
    // pré-rempli le formulaire
    document.getElementById('nom-utilisateur').value = profile.username || '';
    document.getElementById('nom').value = profile.first_name || '';
    document.getElementById('prenom').value = profile.last_name || '';
    document.getElementById('avatar-img').style.backgroundImage = `url(${profile.profile_picture_url || ''})`;
    document.getElementById('adresse').value = profile.street || '';
    document.getElementById('complement-adresse').value = profile.street_add || '';  // Gérer les valeurs NULL
    document.getElementById('ville').value = profile.city || '';
    document.getElementById('code-postal').value = profile.postal_code || '';
} else {
      console.error('Erreur lors de la récupération du profil');
  }
}


// pré-rempli le formulaire au chargement de la page
fetchProfileData();

// --------------------------------------------------------------------------------

// Maj des informations du profil
document.querySelector('.save').addEventListener('click', async () => {
  const token = localStorage.getItem('token');  
  const updatedProfile = {
      username: document.getElementById('nom-utilisateur').value,
      first_name: document.getElementById('nom').value,
      last_name: document.getElementById('prenom').value,
      profile_picture_url: document.getElementById('avatar-img').getAttribute('data-url'),  // Par exemple, si tu stockes l'URL ici après l'upload
      street: document.getElementById('adresse').value,
      // street_add: document.getElementById('complément-adresse').value,
      city: document.getElementById('ville').value,
      postal_code: document.getElementById('code-postal').value
  };  
  const response = await fetch('http://localhost:3000/profile', {
      method: 'PUT',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken,
      },
      body: JSON.stringify(updatedProfile)
  });
  if (response.ok) {
      alert('Profil mis à jour avec succès');
      
      // Rafraîchir la page pour mettre à jour les informations affichées
      window.location.reload();
  } else {
      console.error('Erreur lors de la mise à jour du profil');
  }
});


// Réinitialiser les champs à leur état initial (avant modification)
document.querySelector('.cancel').addEventListener('click', () => {
  fetchProfileData();  // Recharger les données actuelles depuis la base de données
});


// --------------------------------------------------------------------------------

// Supprimer mon compte

// Sélectionner le bouton de suppression
// document.querySelector('#deleteAccount').addEventListener('click', async () => {
//   if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
//       try {
//           const response = await fetch(`http://localhost:3000/user/delete-account`, {
//               method: 'DELETE',
//               headers: {
//                   'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                   'Content-Type': 'application/json'
//               }
//           });

//           if (response.ok) {
//               alert('Votre compte a été supprimé avec succès.');
//               // Rediriger vers la page de connexion ou d'accueil après suppression
//               window.location.href = '/login'; // ou '/home' selon ton choix
//           } else {
//               const error = await response.json();
//               alert(error.message || 'Erreur lors de la suppression du compte');
//           }
//       } catch (error) {
//           console.error('Erreur lors de la suppression du compte :', error);
//           alert('Une erreur est survenue, veuillez réessayer plus tard.');
//       }
//   }
// });

