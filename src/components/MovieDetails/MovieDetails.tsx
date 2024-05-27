import { useQuery } from "react-query";
import styles from "./MovieDetails.module.css";
import { getMovieById } from "../../services/movieService";
import { useParams } from "react-router-dom";
import { Movie } from "../../models";
import { POSTER_URL_PREFIX } from "../../App";
import { ArrowBigLeft } from "lucide-react";

const MovieDetails = () => {
  let { id: movieId } = useParams();

  if (!movieId) {
    return <div>Aucun identifiant donné</div>;
  }

  const { data, isLoading, error } = useQuery("getMovieById", () =>
    getMovieById(movieId)
  );

  if (isLoading) {
    return <p>Chargement ...</p>;
  }

  if (error) {
    return <p>Une erreur est survenue</p>;
  }

  const movie = data as Movie;

  return (
    <div className={styles.moviePage}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => (location.href = "/")}
        >
          <ArrowBigLeft />
          Retourner à la liste des films
        </button>
      </div>

      <h1>{movie.title}</h1>
      <img
        src={`${POSTER_URL_PREFIX}/${movie.poster_path}`}
        width={200}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}</p>
      <p>Release date: {movie.release_date}</p>
    </div>
  );
};

export default MovieDetails;