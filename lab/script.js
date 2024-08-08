// fonction qui permet parametrer la taille de l'iframe
const iframe = document.querySelector('#iframe');
let iframeWidth = iframe.style.width || iframe.offsetWidth + 'px';
const viewOptions = document.querySelectorAll('.option');
viewOptions.value = iframe.style.width;
viewOptions.forEach(option => {
    option.addEventListener('click', e => {
        iframe.style.width = e.target.value;
    });
});
// fonction qui permet de changer le mode de preview ou edition
// const viewMode = document.querySelector('.vue');
const menu = document.querySelector('.menu');
const viewMode = document.querySelector('.viewMode');
    viewMode.addEventListener('click', (e) => {
        if (e.target.value === 'preview') {
            menu.style.display = 'none';
        } else if (e.target.value !== 'preview') {
            menu.style.display = 'flex';
        }
    });

// fonction qui permet de changer le nom du site web
const websiteName = document.querySelector('#websiteName');
let websiteNameValue = websiteName.value;
function updateWebsiteName(e) {
    websiteNameValue = e.target.value;
}
websiteName.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        updateWebsiteName(event);
        websiteName.value = localStorage.setItem('websiteName.value');
    }});
// fonction hiddenMenu
const hiddenMenu = document.querySelector('.hiddenMenu');
const menuButton = document.querySelector('.menuButton');
menuButton.addEventListener('click', () => {
    if (hiddenMenu.style.display === 'none') {
        hiddenMenu.style.display = 'flex';
    } else {
        hiddenMenu.style.display = 'none';
    }});

