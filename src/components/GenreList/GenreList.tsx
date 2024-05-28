import { useQuery } from "react-query";
import styles from "./GenreList.module.css";
import { getGenres } from "../../services/movieService";
import { useMovieContext } from "../../context/MovieContext";

const GenreList = () => {
  const { data } = useQuery("getGenres", getGenres);
  const { selectedGenres, setSelectedGenres } = useMovieContext();

  const genres = data || [];

  const handleGenreClick = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  return (
    <div className={styles.genreContainer}>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`${styles.genre} ${selectedGenres.includes(genre.id) ? styles.selected : ""
            }`}
          onClick={() => handleGenreClick(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreList;
