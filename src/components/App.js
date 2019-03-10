import React, { useReducer, useEffect } from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';
import { getMovies } from '../services/tmdb';

const SEARCH_MOVIES_REQUEST = 'SEARCH_MOVIES_REQUEST';
const SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS';
const SEARCH_MOVIES_FAILURE = 'SEARCH_MOVIES_FAILURE';

const reducer = (state, action) => {
    switch (action.type) {
        case SEARCH_MOVIES_REQUEST:
            return {
                ...state,
                loading: true,
                errorMessage: null
            };

        case SEARCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                movies: action.payload
            };

        case SEARCH_MOVIES_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            };

        default:
            return state;
    }
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        movies: [],
        errorMessage: null
    });

    useEffect(() => {
        search('');
    }, []);

    const search = async searchValue => {
        dispatch({
            type: SEARCH_MOVIES_REQUEST
        });

        try {
            let movies = await getMovies(searchValue);
            dispatch({
                type: SEARCH_MOVIES_SUCCESS,
                payload: movies
            });
        } catch (e) {
            dispatch({
                type: SEARCH_MOVIES_FAILURE,
                error: 'error'
            });
        }
    };

    const openMovieModal = async id => {
        alert(id);
    };

    const { movies, errorMessage, loading } = state;

    return (
        <div className="App">
            <Header text="HOOKED" />
            <Search search={search} />
            <p className="App-intro">Sharing a few of our favourite movies</p>
            <div className="movies">
                {loading && !errorMessage ? (
                    <span>loading...</span>
                ) : errorMessage ? (
                    <div className="errorMessage">{errorMessage}</div>
                ) : (
                    movies.map((movie, index) => <Movie key={`${index}-${movie.title}`} movie={movie} openMovieModal={openMovieModal} />)
                )}
            </div>
        </div>
    );
};

export default App;
