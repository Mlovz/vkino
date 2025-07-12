import { useFavoritesMovie } from '@/features/add-to-favorites/model';
import { observer } from 'mobx-react-lite';

const FavoritesPage = observer(() => {
  const favoriteMovies = useFavoritesMovie();

  console.log(favoriteMovies);

  return <h1>FavoritesPage</h1>;
});

export default FavoritesPage;
