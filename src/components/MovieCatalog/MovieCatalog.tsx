import styles from "./MovieCatalog.module.css";

import GenreList from "../GenreList/GenreList";
import MoviePreview from "../MoviePreview/MoviePreview";

import { useInfiniteQuery } from "react-query";
import { getMovies } from "../../services/movieService";

export const MovieCatalog = () => {
  const { data, isLoading } = useInfiniteQuery({
    queryKey: ["getPopularMovies"],
    queryFn: ({ pageParam = 1 }) => getMovies(pageParam),
  });

  const movies = data?.pages.flat() || [];

  return (
    <>
      <GenreList />
      <div className={styles.layout}>
        {!isLoading &&
          movies.map((movie) => <MoviePreview key={movie.id} movie={movie} />)}

        {isLoading && <div>Chargement...</div>}
      </div>
    </>
  );
};