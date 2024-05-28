import { useQueries } from "react-query";
import { getFavorites } from "../../services/favoritesService";
import { getMovieById } from "../../services/movieService";
import MoviePreview from "../MoviePreview/MoviePreview";
import styles from "./FavoriteMovies.module.css";

export const FavoriteMovies = () => {
  const favoriteMovies = getFavorites();

  const favoriteMoviesQueries = favoriteMovies.map((movieId) => {
    return {
      queryKey: ["movie", movieId],
      queryFn: () => getMovieById(movieId.toString()),
    };
  });

  const movies = useQueries(favoriteMoviesQueries);

  return (
    <div className={styles.layout}>
      {movies.map(({ data: movie }, index) =>
        movie ? (
          <MoviePreview
            key={movie.id}
            isFavorite={favoriteMovies.includes(movie.id)}
            movie={movie}
          />
        ) : (
          <p key={index}>Loading...</p>
        )
      )}
    </div>
  );
  return <div className={styles.layout}></div>;
};
