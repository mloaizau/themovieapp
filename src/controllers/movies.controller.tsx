import { getGenreMovieApi, getNewsMoviesApi, getAllGenresApi } from '../api/movies.api';
import { Welcome } from '../interfaces/movies.interface';

export const MoviesController = () => {

    const getNewsMovies = async () => {
        const info = await getNewsMoviesApi();
        return info;
    }

    const getGenreMovies = async (idGenres: any) => {
        const info = await getGenreMovieApi(idGenres);
        return info;
    }

    const getAllGenresMovies = async () => {
        const info = await getAllGenresApi();
        return info;
    }

    return { getNewsMovies, getGenreMovies, getAllGenresMovies };

}