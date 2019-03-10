import axios from 'axios';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

const tmdbFetch = (relativeUrl, queryParams) => {
    return axios.get(`https://api.themoviedb.org/3/${relativeUrl}`, {
        params: {
            api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
            language: 'en-US',
            ...queryParams
        }
    });
};

export const getMovies = async query => {
    let response = '';
    if (query) {
        response = await tmdbFetch('search/movie', {
            query: query
        });
    } else {
        response = await tmdbFetch('movie/upcoming', {
            page: 1
        });
    }

    let results = response.data.results.map(result => ({
        ...result,
        backdrop_path: `${TMDB_IMAGE_BASE_URL}${result.backdrop_path}`,
        poster_path: `${TMDB_IMAGE_BASE_URL}${result.poster_path}`
    }));

    return results;
};
