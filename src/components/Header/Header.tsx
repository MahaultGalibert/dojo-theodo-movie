import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { Clapperboard, Search } from "lucide-react";
import { useMovieContext } from "../../context/MovieContext";
import { useRef } from "react";

export const Header = () => {
  const { setSearch, setSelectedGenres } = useMovieContext();

  const timeoutRef = useRef<number | null>(null);

  const handleSearchWithDelay = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    clearTimeout(timeoutRef.current as number);
    timeoutRef.current = window.setTimeout(() => {
      if (event.target.value !== "") setSelectedGenres([]);
      setSearch(event.target.value);
    }, 500);
  };

  return (
    <nav className={styles.navbar}>
      <Link to={`/`} style={{ textDecoration: "none" }}>
        <div className={styles.logo} style={{ color: "white" }}>
          <Clapperboard size={32} />
          <h2>Cine-Project</h2>
        </div>
      </Link>
      <Link
        to={`/favorites`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <h3>Mes films</h3>
      </Link>

      <div className={styles.searchBar}>
        <div className={styles.searchBarContainer}>
          <Search size={24} />
          <input
            className={styles.searchBarInput}
            type="text"
            placeholder="Recherche ton film préféré..."
            onChange={handleSearchWithDelay}
          />
        </div>
      </div>
    </nav>
  );
};
