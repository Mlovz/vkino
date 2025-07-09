import { MovieList } from '@/entities/movie/ui';
import { RenderMovieSearchAndFilters } from './reder-movie-search-and-filters';

const HomePage = () => {
  return (
    <>
      <RenderMovieSearchAndFilters />
      <MovieList />
    </>
  );
};
export default HomePage;
