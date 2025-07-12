import { observer } from 'mobx-react-lite';
import { useFavoritesMovie } from '../model/hooks/useFavoritesMovie';

const FavoritesPage = observer(() => {
  const favoriteMovies = useFavoritesMovie();

  console.log(favoriteMovies);

  return <h1>FavoritesPage</h1>;
});

export default FavoritesPage;
