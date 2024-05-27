import { useQuery } from "react-query";
import styles from "./MovieDetails.module.css";
import { getMovieById } from "../../services/movieService";
import { useParams } from "react-router-dom";
import { Movie } from "../../models";

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

  console.log(movie);

  return <div className={styles.moviePage}></div>;
};

export default MovieDetails;