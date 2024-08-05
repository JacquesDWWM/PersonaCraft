const companies = ["Entreprise 1", "Entreprise 2", "Entreprise 3", "Entreprise 4", "Entreprise 5", "Entreprise 6", "Entreprise 7", "Entreprise 8", "Entreprise 9", "Entreprise 10", "Entreprise 11", "Entreprise 12", "Entreprise 13", "Entreprise 14", "Entreprise 15", "Entreprise 16", "Entreprise 17", "Entreprise 18", "Entreprise 19", "Entreprise 20"];
const proofContent = document.querySelector('.proof');
const imgUrl = '../images/utopixia shirt.svg';

function createProofContent() {
    proofContent.innerHTML = ''; // Réinitialiser le contenu
    companies.forEach(company => {
        const span = document.createElement('span');
        span.className = 'proofCard';
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = 'trust company';
        proofContent.appendChild(span);
        span.appendChild(img);
    });
}

function startProof() {
    createProofContent();
    const clonedContent = proofContent.cloneNode(true);
    clonedContent.style.paddingLeft = '0';
    proofContent.appendChild(clonedContent);
}

startProof();