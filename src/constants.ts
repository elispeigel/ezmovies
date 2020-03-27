export const API_KEY = '***REMOVED***';

// Url
export const preQueryUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;
export const postQueryUrl = '&page=1&include_adult=false';
export const preFindUrl = 'https://api.themoviedb.org/3/movie/';
export const postFindUrl = `?api_key=${API_KEY}&language=en-US`;
export const holderUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

// Dimensions
export const WIDTH = 300;
export const HEIGHT: number = WIDTH * 1.5;
export const GAP = 20;

// Colors
export const WHITE = '#f2f2f2';
export const BLACK = '#1a1a1a';
