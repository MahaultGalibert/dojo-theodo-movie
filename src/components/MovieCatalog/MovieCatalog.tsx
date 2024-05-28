import styles from "./MovieCatalog.module.css";

import GenreList from "../GenreList/GenreList";
import MoviePreview from "../MoviePreview/MoviePreview";

import { useInfiniteQuery } from "react-query";
import { getMovies } from "../../services/movieService";
import { useEffect } from "react";
import { useMovieContext } from "../../context/MovieContext";

export const MovieCatalog = () => {
  const { selectedGenres } = useMovieContext();
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["getPopularMovies", selectedGenres],
    queryFn: ({ pageParam = 1 }) => getMovies(pageParam, selectedGenres),
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length + 1;
    }
  });

  const movies = data?.pages.flat() || [];

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [movies]);

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