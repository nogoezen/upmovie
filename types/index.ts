export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  tagline?: string;
  homepage?: string;
  imdb_id?: string;
  credits?: {
    cast: CastMember[];
  };
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

export interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Category {
  label: string;
  value: string;
  icon: JSX.Element;
}

export interface Genre {
  id: number;
  name: string;
}

export * from './movie';
export * from './api';
export * from './ui'; 