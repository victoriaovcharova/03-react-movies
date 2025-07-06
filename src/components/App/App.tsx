import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import css from "./App.module.css";
import toast from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false); // ✅ покращена назва
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // ✅ правильна ініціалізація

  const handleSearch = async (searchQuery: string) => {
    try {
      setHasError(false);
      setMovies([]);
      setIsLoading(true);
      const newMovies = await fetchMovies(searchQuery);

      if (newMovies.length === 0) {
        toast("Sorry, we couldn't find any movies. Please try another search term!", {
          duration: 3000,
          position: "top-center",
        });
      }

      setMovies(newMovies);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null); // ✅ правильний тип
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <SearchBar onSearch={handleSearch} />
      <Toaster />
      {isLoading && <Loader />}
      {hasError && <ErrorMessage />}

      {movies.length > 0 && (
        <MovieGrid onSelect={handleSelectedMovie} movies={movies} />
      )}

      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
