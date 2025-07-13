import { makeAutoObservable, runInAction } from 'mobx';
import { fetchMovieById } from '@/entities/movie/api';
import { Movie } from '@/entities/movie/types';

interface MovieDetailEntry {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

class MovieDetailStore {
  private cache = new Map<number, MovieDetailEntry>();

  constructor() {
    makeAutoObservable(this);
  }

  private getOrCreateEntry(id: number): MovieDetailEntry {
    if (!this.cache.has(id)) {
      this.cache.set(id, {
        movie: null,
        loading: false,
        error: null,
      });
    }
    return this.cache.get(id)!;
  }

  getMovieData(id: number) {
    const entry = this.getOrCreateEntry(id);
    return {
      movie: entry.movie,
      loading: entry.loading,
      error: entry.error,
    };
  }

  async loadMovie(id: number) {
    const entry = this.getOrCreateEntry(id);

    if (entry.movie || entry.loading) {
      return;
    }

    try {
      runInAction(() => {
        entry.loading = true;
        entry.error = null;
      });

      const movie = await fetchMovieById(id);

      runInAction(() => {
        entry.movie = movie;
      });
    } catch {
      runInAction(() => {
        entry.error = 'Ошибка загрузки фильма';
      });
    } finally {
      runInAction(() => {
        entry.loading = false;
      });
    }
  }

  clearCache() {
    this.cache.clear();
  }

  removeFromCache(id: number) {
    this.cache.delete(id);
  }
}

export const movieDetailStore = new MovieDetailStore();
