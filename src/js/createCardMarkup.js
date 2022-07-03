export { createCardMarkup };

function createCardMarkup(arr){    
   return arr.map(item=>  
      
            `<a class='gallery__item gallery__link' href='${item.largeImageURL}'>
            <div class="photo-card">
            <img class="gallery__image" src="${item.previewURL}" alt="${item.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes:</b>
                <b>${item.likes}</b>
              </p>
              <p class="info-item">
                <b>Views:</b>
                <b>${item.views}</b>
              </p>
              <p class="info-item">
                <b>Comments:</b>
                <b>${item.comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads:</b>
                <b>${item.downloads}</b>
              </p>
            </div>
          </div>
          </a>`        
      ).join('');  
};