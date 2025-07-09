export type Movie = {
  id: number;
  name: string | null;
  alternativeName: string | null;
  type:
    | 'movie'
    | 'tv-series'
    | 'cartoon'
    | 'anime'
    | 'animated-series'
    | 'tv-show'
    | string;
  year: number;
  description: string | null;
  shortDescription: string | null;
  status: 'completed' | 'ongoing' | 'announced' | string;
  rating: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  poster: {
    url: string;
    previewUrl: string;
  };
  genres: {
    name: string;
  }[];
  countries: {
    name: string;
  }[];
  releaseYears: {
    start: number;
    end: number;
  }[];
};

export type Movies = {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};
