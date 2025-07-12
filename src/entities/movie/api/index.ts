import { $api } from '@/shared/api/api';
import { Movie } from '../types';

export interface MovieFilters {
  page?: number;
  limit?: number;
  selectFields?: string[];
  'genres.name'?: string[];
  'rating.kp'?: string;
  'releaseYears.start'?: number;
  'releaseYears.end'?: number;
}

interface FetchMoviesResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

const buildParams = (filters: MovieFilters): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters['rating.kp']) params.set('rating.kp', filters['rating.kp']);
  if (filters['releaseYears.start']) {
    params.set('releaseYears.start', String(filters['releaseYears.start']));
  }
  if (filters['releaseYears.end']) {
    params.set('releaseYears.end', String(filters['releaseYears.end']));
  }

  filters.selectFields?.forEach(field => params.append('selectFields', field));
  filters['genres.name']?.forEach(genre => params.append('genres.name', genre));

  return params;
};

export const fetchMovies = async (
  filters: MovieFilters
): Promise<FetchMoviesResponse> => {
  const params = buildParams(filters);
  const response = await $api.get(`/movie?${params.toString()}`);
  return response.data;
};

export const fetchMovieById = async (id: number): Promise<Movie> => {
  const response = await $api.get(`/movie/${id}`);
  return response.data;
};
