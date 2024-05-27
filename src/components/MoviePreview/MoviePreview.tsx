import { POSTER_URL_PREFIX } from "../../App";
import { Movie } from "../../models";
import styles from "./MoviePreview.module.css";

const MoviePreview = ({ movie }: { movie: Movie }) => {
  const rating = Math.floor((movie.vote_average * 5) / 10);
  const goToMovieDetails = () => {
    window.location.href = `/movie/${movie.id}`;
  };

  return (
    <div className={styles.movieCard} onClick={goToMovieDetails}>
      <div
        className={styles.moviePoster}
        style={{
          backgroundImage: `url(${POSTER_URL_PREFIX + movie.poster_path})`,
        }}
      ></div>
      <div className={styles.movieInfo}>
        <div className={styles.movieTitle}>{movie.title}</div>
        <div className={styles.starRating}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`${styles.star} ${index < rating ? styles.orange : ""
                }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePreview;
