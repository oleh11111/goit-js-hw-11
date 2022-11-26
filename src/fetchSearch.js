import axios from 'axios';
const BACE_URL = 'https://pixabay.com/api/';
const API_KEY = '31206386-bdc753e0ab5077ac418097ae8';

// export function fetchSearch(searchValue) {

//     return fetch(`${BACE_URL}?${ API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`).then(Response => {
//       return Response.json();
//     });
//   }

export async function fetchSearch(searchValue) {
  const response = await axios.get(
    `${BACE_URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${+page}&per_page=40`
  );
  return response.json();
  
}