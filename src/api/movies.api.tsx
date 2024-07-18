import { Welcome } from '../interfaces/movies.interface';
import { API_HOST, API_KEY, AUTHORIZATION, LANG } from '../utils/constants';

export const getNewsMoviesApi = (page: number = 1) => {
    const url = API_HOST + "/movie/now_playing" + "?language=" + LANG + "&page=" + page;

    return fetch(url, { method: "GET", headers: { "authorization": AUTHORIZATION } })
        .then((res) => { return res.json() })
        .catch((error) => { return error })
        .then((response: Welcome) => { return response });
}