import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Movie, MovieApiResponse, Genre } from '@/types';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;

// Define valid movie categories and their endpoints
const MOVIE_ENDPOINTS = {
  popular: 'movie/popular',
  top_rated: 'movie/top_rated',
  upcoming: 'movie/upcoming',
  now_playing: 'movie/now_playing'
} as const;

type MovieQueryParams = {
  category: keyof typeof MOVIE_ENDPOINTS;
  page?: number;
  searchQuery?: string;
  genreId?: number;
};

// Helper function to format date as YYYY-MM-DD
const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Get date range for upcoming movies (next 3 months)
const getUpcomingDateRange = () => {
  const today = new Date();
  const threemonthsFromNow = new Date();
  threemonthsFromNow.setMonth(today.getMonth() + 3);
  
  return {
    gte: formatDate(today),
    lte: formatDate(threemonthsFromNow),
  };
};

// Create the TMDB API instance
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Movies', 'Genres'],
  endpoints: (builder) => ({
    getGenres: builder.query<{ genres: Genre[] }, void>({
      query: () => ({
        url: 'genre/movie/list',
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
        },
      }),
      providesTags: ['Genres'],
    }),

    getMovies: builder.query<MovieApiResponse, MovieQueryParams>({
      query: ({ category, page = 1, searchQuery, genreId }) => {
        // If search query is provided, use the search endpoint
        if (searchQuery && searchQuery.trim()) {
          return {
            url: 'search/movie',
            params: {
              api_key: TMDB_API_KEY,
              query: searchQuery.trim(),
              page,
              language: 'en-US',
              include_adult: false,
              with_genres: genreId,
            },
          };
        }

        // For upcoming movies, add release date range
        if (category === 'upcoming') {
          const { gte, lte } = getUpcomingDateRange();
          return {
            url: 'discover/movie',
            params: {
              api_key: TMDB_API_KEY,
              page,
              language: 'en-US',
              region: 'US',
              sort_by: 'release_date.asc',
              'release_date.gte': gte,
              'release_date.lte': lte,
              with_release_type: '2|3',
              with_genres: genreId,
            },
          };
        }

        // If genre is selected, use discover endpoint
        if (genreId) {
          return {
            url: 'discover/movie',
            params: {
              api_key: TMDB_API_KEY,
              page,
              language: 'en-US',
              region: 'US',
              sort_by: category === 'top_rated' ? 'vote_average.desc' : 'popularity.desc',
              with_genres: genreId,
              'vote_count.gte': category === 'top_rated' ? 200 : 0, // Ensure enough votes for rating to be meaningful
            },
          };
        }

        // Otherwise, use the appropriate movie list endpoint
        return {
          url: MOVIE_ENDPOINTS[category],
          params: {
            api_key: TMDB_API_KEY,
            page,
            language: 'en-US',
            region: 'US',
          },
        };
      },
      transformResponse: (response: MovieApiResponse, meta, arg) => {
        // Sort upcoming movies by release date
        if (arg.category === 'upcoming') {
          return {
            ...response,
            results: response.results.sort((a, b) => 
              new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
            ),
          };
        }
        return response;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Movies' as const, id })),
              { type: 'Movies', id: 'LIST' },
            ]
          : [{ type: 'Movies', id: 'LIST' }],
    }),

    getMovie: builder.query<Movie, string>({
      query: (id) => ({
        url: `movie/${id}`,
        params: {
          api_key: TMDB_API_KEY,
          append_to_response: 'videos,credits',
          language: 'en-US',
        },
      }),
      providesTags: (result, error, id) => [{ type: 'Movies', id }],
    }),

    getRecommendations: builder.query<MovieApiResponse, string>({
      query: (movieId) => ({
        url: `movie/${movieId}/recommendations`,
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
          page: 1,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Movies' as const, id })),
              { type: 'Movies', id: 'RECOMMENDATIONS' },
            ]
          : [{ type: 'Movies', id: 'RECOMMENDATIONS' }],
    }),

    getActor: builder.query<any, string>({
      query: (id) => ({
        url: `person/${id}`,
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
        },
      }),
    }),

    getMoviesByActorId: builder.query<MovieApiResponse, string>({
      query: (id) => ({
        url: 'discover/movie',
        params: {
          api_key: TMDB_API_KEY,
          with_cast: id,
          language: 'en-US',
          sort_by: 'popularity.desc',
          page: 1,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Movies' as const, id })),
              { type: 'Movies', id: 'ACTOR_MOVIES' },
            ]
          : [{ type: 'Movies', id: 'ACTOR_MOVIES' }],
    }),
  }),
});

// Export the hooks
export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
  useGetGenresQuery,
} = tmdbApi; 