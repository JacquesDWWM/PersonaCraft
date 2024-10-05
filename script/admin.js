async function fetchUsers() {
    const response = await fetch('http://localhost:3000/admin/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Inclure le token pour l'authentification
            'Content-Type': 'application/json'
        }
    });

    // Vérification du statut de la réponse
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur du serveur :', errorText);
        alert(`Erreur ${response.status}: ${errorText}`);
        return [];
    }

    try {
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Erreur lors du parsing JSON :', error);
        return [];
    }
}


// Afficher les utilisateurs dans le tableau
function displayUsers(users) {
    const tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = ''; // Réinitialiser le contenu du tableau

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.roles}</td>
            <td>${new Date(user.created_at).toLocaleDateString()}</td>
            <td>${new Date(user.updated_at).toLocaleDateString()}</td>
            <td>
                <span class="edit-btn material-symbols-outlined" data-id="${user.id}">edit</span>
                <span class="delete-btn material-symbols-outlined" data-id="${user.id}">delete</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Filtrer les utilisateurs en fonction de la recherche
function filterUsers(users, searchTerm) {
    return users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Mettre à jour l'affichage en fonction de la recherche
document.querySelector('#searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    const filteredUsers = filterUsers(usersData, searchTerm);
    displayUsers(filteredUsers);
});

// Gérer la suppression des utilisateurs
document.querySelector('#usersTable').addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const userId = e.target.getAttribute('data-id');
        
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            await fetch(`http://localhost:3000/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            // Recharger la liste des utilisateurs après suppression
            fetchUsers().then(users => displayUsers(users));
        }
    }
});

let usersData = [];

// Charger les utilisateurs au démarrage
fetchUsers().then(users => {
    usersData = users; // Stocker les utilisateurs pour le filtrage
    displayUsers(users);
});
