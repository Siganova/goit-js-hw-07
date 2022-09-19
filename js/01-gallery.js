import { galleryItems } from './gallery-items.js';
// Change code below this line

let instance;
const galleryEl = document.querySelector('.gallery');
galleryEl.insertAdjacentHTML('beforeend', transformGalleryToString(galleryItems));
galleryEl.addEventListener('click', showModal);
   
function transformGalleryToString(arrayOfObjects) {
    return arrayOfObjects.map(({ preview, original, description }) => `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>
        `
    ).join('');  
}

function detectEscape(e){
            e.preventDefault();
            if(e.code === "Escape" && instance){
                instance.close();
            }
};
        
function showModal(e) {
    e.preventDefault();
    if (!e.target.dataset.source) {
        return;
    }
     
    instance = basicLightbox.create(`
        <div class="modal">
            <img
            src="${e.target.dataset.source}"
            alt="${e.target.getAttribute("alt")}" />
        </div>
    `, {
        onShow: () => {
            document.addEventListener("keydown", detectEscape);
        },
        onClose: () => {
            document.removeEventListener("keydown", detectEscape);
        }
    })

    instance.show();
}


