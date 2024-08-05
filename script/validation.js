document.getElementById('signupForm').addEventListener('submit', function(event) {
    // Récupérer les valeurs des champs
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    // Définir les regex
    const fullnamePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ ,.'-]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;

    // Vérifier les valeurs des champs avec les regex
    if (!fullnamePattern.test(fullname)) {
        alert('Full name must contain only letters, spaces, and certain special characters ( ,.\'- )');
        event.preventDefault(); // Empêcher l'envoi du formulaire
        return;
    }

    if (!emailPattern.test(email)) {
        alert('Enter a valid email address');
        event.preventDefault(); // Empêcher l'envoi du formulaire
        return;
    }

    if (!passwordPattern.test(password)) {
        alert('Password must be at least 9 characters long and contain at least one letter and one number');
        event.preventDefault(); // Empêcher l'envoi du formulaire
        return;
    }

    // Si tout est valide, le formulaire peut être soumis
    alert('Form submitted successfully!');
});
