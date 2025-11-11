import SearchBar from "../SearchBar/SearchBar";
import MovieModal from "../MovieModal/MovieModal";
import css from "../App/App.module.css";
import MovieGrid from "../MovieGrid/MovieGrid";
import { toast, Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import fetchMovies from "../../services/movieService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (query: string) => {
    try {
      setError(false);
      setLoading(true);
      const results = await fetchMovies(query);
      if (!results || results.length === 0) {
        toast.error("No movies found for your request.");
        setMovies([]);
        return;
      }
      setMovies(results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(true); //
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    console.log("Selected movie:", movie);
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {error ? (
        <ErrorMessage />
      ) : (
        movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )
      )}
      <Toaster reverseOrder={false} />
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
