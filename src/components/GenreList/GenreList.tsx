import { useQuery } from "react-query";
import styles from "./GenreList.module.css";
import { getGenres } from "../../services/movieService";

const GenreList = () => {
  const { data } = useQuery("getGenres", getGenres);

  const genres = data || [];

  console.log(genres);

  return (
    <div className={styles.genreContainer}>
      {genres.map((genre) => (
        <button key={genre.id} className={`${styles.genre}`}>
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreList;
