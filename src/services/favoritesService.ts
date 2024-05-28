const FAVORITES_KEY = "favorites";

export const getFavorites = (): number[] => {
  const favoritesString = localStorage.getItem(FAVORITES_KEY);
  const favorites = favoritesString ? JSON.parse(favoritesString) : [];
  return favorites;
  return [];
};

export const addFavorite = (movieId: number) => {
  const favorites = getFavorites();
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (movieId: number) => {
  const favorites = getFavorites();
  const newFavorites = favorites.filter((id: number) => id !== movieId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
};

export const isMovieFavorite = (movieId: number) => {
  const favorites = getFavorites();
  return favorites.includes(movieId);
};
