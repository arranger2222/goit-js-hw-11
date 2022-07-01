// import './css/styles.css'
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const form = document.querySelector('#search-form');
const galleryWrap = document.querySelector('.gallery')


const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = 'key=28348540-5acc26c4c4c16999acfb2f011';
const per_page = 'per_page=40';


const createdGallery = new SimpleLightbox('.gallery a');
let page = 1;
let query = '';


form.addEventListener('submit', onSearch);   



function onSearch(e){
    e.preventDefault();
    galleryWrap.innerHTML ='';
    query = e.currentTarget.searchQuery.value.trim();
    page = 1;
    
    if(query === ''){Notify.failure('The search string cannot be empty. Please specify your search query.')
    return};
    
    fetchImg(query, page);
    observer.observe(document.querySelector('.scroll-guard'));
}

function fetchImg (query, page) {
  axios.get(`${BASE_URL}${API_KEY}&q=${query}&image_type=photo&$orientation=horizontal&safesearch-true&page=${page}&${per_page}`)
    .then(res => {          
    createCardMarkup(res.data.hits);
    });
}


function createCardMarkup(arr){
    const cardMarkup = arr.map(item=>  
      
            `<a class='gallery__item' href='${item.largeImageURL}'>
            <div class="photo-card">
            <img class="gallery__image" src="${item.previewURL}" alt="" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes: ${item.likes}</b>
              </p>
              <p class="info-item">
                <b>Views: ${item.views}</b>
              </p>
              <p class="info-item">
                <b>Comments: ${item.comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads: ${item.downloads}</b>
              </p>
            </div>
          </div>
          </a>`        
      ).join('');
    
  galleryWrap.insertAdjacentHTML('beforeend', cardMarkup);
}

const options = {
  rootMargin: '200px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('entry');
      page += 1;
      fetchImg (query, page);
    }
  });
}, options);




// Notify.failure("Oops, there is no country with that name");