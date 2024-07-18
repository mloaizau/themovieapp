import { getNewsMoviesApi } from '../api/movies.api';
import { Welcome } from '../interfaces/movies.interface';

export const MoviesController = () => {

    const getNewsMovies = async () => {
        const info = await getNewsMoviesApi();
        console.log("controller: ", info);
    }

    return { getNewsMovies };

}