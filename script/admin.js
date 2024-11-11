// Récupération les users
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/admin/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server error :', errorText);
            alert(`Erreur ${response.status}: ${errorText}`);
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('Error while fetching users :', error);
        alert("Connection failed.");
        return [];
    }
}


// suppression du token et redirection vers l'index
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = './index.html';
});


// fonction gérant l'affichage des users
function displayUsers(usersData) {
    const tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = '';
    usersData.forEach(userData => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${userData.email}</td>
            <td>${userData.password ? '****' : 'Undefined password'}</td>
            <td>${userData.roles}</td>
            <td>${userData.created_at ? new Date(userData.created_at).toLocaleDateString() : "N/A"}</td>
            <td>${userData.updated_at ? new Date(userData.updated_at).toLocaleDateString() : "N/A"}</td>
            <td>
                <span class="delete-btn material-symbols-outlined" data-id="${userData.id}">delete</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


// Filtre les users avec la recherche
function filterUsers(users, searchTerm) {
    return users.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.roles.toLowerCase().includes(searchTerm.toLowerCase())
    );
}


// Listener pour la recherche
document.querySelector('#searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    const filteredUsers = filterUsers(usersData, searchTerm);
    displayUsers(filteredUsers);
});


// Gérer la suppression des utilisateurs
document.querySelector('#usersTable').addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const userId = e.target.getAttribute('data-id');        
        if (confirm('Sure about delete this user ?')) {
            try {
                const response = await fetch(`http://localhost:3000/admin/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Server error :', errorText);
                    alert(`Error ${response.status}: ${errorText}`);
                } else {
                    // Supprimez l'utilisateur du tableau sans recharger
                    usersData = usersData.filter(user => user.id !== parseInt(userId));
                    displayUsers(usersData);
                }
            } catch (error) {
                console.error("Error while deleting user :", error);
                alert("Connection failed.");
            }
        }
    }
});


// Variable globale pour stocker les users récupérés pour le filtrage
let usersData = [];


// Charger les utilisateurs au démarrage
fetchUsers().then(users => {
    usersData = users;
    displayUsers(users);
});
