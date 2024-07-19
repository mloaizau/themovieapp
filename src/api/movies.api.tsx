import { Welcome } from '../interfaces/movies.interface';
import { API_HOST, API_KEY, AUTHORIZATION, LANG } from '../utils/constants';

export const getNewsMoviesApi = (page: number = 1) => {
    const url = API_HOST + "/movie/now_playing" + "?language=" + LANG + "&page=" + page;

    return fetch(url, { method: "GET", headers: { "authorization": AUTHORIZATION } })
        .then((res) => { return res.json() })
        .catch((error) => { return error })
        .then((response: Welcome) => { return response });
}

export const getGenreMovieApi = (idGenres: any) => {
    const url = API_HOST + "/genre/movie/list?language=" + LANG
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTHORIZATION
        }
    };

    return fetch(url, options)
        .then(response => { return response.json()})
        .then(response => { 
            const arrayGenres: any = [];
            idGenres.forEach((id: any) => {
                response.genres.forEach((item: { id: any; name: any; }) => {
                    if(item.id === id) {
                        arrayGenres.push(item.name);
                    }
                });
            });
            return arrayGenres;
        })
        .catch(err => {return err});
}

export const getAllGenresApi = () => {
    const url = API_HOST + "/genre/movie/list?language=" + LANG
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTHORIZATION
        }
    };

    return fetch(url, options)
        .then(response => { return response.json()})
        .then(response => { return response })
        .catch(err => {return err});
}