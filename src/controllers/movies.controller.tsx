import { getGenreMovieApi, getNewsMoviesApi, getAllGenresApi, getGenresMoviesApi, getMovieByIdApi, getVideoMovieApi } from '../api/movies.api';
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

    const getGenresMovies = async (idGenre: number) => {
        const info = await getGenresMoviesApi(idGenre);
        return info;
    }

    const getMovieById = async (idMovie: number) => {
        const info = await getMovieByIdApi(idMovie);
        return info;
    }

    const getMovieVideo = async (idMovie: number) => {
        const info = await getVideoMovieApi(idMovie);
        return info;
    }

    return { 
        getNewsMovies, 
        getGenreMovies, 
        getAllGenresMovies, 
        getGenresMovies, 
        getMovieById,
        getMovieVideo
    };

}