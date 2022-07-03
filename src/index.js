import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImg } from './js/fetchImages';
import { createCardMarkup } from './js/createCardMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import { resetForm } from './js/resetForm';
import { onScroll, onToTopBtn } from './js/onTopButton';


const galleryWrap = document.querySelector('.gallery')
const form = document.querySelector('#search-form');
const per_page = 40;

const galleryOptions = {
  close: true,
  closeText: 'X',
  overlayOpacity: 0.9,
  captionDelay: 250,
  showCounter: true
}

const gallery = new SimpleLightbox('.gallery a', galleryOptions);

let page = 1;
let query = '';


onScroll();
onToTopBtn();


form.addEventListener('submit', onSearch);


function onSearch(e){
    e.preventDefault();
    galleryWrap.innerHTML ='';
    gallery.refresh()
    query = e.currentTarget.searchQuery.value.trim();
    
    if(query === ''){
      emptyStringMessage();
      galleryWrap.innerHTML ='';
      page = 1;
      query = '';
      // resetForm();
    return};


    fetchImg (query, page, per_page)
    .then(response => {
      if(response.data.hits.length === 0){
            notFoundMessage();
            resetForm();
          return
         };
         
          galleryWrap.insertAdjacentHTML('beforeend', createCardMarkup(response.data.hits));
          successMessage(response.data.totalHits);
          gallery.refresh();
        })
      .catch(error => console.log(error));    
     
    observer.observe(document.querySelector('.scroll-guard'));
};



const options = {
  rootMargin: '200px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('entry');
      
      page += 1;
      // gallery.destroy();
      
      fetchImg(query, page, per_page)
      .then(response => {
          const totalPages = Math.ceil(response.data.totalHits / per_page)
          if(page > totalPages){
            endScrollMessage();
            }
          galleryWrap.insertAdjacentHTML('beforeend', createCardMarkup(response.data.hits));        
          gallery.refresh();
          })
      .catch(error => console.log(error));
     }
  });
}, options);


function notFoundMessage(){
  Notify.failure("We're sorry, but you've reached the end of search results.")
  return
};

function successMessage(value){
  Notify.success(`Hooray! We found ${value} images.`)
  return
};

function emptyStringMessage(){
  Notify.failure('The search string cannot be empty. Please specify your search query.')
  return
};

function endScrollMessage(){
  Notify.failure("We're sorry, but you've reached the end of search results.")
  return
};