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
const pageButton = document.querySelector('#page');
const addButton = document.querySelector('#add');
const seoButton = document.querySelector('#seo');
const designButton = document.querySelector('#design');
const libraryButton = document.querySelector('#library');
const settingsButton = document.querySelector('#settings');
const pageMenu = document.querySelector('.pageMenu');
const addMenu = document.querySelector('.addMenu');
const seoMenu = document.querySelector('.seoMenu');
const designMenu = document.querySelector('.designMenu');
const libraryMenu = document.querySelector('.libraryMenu');
const settingsMenu = document.querySelector('.settingsMenu');
const showMenu = (menuToShow) => {
    const menus = [pageMenu, seoMenu, designMenu, libraryMenu, settingsMenu, addMenu];
    menus.forEach(menu => {
        if (menu === menuToShow) {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    });
};
menuButton.addEventListener('click', () => {
    hiddenMenu.style.display = (hiddenMenu.style.display === 'none') ? 'flex' : 'none';
});
pageButton.addEventListener('click', () => showMenu(pageMenu));
addButton.addEventListener('click', () => showMenu(addMenu));
seoButton.addEventListener('click', () => showMenu(seoMenu));
designButton.addEventListener('click', () => showMenu(designMenu));
libraryButton.addEventListener('click', () => showMenu(libraryMenu));
settingsButton.addEventListener('click', () => showMenu(settingsMenu));


// 


// Fonction pour ajouter la classe 'selected' à l'élément cliqué
function selectElement(element) {
    const iframeDocument = document.getElementById('iframe').contentDocument;

    // Retirer la classe 'selected' de tous les éléments
    const previouslySelected = iframeDocument.querySelector('.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
        previouslySelected.style.outline = ''; // Retirer la bordure précédente
        previouslySelected.style.border = ''; // Retirer la bordure précédente
    }
    

    // Ajouter la classe 'selected' à l'élément cliqué
    element.classList.add('selected');
    element.style.border = '1px solid #3D63DD';
    element.style.borderRadius = '5px';

    // Récupérer les styles et les afficher dans le panel
    updateStylePanel(element);
}

// Fonction pour mettre à jour les inputs du panel de style
function updateStylePanel(element) {
    const computedStyle = getComputedStyle(element);
    document.getElementById('wSize').value = computedStyle.width;
    document.getElementById('hSize').value = computedStyle.height;
    document.getElementById('minwSize').value = computedStyle.minWidth || '';
    document.getElementById('minhSize').value = computedStyle.minHeight || '';
    document.getElementById('maxwSize').value = computedStyle.maxWidth || '';
    document.getElementById('maxhSize').value = computedStyle.maxHeight || '';
    document.getElementById('selectedID').value = element.id || '';
    }

// Ajouter des événements de survol sur les éléments de l'iframe
function addHoverEffect(element) {
    element.addEventListener('mouseover', function() {
        if (!element.classList.contains('selected')) {
            element.style.outline = '1px solid #3D63DD'; // Ajouter la bordure au survol
        }
    });

    element.addEventListener('mouseout', function() {
        if (!element.classList.contains('selected')) {
            element.style.outline = ''; // Retirer la bordure lorsque la souris quitte
        }
    });
}

// Ajouter un listener sur l'iframe pour capturer les clics et les survols
document.getElementById('iframe').addEventListener('load', function() {
    const iframeDocument = this.contentDocument || this.contentWindow.document;
    
    // Ajouter l'effet de survol et de clic à tous les éléments de l'iframe
    iframeDocument.querySelectorAll('*').forEach(element => {
        element.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche les actions par défaut si nécessaire
            selectElement(event.target);
        });
        addHoverEffect(element);
    });
});

// Fonction pour appliquer les styles lorsque la touche Entrée est pressée
function applyStyleOnEnter(event) {
    if (event.key === 'Enter') {
        const selectedElement = document.getElementById('iframe').contentDocument.querySelector('.selected');
        if (selectedElement) {
            selectedElement.style.width = document.getElementById('wSize').value || '';
            selectedElement.style.height = document.getElementById('hSize').value || '';
            selectedElement.style.minWidth = document.getElementById('minwSize').value || '';
            selectedElement.style.minHeight = document.getElementById('minhSize').value || '';
            selectedElement.style.maxWidth = document.getElementById('maxwSize').value || '';
            selectedElement.style.maxHeight = document.getElementById('maxhSize').value || '';
            // document.getElementById('selectedID').value = element.id || '';
            selectedElement.id = document.getElementById('selectedID').value || '';
        }
    }
}

// Ajouter un écouteur d'événement pour détecter la touche Entrée sur chaque input
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keydown', applyStyleOnEnter);
});







document.querySelectorAll('.spacing-container input').forEach(input => {
    input.addEventListener('input', function() {
        const selectedElement = document.getElementById('iframe').contentDocument.querySelector('.selected');
        if (selectedElement) {
            const marginTop = document.getElementById('marginTopInput').value || '0';
            const marginRight = document.getElementById('marginRightInput').value || '0';
            const marginBottom = document.getElementById('marginBottomInput').value || '0';
            const marginLeft = document.getElementById('marginLeftInput').value || '0';

            const paddingTop = document.getElementById('paddingTopInput').value || '0';
            const paddingRight = document.getElementById('paddingRightInput').value || '0';
            const paddingBottom = document.getElementById('paddingBottomInput').value || '0';
            const paddingLeft = document.getElementById('paddingLeftInput').value || '0';

            selectedElement.style.marginTop = marginTop;
            selectedElement.style.marginRight = marginRight;
            selectedElement.style.marginBottom = marginBottom;
            selectedElement.style.marginLeft = marginLeft;

            selectedElement.style.paddingTop = paddingTop;
            selectedElement.style.paddingRight = paddingRight;
            selectedElement.style.paddingBottom = paddingBottom;
            selectedElement.style.paddingLeft = paddingLeft;
        }
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const menus = document.querySelectorAll(".sizeContainer, .spacingContainer, .typoContainer, .backgroundContainer, .borderContainer, .positionContainer");
    menus.forEach(menu => {
        const toggleButton = menu.querySelector(".rSideMenu");

        toggleButton.addEventListener("click", function() {
            menu.classList.toggle("open");
            menu.content.style.display = (menu.classList.contains("open")) ? "block" : "none";
        });
    });
});