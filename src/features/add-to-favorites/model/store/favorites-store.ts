import { makeAutoObservable } from 'mobx';

class FavoritesStore {
  favorites: number[] = [];

  constructor() {
    makeAutoObservable(this);
    const saved = localStorage.getItem('favorites');
    if (saved) this.favorites = JSON.parse(saved);
  }

  addFavorite(id: number) {
    if (!this.favorites.includes(id)) {
      this.favorites.push(id);
      this.save();
    }
  }

  removeFavorite(id: number) {
    this.favorites = this.favorites.filter(movieId => movieId !== id);
    this.save();
  }

  isFavorite(id: number) {
    return this.favorites.includes(id);
  }

  save() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}

export default new FavoritesStore();
