
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { createMarckupCard } from './create_marckup_card';
import { fetchSearch } from './fetchSearch';
import { incrimentPage } from './page_management';
import { resetPage } from './page_management';

const searchFormEL = document.querySelector('#search-form');
const searchFormInputEL = document.querySelector("[name='searchQuery']");
const submitButtonEL = document.querySelector('[type="submit"]');
const loadMoreBtnEL = document.querySelector('.load-more');
const galleryDivEl = document.querySelector('.gallery');

searchFormEL.addEventListener('submit', onFormSubmit);
loadMoreBtnEL.addEventListener('click', onLoadMoreBtnClick);

let page = 1;
let searchValue;
function onFormSubmit(e) {
  e.preventDefault();
  galleryDivEl.innerHTML = '';
  resetPage(1);
  searchValue = searchFormInputEL.value.trim();

  if (searchValue === '') {
    galleryDivEl.innerHTML = '';
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.',
      { timeout: 3000 }
    );
    return;
  }
  fetchSearch(searchValue)
    .then(response => {
      // console.log(response);

      console.log(response.hits);
      response.hits.map(img => {
        const {
          previewURL,
          tags,
          likes,
          views,
          comments,
          downloads,
          largeImageURL,
        } = img;
        galleryDivEl.insertAdjacentHTML(
          'beforeend',
          createMarckupCard(
            previewURL,
            tags,
            likes,
            views,
            comments,
            downloads,
            largeImageURL
          )
        );
      });

      const initSL = new SimpleLightbox('.gallery a');

      visibilityVisibleBtnLoadMore();
      
    })
    .catch(() => {
      Notiflix.Notify.failure('server error');
    });
}


function visibilityVisibleBtnLoadMore() {
  loadMoreBtnEL.classList.remove('visualy-hiden');
}

function visibilityNotVisibleBtnLoadMore() {
  loadMoreBtnEL.classList.add('visualy-hiden');
}

function onLoadMoreBtnClick(){
  fetchSearch(searchValue)
  .then(response => {
    // console.log(response);

    console.log(response.hits);
    response.hits.map(img => {
      const {
        previewURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      } = img;
      galleryDivEl.insertAdjacentHTML(
        'beforeend',
        createMarckupCard(
          previewURL,
          tags,
          likes,
          views,
          comments,
          downloads,
          largeImageURL
        )
      );
    });

    const initSL = new SimpleLightbox('.gallery a');

    visibilityVisibleBtnLoadMore();
    if (response.hits === response.totalhits) {
      visibilityNotVisibleBtnLoadMore();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  })
  .catch(() => {
    Notiflix.Notify.failure('server error');
  });
  if (response.hits === response.totalhits) {
    visibilityNotVisibleBtnLoadMore();
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}


