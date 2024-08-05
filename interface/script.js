// 
const page = document.querySelector('#page');
const list = document.querySelector('#list');
const add = document.querySelector('#add');
const workspace = document.querySelector('#workspace');
const preview = document.querySelector('#preview');
const options = document.querySelector('#options');

// preview responsive buttons
const laptop = document.querySelector('#laptop');
const tablet = document.querySelector('#tablet');
const phone = document.querySelector('#phone');
const input = document.querySelector('#preview-width');
input.value = ''

// preview code review
const popup = document.querySelector('#popup');
const closePopup = document.querySelector('#closePopup');
const htmlCode = document.querySelector('#hPreview');
const cssCode = document.querySelector('#cPreview');
const jsCode = document.querySelector('#jPreview');
const codePreview = document.querySelector('#codePreview');

// const panel = document.querySelector('#panel');
// const pagePanel = document.querySelector('#pagePanel');
// const listPanel = document.querySelector('#listPanel');

let widthSection = localStorage.getItem('widthSection') ? localStorage.getItem('widthSection') : 1024

function newSection () {
    preview.style.width = `${widthSection}px`;
    const createdSection = document.createElement('section');
    // const createdSection = document.querySelector('section');
    preview.appendChild(createdSection);
    createdSection.setAttribute("class", "sectionTest");
    // if (widthSection > 1023){
    //     createdSection.removeAttribute;
    // createdSection.setAttribute("class", "sectionTest");
    // } else if (widthSection > 768){
    //     createdSection.removeAttribute;
    // createdSection.setAttribute("class", "sectionTest2");
    // } else if(widthSection < 768){
    //     createdSection.removeAttribute;
    // createdSection.setAttribute("class", "sectionTest3");
    // }
    // console.log(preview.style.width)
};

add.addEventListener('click', () => {
    newSection();
    input.value = '1024'
});
// const picture = document.querySelector('#picture');

// function newPicture() {
//     const img = document.createElement('img');
//     preview.append(img);
//     img.style.width = '200px';
//     img.style.height = '200px';
//     img.style.margin = 'auto';
//     img.style.background = 'pink';
//     img.style.border = '1px solid #000';
// }
// picture.addEventListener('click', () => {
//     newPicture();
// })

// img.addEventListener('click', () => {
//     img.src = '';
// })

const updateWidth = (newWidth) => {
    const createdSection = document.querySelector('section');
    let widthSection = localStorage.getItem('widthSection')
if (createdSection) {
    if (widthSection > 1023){
            createdSection.removeAttribute;
        createdSection.setAttribute("class", "sectionTest");
        } else if (widthSection > 767){
            createdSection.removeAttribute;
        createdSection.setAttribute("class", "sectionTest2");
        } else if(widthSection < 481){
            createdSection.removeAttribute;
        createdSection.setAttribute("class", "sectionTest3");
        }
}
    preview.style.width = `${widthSection}px`;
    console.log(preview.style.width)
    input.value = widthSection;
}

// preview responsive buttons actions
laptop.addEventListener('click', () => {
    localStorage.setItem('widthSection', 1024)
    updateWidth(1024);
});

tablet.addEventListener('click', () => {
    localStorage.setItem('widthSection', 768)
    updateWidth(768);
});

phone.addEventListener('click', () => {
    localStorage.setItem('widthSection', 480)
    updateWidth(480);
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        localStorage.setItem('widthSection', input.value * 1)
        updateWidth(input.value * 1);
        console.log(input.value)
    }});





options.addEventListener('click', () => {
        codePreview.value = ' // PREVIEW DU CODE // ';
        popup.style.display = 'flex';
    });

const stylePreview = (newStylePreview) => {
    if(htmlCode) {
        htmlCode.style.color = '#eeeef0';
        htmlCode.style.borderBottom = '2px solid #3F5CB0';
    }if(cssCode) {
        cssCode.style.color = '#eeeef0';
        cssCode.style.borderBottom = '2px solid #3F5CB0';
    }if(jsCode) {
        jsCode.style.color = '#eeeef0';
        jsCode.style.borderBottom = '2px solid #3F5CB0';
    }
};

htmlCode.addEventListener('click', () => {
    stylePreview();
    codePreview.value = '<!-- aperçu de la structure html de la page -->\n\n' + preview.innerHTML;
    cssCode.style = '';
    jsCode.style = '';
});

cssCode.addEventListener('click', () => {
    stylePreview();
    codePreview.value = `/* aperçu du style de la page */\n\n`;
    cssCode.value = preview.innerHTML.style;
    htmlCode.style = '';
    jsCode.style = '';
});

jsCode.addEventListener('click', () => {
    stylePreview();
    codePreview.value = `// aperçu du script de la page\n\n`;
    htmlCode.style = '';
    cssCode.style = '';
});

options.addEventListener('click', () => {
    popup.style.display = "flex";
});

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});