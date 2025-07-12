// @/features/movie-filters/model/types.ts
export type Filters = {
  genres: string[];
  ratingMin?: number;
  ratingMax?: number;
  yearMin?: number;
  yearMax?: number;
};
