import { makeAutoObservable, runInAction } from 'mobx';
import { fetchMovies } from '@/entities/movie/api';
import { Movie } from '@/entities/movie/types';
import { Filters } from '@/entities/movie/hooks/useUrlFilters';

const SELECTED_FIELDS = [
  'id',
  'name',
  'alternativeName',
  'year',
  'rating',
  'poster',
  'genres',
];

interface CacheEntry {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
}

class MoviesStore {
  private cache = new Map<string, CacheEntry>();
  private debounceTimeout: NodeJS.Timeout | null = null;
  private lastLoadedKey: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private createCacheKey(filters: Filters): string {
    return JSON.stringify({
      genres: filters.genres.sort(),
      ratingMin: filters.ratingMin,
      ratingMax: filters.ratingMax,
      yearMin: filters.yearMin,
      yearMax: filters.yearMax,
    });
  }

  private getOrCreateCacheEntry(key: string): CacheEntry {
    if (!this.cache.has(key)) {
      this.cache.set(key, {
        movies: [],
        currentPage: 0,
        totalPages: 1,
        loading: false,
        loadingMore: false,
        error: null,
        hasMore: true,
      });
    }
    return this.cache.get(key)!;
  }

  getMoviesData(filters: Filters) {
    const key = this.createCacheKey(filters);
    const entry = this.getOrCreateCacheEntry(key);

    return {
      movies: entry.movies,
      loading: entry.loading,
      loadingMore: entry.loadingMore,
      error: entry.error,
      hasMore: entry.hasMore,
      loadMore: () => this.loadMore(filters),
    };
  }

  async loadMovies(filters: Filters, isLoadMore = false) {
    const key = this.createCacheKey(filters);
    const entry = this.getOrCreateCacheEntry(key);

    if (!isLoadMore && entry.movies.length > 0) {
      return;
    }

    const nextPage = isLoadMore ? entry.currentPage + 1 : 1;

    try {
      runInAction(() => {
        if (isLoadMore) {
          entry.loadingMore = true;
        } else {
          entry.loading = true;
        }
        entry.error = null;
      });

      const apiFilters = {
        selectFields: SELECTED_FIELDS,
        'genres.name': filters.genres.length > 0 ? filters.genres : undefined,
        'rating.kp':
          filters.ratingMin !== undefined && filters.ratingMax !== undefined
            ? `${filters.ratingMin}-${filters.ratingMax}`
            : undefined,
        yearMin: filters.yearMin,
        yearMax: filters.yearMax,
        page: nextPage,
        limit: 50,
      };

      const data = await fetchMovies(apiFilters);

      runInAction(() => {
        if (isLoadMore) {
          entry.movies.push(...data.docs);
        } else {
          entry.movies = data.docs;
        }

        entry.currentPage = nextPage;
        entry.totalPages = data.pages;
        entry.hasMore = nextPage < data.pages;
      });

      this.lastLoadedKey = key;
    } catch {
      runInAction(() => {
        entry.error = 'Ошибка загрузки фильмов';
      });
    } finally {
      runInAction(() => {
        entry.loading = false;
        entry.loadingMore = false;
      });
    }
  }

  loadMoviesWithDebounce(filters: Filters, forceReload = false) {
    const key = this.createCacheKey(filters);
    const entry = this.getOrCreateCacheEntry(key);

    if (!forceReload && this.lastLoadedKey === key && entry.movies.length > 0) {
      return;
    }

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    runInAction(() => {
      // entry.loading = true;
    });

    this.debounceTimeout = setTimeout(() => {
      if (forceReload || this.lastLoadedKey !== key) {
        if (this.lastLoadedKey !== key) {
          entry.movies = [];
          entry.currentPage = 0;
          entry.hasMore = true;
        }
      }

      console.log('load');

      this.loadMovies(filters, false);
      this.debounceTimeout = null;
    }, 700);
  }

  loadMoviesInitial(filters: Filters) {
    const key = this.createCacheKey(filters);
    const entry = this.getOrCreateCacheEntry(key);

    if (entry.movies.length > 0) {
      return;
    }

    this.loadMovies(filters, false);
  }

  private async loadMore(filters: Filters) {
    const key = this.createCacheKey(filters);
    const entry = this.getOrCreateCacheEntry(key);

    if (!entry.loadingMore && entry.hasMore) {
      await this.loadMovies(filters, true);
    }
  }

  clearCache() {
    this.cache.clear();
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
    this.lastLoadedKey = null;
  }
}

export const moviesStore = new MoviesStore();
