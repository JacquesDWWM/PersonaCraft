async function fetchUserData() {
  const token = localStorage.getItem('token');
  // vérif existence token
  if (!token) {
    alert('You have to be logged in to access this page.');
    window.location.href = './signin.html';
    return;
  }
  try {
    const response = await fetch('http://localhost:3000/user/dashboard', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    // vérif de la réponse
    if (!response.ok) {
      throw new Error('Error while fetching user data');
    }

    // Récupération des données utilisateur
    const userData = await response.json();

    // Remplir les inputs avec les données récupérées (si disponibles)
    document.getElementById('companyName').value = userData.general ? userData.general.companyName : '';
    document.getElementById('description').value = userData.general ? userData.general.description : '';
    document.getElementById('firstName').value = userData.personal ? userData.personal.first_name : '';
    document.getElementById('lastName').value = userData.personal ? userData.personal.last_name : '';
    document.getElementById('street').value = userData.personal ? userData.personal.street : '';
    document.getElementById('streetAdd').value = userData.personal ? userData.personal.street_add : '';
    document.getElementById('city').value = userData.personal ? userData.personal.city : '';
    document.getElementById('postalCode').value = userData.personal ? userData.personal.postal_code : '';
    document.getElementById('country').value = userData.personal ? userData.personal.country : '';
    document.getElementById('loginEmail').value = userData.account ? userData.account.login_email : '';
    document.getElementById('plan').value = userData.subscription ? userData.subscription.plan : '';
    document.getElementById('billingEmail').value = userData.billing ? userData.billing.billing_email : '';
    document.getElementById('paymentMethod').value = userData.billing ? userData.billing.payment_method : '';    
  } catch (error) {
    console.error('Error:', error);
    alert('Error while fetching user data, please log in again.');
    window.location.href = './signin.html'; // Redirection en cas d'erreur d'accès
  }
}


// Appel de la fonction pour récupérer les données lorsque la page est chargée
window.onload = fetchUserData;


// suppression du token et redirection vers l'index
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = './index.html';
});


// Maj des informations de l'user
document.getElementById('save').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = './signin.html';
    return;
  }
  // let csrfToken;
  // try {
  //   const csrfResponse = await fetch('http://localhost:3000/csrf-token', {
  //     method: 'GET',
  //     credentials: 'include',
  //   });
  //   if (!csrfResponse.ok) {
  //     throw new Error('Unable to fetch CSRF token');
  //   }
  //   const csrfData = await csrfResponse.json();
  //   csrfToken = csrfData.csrf;
  // } catch (error) {
  //   console.error('Error while fetching CSRF token:', error);
  //   alert('Unable to fetch CSRF token. Please try again.');
  //   return;
  // }
  const updatedProfile = {
    first_name: document.getElementById('firstName').value,
    last_name: document.getElementById('lastName').value,
    companyName: document.getElementById('companyName').value,
    street: document.getElementById('street').value,
    street_add: document.getElementById('streetAdd').value,
    city: document.getElementById('city').value,
    postal_code: document.getElementById('postalCode').value,
    country: document.getElementById('country').value,
    billing_email: document.getElementById('billingEmail').value,
    payment_method: document.getElementById('paymentMethod').value,
    login_email: document.getElementById('loginEmail').value,
    plan: document.getElementById('plan').value,
  };
  try {
    const response = await fetch('http://localhost:3000/user/update', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
        // 'CSRF-Token': csrfToken,
      },
      body: JSON.stringify(updatedProfile),
      // credentials: 'include',
    });
    if (response.ok) {
      alert('Profil mis à jour avec succès');
      window.location.reload(); // Rafraîchir la page pour mettre à jour les infos
    } else {
      const errorData = await response.json();
      console.error('Erreur:', errorData.message);
      alert('Erreur lors de la mise à jour du profil. Veuillez réessayer.');
    }
  } catch (error) {
    console.error('Erreur:', error);
    alert('Une erreur s\'est produite. Veuillez réessayer.');
  }
  window.location.reload();
});

// --------------------------------------------------------------------------------
// Recharger les données utilisateur lorsque l'utilisateur annule les modifications
document.getElementById('cancel').addEventListener('click', () => {
  fetchUserData();  // Recharger les données actuelles depuis la base de données
});
