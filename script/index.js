const sign = document.querySelector('#sign');
const log = document.querySelector('#log');
const popLog = document.querySelector('#pop-log');
const cardLog = document.querySelector('#card-log');
const remove = document.querySelector('#remove');
const burger = document.querySelector('#burger');
const remover = document.querySelector('#remover');
const menupop = document.querySelector('#menupop');

// apparition pop up pour inscription
sign.addEventListener('click', (e) => {
    e.preventDefault();
    popLog.style.display = 'flex';
});
// apparition pop up pour login
log.addEventListener('click', (e) => {
    e.preventDefault();
    popLog.style.display = 'flex';
});
//  retrait du pop up pour inscription
remove.addEventListener('click', (e) => {
    e.preventDefault();
    popLog.style.display = 'none';
});

burger.addEventListener('click', () => {
    menupop.style.display = 'flex';
});

remover.addEventListener('click', () => {
    menupop.style.display = 'none';
})

// Partie sign up


document.querySelector('#signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullname = document.querySelector('#fullname').value;
    const mail = document.querySelector('#mail').value;
    const password = document.querySelector('#password').value;

    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullname, mail, password })
    })

    .then(response => response.json());

    if (response.ok) {
        console.log('Inscription réussie');
    } else {
        console.log('Erreur lors de l\'inscription');
    }
});


