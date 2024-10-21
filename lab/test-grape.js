// Initialisation de GrapesJS
const editor = grapesjs.init({
    container: '#editor',  // Conteneur pour l'éditeur
    height: '100%',        // L'éditeur occupe toute la hauteur
    width: 'auto',         // L'éditeur s'adapte à la largeur
    fromElement: true,     // Charge le contenu s'il existe déjà dans le conteneur
    storageManager: false, // Désactivation du gestionnaire de stockage pour l'instant
    blockManager: {
      appendTo: '#blocks', // Le panneau des blocs est intégré par GrapesJS
      blocks: [
        {
          id: 'div',
          label: '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M204-120q-34.65 0-59.32-24.68Q120-169.35 120-204v-552q0-34.65 24.68-59.33Q169.35-840 204-840h552q34.65 0 59.33 24.67Q840-790.65 840-756v552q0 34.65-24.67 59.32Q790.65-120 756-120H204Zm0-84h552v-552H204v552Zm0 0v-552 552Z"/></svg>',
          media: '',
          content: '<div style="padding: 20px; background-color: #f0f0f0;"></div>',
        },
        {
          id: 'text',
          label: '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M280-160v-520H80v-120h520v120H400v520H280Zm360 0v-320H520v-120h360v120H760v320H640Z"/></svg>',
          content: '<div style="padding: 20px;">Insère ton texte ici</div>',
        },
        {
          id: 'image',
          label: '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M216-144q-29.7 0-50.85-21.5Q144-187 144-216v-528q0-29 21.15-50.5T216-816h528q29.7 0 50.85 21.5Q816-773 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-528H216v528Zm48-72h432L552-480 444-336l-72-96-108 144Zm-48 72v-528 528Z"/></svg>',
          content: '<img src="https://via.placeholder.com/350x150" alt="Placeholder image" style="max-width:100%;">',
        },
        {
          id: 'video',
          label: '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="m216-768 72 144h96l-72-144h72l72 144h96l-72-144h72l72 144h96l-72-144h144q29.7 0 50.85 21.5Q864-725 864-696v432q0 29-21.15 50.5T792-192H168q-29 0-50.5-21.5T96-264v-432q0-29 20.5-50.5T168-768h48Zm-48 216v288h624v-288H168Zm0 0v288-288Z"/></svg>',
          content: '<video controls="" style="max-width:100%"><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"></video>',
        },
        {
          id: 'link',
          label: '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M432-288H288q-79.68 0-135.84-56.23Q96-400.45 96-480.23 96-560 152.16-616q56.16-56 135.84-56h144v72H288q-50 0-85 35t-35 85q0 50 35 85t85 35h144v72Zm-96-156v-72h288v72H336Zm192 156v-72h144q50 0 85-35t35-85q0-50-35-85t-85-35H528v-72h144q79.68 0 135.84 56.23 56.16 56.22 56.16 136Q864-400 807.84-344 751.68-288 672-288H528Z"/></svg>',
          content: '<a href="#" style="color: blue; text-decoration: underline;">Un lien vers quelque chose</a>',
        },
        {
          id: 'button',
          label: '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M168-240q-29.7 0-50.85-21.15Q96-282.3 96-312v-336q0-29.7 21.15-50.85Q138.3-720 168-720h624q29.7 0 50.85 21.15Q864-677.7 864-648v336q0 29.7-21.15 50.85Q821.7-240 792-240H168Zm0-72h624v-336H168v336Zm132-48h72v-84h84v-72h-84v-84h-72v84h-84v72h84v84Zm-132 48v-336 336Z"/></svg>',
          content: '<button style="padding: 10px 20px; background-color: #007bff; color: white;">Bouton</button>',
        },
        {
          id: 'header1',
          label: '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M192-288v-384h72v156h168v-156h72v384h-72v-156H264v156h-72Zm504 0v-312h-96v-72h168v384h-72Z"/></svg>',
          content: '<h1 style="padding: 20px;">Titre H1</h1>',
        },
        {
          id: 'header2',
          label: '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M144-288v-384h72v156h168v-156h72v384h-72v-156H216v156h-72Zm384 0v-156q0-29.7 21.15-50.85Q570.3-516 600-516h144v-84H528v-72h216.26Q774-672 795-650.85q21 21.15 21 50.85v84q0 29.7-21.15 50.85Q773.7-444 744-444H600v84h216v72H528Z"/></svg>',
          content: '<h2 style="padding: 20px;">Titre H2</h2>',
        },
        {
          id: 'header3',
          label: '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M144-288v-384h72v156h168v-156h72v384h-72v-156H216v156h-72Zm384 0v-72h216v-84H576v-72h168v-84H528v-72h216.26Q774-672 795-650.85q21 21.15 21 50.85v240q0 29.7-21.15 50.85Q773.7-288 744-288H528Z"/></svg>',
          content: '<h3 style="padding: 20px;">Titre H3</h3>',
        },
        {
          id: 'list',
          label: '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M288-600v-72h528v72H288Zm0 156v-72h528v72H288Zm0 156v-72h528v72H288ZM180-600q-14 0-25-11t-11-25.5q0-14.5 11-25t25.5-10.5q14.5 0 25 10.35T216-636q0 14-10.35 25T180-600Zm0 156q-14 0-25-11t-11-25.5q0-14.5 11-25t25.5-10.5q14.5 0 25 10.35T216-480q0 14-10.35 25T180-444Zm0 156q-14 0-25-11t-11-25.5q0-14.5 11-25t25.5-10.5q14.5 0 25 10.35T216-324q0 14-10.35 25T180-288Z"/></svg>',
          content: `
            <ul style="padding: 20px;">
              <li>Élément de liste 1</li>
              <li>Élément de liste 2</li>
              <li>Élément de liste 3</li>
            </ul>`,
        },
        {
          id: 'card',
          label: '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="m600-144-240-72-153 51q-23 8-43-6t-20-40v-498q0-16 9.5-28.5T177-755l183-61 240 72 153-51q23-10 43 5t20 41v498q0 16-9 29t-24 17l-183 61Zm-36-86v-450l-168-50v450l168 50Zm72-2 108-36v-448l-108 36v448Zm-420-12 108-36v-448l-108 36v448Zm420-436v448-448Zm-312-48v448-448Z"/></svg>',
          content: `
            <div style="border: 1px solid #ddd; padding: 20px; background-color: white;">
              <h2>Titre de la carte</h2>
              <p>Contenu de la carte</p>
              <button style="padding: 10px 20px; background-color: #007bff; color: white;">En savoir plus</button>
            </div>`,
        },
        {
          id: 'form',
          label: '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M192-396v-72h288v72H192Zm0-150v-72h432v72H192Zm0-150v-72h432v72H192Zm336 504v-113l210-209q7.26-7.41 16.13-10.71Q763-528 771.76-528q9.55 0 18.31 3.5Q798.83-521 806-514l44 45q6.59 7.26 10.29 16.13Q864-444 864-435.24t-3.29 17.92q-3.3 9.15-10.71 16.32L641-192H528Zm288-243-45-45 45 45ZM576-240h45l115-115-22-23-22-22-116 115v45Zm138-138-22-22 44 45-22-23Z"/></svg>',
          content: `
            <form style="padding: 20px;">
              <label for="name">Nom :</label>
              <input type="text" id="name" name="name" placeholder="Entrez votre nom" style="width: 100%; padding: 10px; margin-bottom: 10px;">
              
              <label for="email">Email :</label>
              <input type="email" id="email" name="email" placeholder="Entrez votre email" style="width: 100%; padding: 10px; margin-bottom: 10px;">
              
              <input type="submit" value="Envoyer" style="padding: 10px 20px; background-color: #007bff; color: white;">
            </form>`,
        }
      ]
    },
});