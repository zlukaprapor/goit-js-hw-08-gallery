 import gallery from './gallery-items.js'

 const refs = {
    galleryList: document.querySelector('.gallery'),
    lightboxEl: document.querySelector('.lightbox'),
    closeEl: document.querySelector('.lightbox__button'),
    lightboxImg: document.querySelector('.lightbox__image'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    
     }

     
 

 
 
  
   function createListImage(items) {
    return items.map((item, index) => `
    <li class="gallery__item" > 
    <a class="gallery__link"
      href= ${item.original}
    >
      <img
        class="gallery__image"
        data-index=${index}
        src= ${item.preview}
        data-source=${item.original}
        alt= ${item.description}        
      />
    </a>
  </li>`).join('');  
   };
  
    const listItemsMarkup = createListImage(gallery);
    refs.galleryList.innerHTML = listItemsMarkup;
    refs.galleryList.addEventListener('click', onClick);
    refs.closeEl.addEventListener('click', onClose);
    refs.lightboxOverlay.addEventListener('click', onClose);
    
     
    let index;    

    function onClick(event){
        event.preventDefault();
        const onClickImage = event.target.classList.contains('gallery__image');
        if (!onClickImage) {
            return;
        }
        document.addEventListener('keydown', onPressKey);
        // removeActiveClass();
        
        refs.lightboxEl.classList.add('is-open');
        refs.lightboxImg.src = event.target.dataset.source; 
        index = event.target.dataset.index;  
    }
    
    function removeActiveClass() {
        refs.lightboxEl.classList.remove('is-open');
    }
    function onClose(){
        removeActiveClass();
        document.removeEventListener('keydown', onPressKey);
        removeImgSrc();
    }
    function removeImgSrc(){
        refs.lightboxImg.src = '';
    }
    function onPressKey (event){
       
        if (event.key === 'Escape'){
            onClose();   
        }
        
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown' ) {
          event.preventDefault();
          if (index === gallery.length - 1){
            index -= gallery.length;
          }
           index += 1;
          refs.lightboxImg.src = gallery[index].original;             
        }

        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          event.preventDefault();
          if (index === 0){
            index += gallery.length;
          }
           index -= 1;
          refs.lightboxImg.src = gallery[index].original;    
        }              
    }
   