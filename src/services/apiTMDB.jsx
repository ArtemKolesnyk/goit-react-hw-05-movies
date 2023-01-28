import axios from 'axios';

const API_KEY = '0fc2f599494f07c2afe7c8f43e6b230d';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export async function getTrendingMovies() {
  try {
    const res = await axios(`trending/movie/day?`, {
      params: {
        api_key: API_KEY,
      },
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
}

export async function getInfoMovies(movieId) {
  try {
    const res = await axios(`movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
}

export async function getSerchMovies(searchQuery) {
  try {
    const res = await axios(`search/movie`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        query: searchQuery,
        include_adult: false,
        page: 1,
      },
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
}

export async function getCast(movieId) {
  try {
    const res = await axios(`movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });

    return res;
  } catch (error) {
    console.log('error', error);
  }
}

export async function getReviews(movieId) {
  try {
    const response = await axios(`movie/${movieId}/reviews`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
    return response;
  } catch (error) {
    console.log('error', error);
  }
}
