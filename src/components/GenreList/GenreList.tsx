import { useQuery } from "react-query";
import styles from "./GenreList.module.css";
import { getGenres } from "../../services/movieService";

const GenreList = () => {
  const { data } = useQuery("getGenres", getGenres);

  const genres = data || [];

  console.log(genres);
  
  return <div className={styles.genreContainer}></div>;
};

export default GenreList;
