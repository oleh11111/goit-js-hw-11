export function createMarckupCard(
  imgURL,
  tags,
  likes,
  views,
  comments,
  downloads,
  largeImageURL
) {
  return `  <div class="photo-card">
  <a href="${largeImageURL}"><img class="img" src="${imgURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes:<br>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:<br>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:<br>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:<br>${downloads}</b>
    </p>
  </div>
</div>`;
}
