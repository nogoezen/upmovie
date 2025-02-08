import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');
    return data.request_token;
  } catch (error) {
    console.log('Sorry, your token could not be created.');
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');
  if (token) {
    try {
      const { data: { session_id } } = await moviesApi.post('authentication/session/new', {
        request_token: token,
      });
      localStorage.setItem('session_id', session_id);
      return session_id;
    } catch (error) {
      console.log('Sorry, your session could not be created.');
    }
  }
};

// Get Movies by [Type]
export const getMovies = async (page, searchQuery = '', category = 'popular') => {
  try {
    const searchEndpoint = `/search/movie?query=${searchQuery}&page=${page}`;
    const moviesEndpoint = `/movie/${category}?page=${page}`;
    
    const { data } = await moviesApi.get(searchQuery ? searchEndpoint : moviesEndpoint);
    return data;
  } catch (error) {
    console.log('Error fetching movies:', error);
    return [];
  }
};

// Get Movie Details
export const getMovie = async (id) => {
  try {
    const { data } = await moviesApi.get(`/movie/${id}?append_to_response=videos,credits`);
    return data;
  } catch (error) {
    console.log('Error fetching movie details:', error);
  }
};

// Get User Specific Lists
export const getList = async (accountId, sessionId, page = 1, listName) => {
  try {
    const { data } = await moviesApi.get(`/account/${accountId}/${listName}?session_id=${sessionId}&page=${page}`);
    return data;
  } catch (error) {
    console.log('Error fetching list:', error);
  }
};

// Get Actor Details
export const getActor = async (id) => {
  try {
    const { data } = await moviesApi.get(`/person/${id}`);
    return data;
  } catch (error) {
    console.log('Error fetching actor details:', error);
  }
};

// Get Actor's Movies
export const getMoviesByActorId = async (id) => {
  try {
    const { data } = await moviesApi.get(`/discover/movie?with_cast=${id}`);
    return data;
  } catch (error) {
    console.log('Error fetching actor movies:', error);
  }
};

// Get Recommendations
export const getRecommendations = async (movie_id) => {
  try {
    const { data } = await moviesApi.get(`/movie/${movie_id}/recommendations`);
    return data;
  } catch (error) {
    console.log('Error fetching recommendations:', error);
  }
}; 