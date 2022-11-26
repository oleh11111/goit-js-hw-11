function search(){
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
  
}