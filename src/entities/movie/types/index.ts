type Rating = {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
};

type Poster = {
  url: string;
  previewUrl: string;
};

type ReleaseYear = {
  start: number;
  end: number;
};

export type Movie = {
  id: number;
  name: string;
  alternativeName: string;
  year: number;
  description: string | null;
  shortDescription: string | null;
  rating: Rating;
  poster: Poster;
  releaseYears: ReleaseYear[];
  genres: {
    name: string;
  }[];
};
export type Movies = {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};

export const mockMovies: Movie[] = [];
