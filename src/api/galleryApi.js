import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30112757-abf194c84cfc9ccef9cde8e0f';

export const fetchGallery = (query, page) => {
  return axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}